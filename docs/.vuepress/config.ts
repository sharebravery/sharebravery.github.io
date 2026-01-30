import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  head: [
    ["link", { rel: "icon", href: "/avatar.svg" }],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "不辞远的分享",
      description: "做一个勇敢者 拥有坚定的信念",
    },
    "/en/": {
      lang: "en-US",
      title: "sharebravery",
      description: "Relentless Spirit, Unwavering Faith",
    },
  },

  theme,

  shouldPrefetch: false,
});
