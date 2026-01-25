import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/frontend/": "structure",
  "/zh/backend/": "structure",
  "/zh/devops/": "structure",
  "/zh/hardware/": "structure",
  "/zh/tools/": "structure",
  "/zh/": [
    "",
    "home",
    "timeline",
  ],
});
