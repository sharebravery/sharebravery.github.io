import { defineUserConfig } from "vuepress";
import { homeDataPlugin } from "./plugins/homeData.js";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "许多言的多言",
      description: "Products and writing by 许多言.",
    },
  },

  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!node_modules",
    "!posts/polymarket/**",
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
