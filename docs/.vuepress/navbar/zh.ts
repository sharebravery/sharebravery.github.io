import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "观察",
    icon: "eye",
    link: "/insights/",
  },
  {
    text: "Web3",
    icon: "coins",
    link: "/web3/",
  },
  {
    text: "技术",
    icon: "code",
    link: "/tech/",
  },
  { text: "行星轨迹", icon: "timeline", link: "/timeline/" },
  {
    text: "X",
    icon: "fab fa-x-twitter",
    link: "https://x.com/sharebravery",
  },
]);
