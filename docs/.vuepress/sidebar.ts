import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  "/home",
  {
    text: "服务器",
    icon: "creative",
    prefix: "/server/",
    children: "structure",
  },
]);
