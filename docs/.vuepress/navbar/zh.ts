import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "前端开发",
    icon: "code",
    link: "/zh/frontend/",
  },
  {
    text: "后端技术",
    icon: "server",
    link: "/zh/backend/",
  },
  {
    text: "DevOps",
    icon: "terminal",
    link: "/zh/devops/",
  },
  {
    text: "硬件与系统",
    icon: "microchip",
    link: "/zh/hardware/",
  },
  {
    text: "效率工具",
    icon: "wrench",
    link: "/zh/tools/",
  },
  { text: "行星轨迹", icon: "history", link: "/zh/timeline/" },
]);
