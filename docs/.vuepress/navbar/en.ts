import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Frontend",
    icon: "laptop-code",
    link: "/frontend/",
  },
  {
    text: "Backend",
    icon: "network-wired",
    link: "/backend/",
  },
  {
    text: "DevOps",
    icon: "server",
    link: "/devops/",
  },
  {
    text: "Hardware",
    icon: "microchip",
    link: "/hardware/",
  },
  {
    text: "Tools",
    icon: "toolbox",
    link: "/tools/",
  },
  { text: "Timeline", icon: "timeline", link: "/timeline/" },
]);
