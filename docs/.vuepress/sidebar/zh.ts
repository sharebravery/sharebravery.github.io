import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/frontend/": "structure",
  "/backend/": "structure",
  "/devops/": "structure",
  "/hardware/": "structure",
  "/tools/": "structure",
  "/": [
    "",
    "home",
    "timeline",
  ],
});
