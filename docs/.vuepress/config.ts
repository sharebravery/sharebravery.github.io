import { defineUserConfig } from "vuepress";
import { homeDataPlugin } from "./plugins/homeData.js";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }]],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "许多言",
      description: "Work, research and writing by 许多言.",
    },
  },

  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!node_modules",
    "!**/illustrations/**",
    "!**/covers/**",
  ],

  markdown: {
    assets: {
      aliasSupport: false,
    },
  },

  plugins: [homeDataPlugin()],

  theme,

  shouldPrefetch: false,
});
