import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.87/node_modules/vuepress-theme-hope/lib/client/layouts/404.js")),
  "Layout": defineAsyncComponent(() => import("D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.87/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js")),
  "Slide": defineAsyncComponent(() => import("D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.87/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js")),
  "Blog": defineAsyncComponent(() => import("D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.87/node_modules/vuepress-theme-hope/lib/client/module/blog/layouts/Blog.js")),
}
