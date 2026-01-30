---
title: "Online Debugging with Monaco Editor & WebSockets"
date: 2022-12-02
categories:
  - Frontend
tags:
  - Vue.js
  - Monaco Editor
  - WebSockets
---

# Online Debugging with Monaco Editor & WebSockets

Building a crawler is fun. Debugging a crawler config by downloading the entire backend, setting up the database, and running it locally just to change one CSS selector? **Not fun.**

The solution? Build a web-based IDE. Connect it to the backend via WebSockets. Debug in real-time. Feel like a wizard.

We're going to use **Monaco Editor** (the engine behind VS Code) and **SignalR** (WebSockets wrapper) to build a remote debugger console.

## 1. The `useMonaco` Hook

Monaco is powerful, but using it with Vue 3 requires a "Nuclear Option": `toRaw`.

Vue 3 wraps everything in Proxies to track reactivity. Monaco is a complex beast that expects raw objects. If you pass a Vue Proxy to Monaco, it will try to crawl the object, get caught in a reactivity loop, and your browser tab will freeze faster than a waterfall in Antarctica.

Here is a safe wrapper hook:

```typescript
/* hooks/useMonaco.ts */
import { reactive, ref, toRaw, unref } from "vue";
import * as monaco from "monaco-editor";

// ... worker imports (json, ts, editor workers) ...

export default function useMonaco(
  domElement: HTMLElement | Ref<HTMLElement>,
  override?: monaco.editor.IEditorOverrideServices
) {
  // 1. Setup Workers (Standard Monaco Boilerplate)
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") return new JsonWorker();
      if (label === "typescript") return new TSWorker();
      return new EditorWorker();
    },
  };

  const editor = ref<monaco.editor.IStandaloneCodeEditor>();

  // 2. The Golden Rule: Use toRaw()
  const getValue = () => {
    // If you don't use toRaw here, Vue tries to track the internal state of Monaco
    // and everything explodes.
    return toRaw(editor.value!).getValue();
  };

  function create(ops: monaco.editor.IStandaloneEditorConstructionOptions = {}) {
    editor.value = monaco.editor.create(
      unref(domElement),
      { ...defaultOptions, ...ops },
      override
    );
    return editor.value;
  }

  return { monaco, editor, create, getValue };
}
```

## 2. The Vue Component wrapper

Now we wrap it in a Vue component. Notice how we handle `setValue`.

```vue
<!-- components/MonacoEditor.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, toRaw } from "vue";
import useMonaco from "../hooks/useMonaco";

// ... props definition ...

const editorRef = shallowRef();
const { monaco, editor, create, getValue } = useMonaco(editorRef);

function setValue(value: string) {
  // Again, toRaw is critical here
  toRaw(editor.value)?.setValue(value);
}

onMounted(() => {
  create({ language: "yaml", value: initialValue });

  // Bind Ctrl+S to save
  editor.value?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    emit("onCtrlS");
    message.success("Saved!");
  });
});
</script>
```

## 3. The WebSocket Connection (SignalR)

We need a way to stream logs from the server while the crawler is running. SignalR is perfect for this "Firehose" style data.

```typescript
/* hooks/useSignalRForEditor.ts */
export default function useSignalRForEditor(connection: signalr.HubConnection) {

  // Start the remote task
  async function start(configYml: string) {
    if (connection.state === HubConnectionState.Connected) stop();

    await connection.start();
    // Send the config from the editor to the backend
    await connection.send("Start", configYml);
    logger("[ Start ]");
  }

  // Listen for logs
  function onWriteLine() {
    connection.on("WriteLine", (msg: string) => {
      // Append to our log console
      logger(msg);
    });
  }

  return { start, stop, onWriteLine };
}
```

## Why This Matters

By combining these, you create a closed loop:
1.  **Edit** config in browser (Monaco).
2.  **Send** to backend (SignalR).
3.  **Stream** execution logs back (SignalR).

You have effectively built a specialized IDE for your specific domain. It saves hours of context switching and environment setup. Plus, it looks really cool in a demo.
