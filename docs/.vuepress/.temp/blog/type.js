export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-36cd9fd1","v-061b021a","v-ec4a14f4","v-cc3c0a94","v-46ad52b8","v-023322f9","v-184f4da6","v-75bf0b40","v-01bea47e","v-3f6da79a"]}},"encrypted":{"/":{"path":"/encrypted/","keys":[]}},"slide":{"/":{"path":"/slide/","keys":[]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-36cd9fd1","v-061b021a","v-ec4a14f4","v-cc3c0a94","v-46ad52b8","v-023322f9"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
