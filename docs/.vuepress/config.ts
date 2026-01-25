import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [
    ["link", { rel: "icon", href: "/avatar.svg" }],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "sharebravery",
      description: "Be brave and have firm beliefs",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "sharebravery",
      description: "做一个勇敢者 拥有坚定的信念",
    },
  },

  theme,

  shouldPrefetch: false,
});
