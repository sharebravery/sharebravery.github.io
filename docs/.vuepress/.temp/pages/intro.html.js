export const data = JSON.parse("{\"key\":\"v-184f4da6\",\"path\":\"/intro.html\",\"title\":\"关于我\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"medrt\",\"title\":\"关于我\",\"index\":false,\"copyright\":false},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"intro.md\"}")

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
