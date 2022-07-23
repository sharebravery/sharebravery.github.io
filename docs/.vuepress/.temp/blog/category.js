export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Hackintosh":{"path":"/category/hackintosh/","keys":["v-75bf0b40"]}}}},"tag":{"/":{"path":"/tag/","map":{"Hackintosh":{"path":"/tag/hackintosh/","keys":["v-023322f9"]},"pnpm":{"path":"/tag/pnpm/","keys":["v-36cd9fd1"]},"yarn":{"path":"/tag/yarn/","keys":["v-36cd9fd1"]},"知识手册":{"path":"/tag/%E7%9F%A5%E8%AF%86%E6%89%8B%E5%86%8C/","keys":["v-36cd9fd1"]}}}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
