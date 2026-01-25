import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Frontend",
    icon: "code",
    link: "/frontend/",
  },
  {
    text: "Backend",
    icon: "server",
    link: "/backend/",
  },
  {
    text: "DevOps",
    icon: "terminal",
    link: "/devops/",
  },
  {
    text: "Hardware",
    icon: "microchip",
    link: "/hardware/",
  },
  {
    text: "Tools",
    icon: "wrench",
    link: "/tools/",
  },
]);
