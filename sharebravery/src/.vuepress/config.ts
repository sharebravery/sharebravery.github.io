import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "sharebravery",
  description: "做一个勇敢者 拥有坚定的信念",

  base: "/",

  theme,
});
