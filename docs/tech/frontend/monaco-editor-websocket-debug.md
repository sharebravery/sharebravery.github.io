---
title: 在线代码编辑器 Monaco Editor、WebSocket 在线调试
date: 2022-12-02
categories:
  - 前端开发
tags:
  - IDE
---


由于有大量的爬虫配置需要调试，下载运行后端代码过于笨重，于是使用和 VS Code 同样的编辑器 Monaco Editor 加上 WebSocket 实现在线调试。

## useMonaco

对 Monaco Editor 提供的 API 进行一些基础的封装以便提供外部使用，这里有一点需要注意的是读取值 (getValue) 和赋值 (setValue) 的时候需要使用 toRaw 函数对 editor 包裹一层，不然页面会卡死。

### toRaw() 官网说法

> 根据一个 Vue 创建的代理返回其原始对象。这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。
>
> `function toRaw<T>(_proxy_: T): T`

```typescript
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 14:45:34
 */
import type { Ref } from "vue";
import { reactive, ref, toRaw, unref } from "vue";
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import TSWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

export const languages = reactive([
  "typescript",
  "javascript",
  "yaml",
  "bat",
  "cpp",
  "css",
  "dockerfile",
  "go",
  "graphql",
  "html",
  "ini",
  "java",
  "json",
  "julia",
  "kotlin",
  "less",
  "markdown",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "php",
  "powershell",
  "python",
  "r",
  "redis",
  "rust",
  "scala",
  "scheme",
  "scss",
  "shell",
  "sophia",
  "sql",
  "swift",
  "tcl",
  "xml",
]);

export default function useMonaco(
  domElement: HTMLElement | Ref<HTMLElement>,
  override?: monaco.editor.IEditorOverrideServices
) {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new JsonWorker();
      }
      if (label === "css" || label === "scss" || label === "less") {
        //   return new cssWorker();
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        //   return new htmlWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new TSWorker();
      }
      return new EditorWorker();
    },
  };

  const editor = ref<monaco.editor.IStandaloneCodeEditor>();

  const monacoOptions = ref<monaco.editor.IStandaloneEditorConstructionOptions>(
    {
      theme: "vs-dark",
      language: "typescript",
      tabSize: 2,
      automaticLayout: true, // 自适应宽高
      selectOnLineNumbers: true, // 显示行号
      multiCursorModifier: "ctrlCmd",
      fontSize: 17, // 字体大小
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
    }
  );

  const getValue = () => {
    return toRaw(editor.value!).getValue();
  };

  function create(
    ops: monaco.editor.IStandaloneEditorConstructionOptions = {}
  ) {
    const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      ...unref(monacoOptions),
      ...ops,
    };

    editor.value = monaco.editor.create(
      unref(domElement),
      defaultOptions,
      override
    );

    return editor.value;
  }

  return { monaco, editor, monacoOptions, create, languages, getValue };
}
```

## MonacoEditor Component

```vue
<!--
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 14:46:10
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, toRaw } from "vue";
import type * as monacoType from "monaco-editor";
import { message } from "ant-design-vue";
import useMonaco from "../hooks/useMonaco";

interface IProps
  extends monacoType.editor.IStandaloneEditorConstructionOptions {
  showToolbar?: boolean;
}

withDefaults(defineProps<IProps>(), {
  showToolbar: true,
  theme: "vs-dark",
  language: "yaml",
});

const emit = defineEmits(["update:value", "created", "onCtrlS", "onF5"]);

const YAML_KEY = "YAML_KEY";

const editorRef = shallowRef();

const { monaco, editor, create, getValue } = useMonaco(editorRef);

function setValue(value: string) {
  toRaw(editor.value)?.setValue(value);
}

onBeforeUnmount(() => {
  editor.value?.dispose();
});

// new Proxy({},{
//   set
// })

onMounted(() => {
  const localYaml = localStorage.getItem(YAML_KEY);

  let value = "";

  if (localYaml) {
    value = localYaml;
  }

  create({ language: "yaml", value });

  emit("created", editor);

  editor.value!.onDidChangeModelContent(() => emit("update:value", getValue()));

  editor.value?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    localStorage.setItem(YAML_KEY, getValue());
    emit("onCtrlS");
    message.success("保存成功");
  });

  editor.value?.addCommand(monaco.KeyCode.F5, () => emit("onF5"));
});

defineExpose({
  setValue,
});
</script>

<template>
  <div ref="editorRef" :style="{ height: 'inherit', width: '100%' }"></div>
</template>

<style scoped lang="less">
ul {
  list-style: none;
  display: flex;
  li {
    h3 {
      text-align: center;
    }
    display: flex;
    margin: 0 16px;
  }
}
</style>
```

## useSignalR

长链接服务使用了 @microsoft/signalr，由于涉及到的业务不复杂，所以没有做过多的封装。

```typescript
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-02 16:50:02
 */
import * as SignalR from "@microsoft/signalr";
import type { HubConnection, IHttpConnectionOptions } from "@microsoft/signalr";
import { reactive } from "vue";

export default function useSignalR(
  signalRUrl: string,
  options: IHttpConnectionOptions = {}
) {
  const connection = reactive<HubConnection>(
    new SignalR.HubConnectionBuilder()
      .withUrl(signalRUrl, options)
      .configureLogging(SignalR.LogLevel.None) // 日志等级
      .build()
  ) as HubConnection;

  connection.onreconnecting(() => {
    console.log("[ onreconnecting ]");
  });
  connection.onreconnected((connectionId) => {
    console.log("[ onreconnected ]", connectionId);
  });
  connection.onclose(() => {
    console.log("[ onclose ]");
  });

  return {
    connection,
  };
}
```

## useSignalRForEditor

提供的一些调试方法。

```typescript
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 11:20:00
 */
import type * as signalr from "@microsoft/signalr";
import { HubConnectionState } from "@microsoft/signalr";
import { ref } from "vue";

export const logResult = ref<string[]>([]);

function logger(msg: string, color?: string) {
  logResult.value.unshift(msg);
  console.log(`%c [ ${msg} ]`, `color:${color ?? "#2f90b9"};`);
}

export class ImportConfig {
  public entryUrl: string | undefined; // 网站网址

  public configs: string[] = [];
}

export default function useSignalRForEditor(connection: signalr.HubConnection) {
  async function initialize() {
    await connection.start();
    onWriteLine();
    onCompleted();
  }

  async function start(yml: string) {
    if (connection.state === HubConnectionState.Connected) stop(); // 如果处于已连接状态，则先停止

    await initialize();
    await connection.send("Start", yml);

    logger("[ Start ]");
  }

  /**
   *停止调试
   *
   */
  async function stop() {
    await connection.send("Stop");
    offWriteLine();
    offCompleted();
    connection.stop();
    logger("[ Stop ]");
  }

  /**
   *爬虫运行完成
   *
   */
  function onCompleted() {
    connection.on("Completed", () => {
      stop();
      logger("[ Completed ]", "#fff3a7");
    });
  }

  function offCompleted() {
    connection.off("Completed");
  }

  function offWriteLine() {
    connection.off("WriteLine");
  }

  /**
   *
   *控制台输出
   *
   */
  function onWriteLine() {
    connection.on("WriteLine", (msg: string) => {
      logger(msg);
    });
  }

  return {
    start,
    stop,
    onWriteLine,
  };
}
```
