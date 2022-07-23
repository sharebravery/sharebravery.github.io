export const categoryMap = {"category":{"/":{"path":"/category/","map":{"Hackintosh":{"path":"/category/hackintosh/","keys":["v-75bf0b40"]},"使用指南":{"path":"/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","keys":["v-3f6da79a"]}}}},"tag":{"/":{"path":"/tag/","map":{"Hackintosh":{"path":"/tag/hackintosh/","keys":["v-023322f9"]},"pnpm":{"path":"/tag/pnpm/","keys":["v-36cd9fd1"]},"yarn":{"path":"/tag/yarn/","keys":["v-36cd9fd1"]},"知识手册":{"path":"/tag/%E7%9F%A5%E8%AF%86%E6%89%8B%E5%86%8C/","keys":["v-36cd9fd1"]},"阿里云七天训练营":{"path":"/tag/%E9%98%BF%E9%87%8C%E4%BA%91%E4%B8%83%E5%A4%A9%E8%AE%AD%E7%BB%83%E8%90%A5/","keys":["v-061b021a","v-ec4a14f4","v-cc3c0a94","v-46ad52b8"]}}}}}

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
