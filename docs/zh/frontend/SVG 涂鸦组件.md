---
title: SVG 涂鸦组件
date: 2022-06-09
tags:
  - SVG
  - 画图
  - 图形
  - vue组件
categories:
  - 前端开发
---

# SVG 涂鸦组件（可 npm 发布）

我司有一个阅卷系统，涉及到了阅卷打分，需要写一个涂鸦组件，经过 SVG 和 Canvas 的对比使用了 SVG（后续增加需求开发小程序端，由于小程序不支持 SVG 画图，使用了 canvas）。

## 独立组件配置

当时写这个组件的时候考虑到可能会多个项目使用，于是是作为一个可 npm 安装的独立组件来开发的。

### package.json

```json
  "files": [
    "lib"
  ],
  "main": "./lib/ch2-lib.umd.ts",
  "module": "./lib/ch2-lib.es.ts",
  "types": "./lib/types/packages/index.d.ts",
  "exports": {
    ".": {
      "import": "./lib/ch2-lib.es.ts",
      "require": "./lib/ch2-lib.umd.ts"
    },
    "./lib/style.css": {
      "import": "./lib/style.css",
      "require": "./lib/style.css"
    }
  },
```

### vite.config.ts

```typescript
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "src/packages/index.ts"),
      name: "Ch2Lib",
      fileName: (format) => `ch2-lib.${format}.ts`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "@types/node"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
```

### tsconfig.json

在该文件中加入这两行

> "declaration": true,
>
> "declarationDir": "./lib/types",

## 本地开发

> _本项目运行_ _`yarn link`_
>
> 使用项目运行\* _`yarn link your project name`_

## 项目结构

![avatar](./images/svgG1-2023-03-31_10-15-12.png)

## 几个画图、解析数据的函数

### createElement

注意创建 SVG 元素需要使用 createElementNS

`document.createElementNS("http://www.w3.org/2000/svg", name);`

```typescript
export default function createElement<K extends keyof SVGElementTagNameMap>(
  name: K,
  brush?: Partial<Brush>
): SVGElementTagNameMap[K] {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);

  el.setAttribute("fill", brush?.fill ?? "transparent");

  if (brush?.color) el.setAttribute("stroke", brush.color);
  if (brush?.size) el.setAttribute("stroke-width", brush.size.toString());
  el.setAttribute("stroke-linecap", "round");

  if (brush?.dasharray) el.setAttribute("stroke-dasharray", brush!.dasharray);

  return el;
}
```

### drawingText

```typescript
function drawingText() {
  const el = createDrawingTextNode();

  canvas!.value!.appendChild(el);

  el.focus();

  isEdit.value = true;

  const inputBlur = () => {
    const displayNodeOnClick = (e: any) => {
      e.stopPropagation();

      e.preventDefault();
      displayNode.style.display = "none";

      el.style.display = "block";
      el.focus();
    };

    const textEl: IText = {
      node: el,
      outerHTML: el.outerHTML,
      mode: currentMode.value,
      left: upPoint.value?.x!,
      top: upPoint.value?.y!,
      text: el.value,
    };

    const index = designData.findIndex((e) => e.node === el);

    el.style.display = "none";

    const displayNode = createTextDisplayNode(
      textEl,
      defaultOptions.value.scale
    );

    displayNode.style.cursor = "pointer";

    displayNode.addEventListener("click", displayNodeOnClick);

    canvas!.value!.appendChild(displayNode);

    // 将数据添加到数据源

    const displayEl: IText = {
      node: displayNode,
      outerHTML: displayNode.outerHTML,
      mode: currentMode.value,
      left: upPoint.value?.x!,
      top: upPoint.value?.y!,
      text: el.value,
    };

    if (index > -1) {
      designData[index].text = el.value;
      emit("update:designData", designData, displayEl);
    } else {
      if (el.value) {
        const newItem = percentCustomToolPosition(displayEl);
        const temp = { ...displayEl, ...newItem };
        designData.push(temp);
        emit("update:designData", designData, temp);
      } else {
        el.remove();
      }
    }
  };

  // 监听焦点离开
  el.addEventListener("blur", inputBlur);

  currentTextNode.value = el;
}
```

## 数据百分比转换，保持图形比例、位置

![avatar](./images/svgG2-2023-03-31_10-30-10.png)

## template 图片拖动

```vue
 <div
    class="container"
    ref="container"
    :key="count"
    :style="`background:${defaultOptions.backgroundColor}`"
  >
    <div
      class="canvas"
      ref="canvas"
      :style="`transform: scale(${defaultOptions.scale});text-align:${
        defaultOptions.imgPosition
      };pointer-events:${defaultOptions.toolbarShow ? 'auto' : 'none'}`"
    >
      <slot>
        <img
          @mousedown.prevent="onDragMousedown"
          class="bgImg"
          ref="bgImgRef"
          :src="defaultOptions.bgImgUrl"
          :style="`transform:rotate(${defaultOptions.rotate}deg );`"
          @load="imgLoad"
        />
      </slot>
      <svg
        ref="target"
        :style="`transform:rotate(${defaultOptions.rotate}deg );`"
      ></svg>
    </div>

    <div
      style="
        position: fixed;
        bottom: 0;
        display: flex;
        margin: 12px auto;
        justify-content: center;
      "
      v-show="defaultOptions.toolbarShow"
    >
      <Actions :actions="defaultOptions.actions" @actionChange="actionChange" />
      <Tools :tools="defaultOptions.tools" @toolChange="toolChange" />
    </div>
  </div>
</template>
```

```typescript
function onDragMousedown(downEvent: MouseEvent) {
  downEvent.preventDefault();

  if (!target.value) return;

  const { clientX: startX, clientY: startY } = downEvent;

  const { offsetLeft, offsetTop } = target.value;

  document.onmousemove = (moveEvent: MouseEvent) => {
    const { clientX, clientY } = moveEvent;

    const x = offsetLeft + clientX - startX;
    const y = offsetTop + clientY - startY;
    target.value!.style["left"] = x + "px";
    target.value!.style["top"] = y + "px";
  };

  document.onmouseup = () => {
    document.onmousemove = document.onmouseup = null;
  };
}
```

## 用例

```vue
<script lang="ts" setup>
import { Ch2PaperOfPainter } from "ch2-paper-of-painter";
import "ch2-paper-of-painter/lib/style.css";
</script>

<template>
  <Ch2PaperOfPainter style="width: 800px; height: 700px" />
</template>
```

![avatar](./images/svgG3-2023-03-31_10-42-11.png)
