import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  {
    text: "Frontend",
    icon: "laptop-code",
    link: "/en/frontend/",
  },
  {
    text: "Backend",
    icon: "network-wired",
    link: "/en/backend/",
  },
  {
    text: "DevOps",
    icon: "server",
    link: "/en/devops/",
  },
  {
    text: "Hardware",
    icon: "microchip",
    link: "/en/hardware/",
  },
  {
    text: "Tools",
    icon: "toolbox",
    link: "/en/tools/",
  },
  { text: "Timeline", icon: "timeline", link: "/en/timeline/" },
]);
