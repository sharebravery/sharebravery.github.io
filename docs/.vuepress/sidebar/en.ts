import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/frontend/": "structure",
  "/backend/": "structure",
  "/devops/": "structure",
  "/hardware/": "structure",
  "/tools/": "structure",
  "/": [
    "",
    "intro",
  ],
});
