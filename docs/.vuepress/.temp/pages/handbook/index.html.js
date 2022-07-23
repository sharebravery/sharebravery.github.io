export const data = JSON.parse("{\"key\":\"v-01bea47e\",\"path\":\"/handbook/\",\"title\":\"知识手册\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"知识手册\",\"index\":false},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.06,\"words\":19},\"filePathRelative\":\"handbook/README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
