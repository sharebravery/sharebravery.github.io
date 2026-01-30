import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "前端开发",
    icon: "laptop-code",
    link: "/frontend/",
  },
  {
    text: "后端技术",
    icon: "network-wired",
    link: "/backend/",
  },
  {
    text: "DevOps",
    icon: "server",
    link: "/devops/",
  },
  {
    text: "硬件与系统",
    icon: "microchip",
    link: "/hardware/",
  },
  {
    text: "效率工具",
    icon: "toolbox",
    link: "/tools/",
  },
  { text: "行星轨迹", icon: "timeline", link: "/timeline/" },
]);
