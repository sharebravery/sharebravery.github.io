/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2023-03-28 17:49:06
 */
import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

const { version } = require("../../package.json");

export default hopeTheme({
  // hostname: "https://sharebravery.github.io",

  author: {
    name: "sharebravery",
    url: "https://github.com/sharebravery",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "https://github.com/sharebravery/sharebravery.github.io",

  docsDir: "demo/src",

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },

  // navbar
  navbar: navbar,

  navbarLayout: {
    left: ["Brand"],
    center: [],
    right: ["Outlook", "Search", "Links", "Language", "Repo"],
  },

  // sidebar
  sidebar: "structure",

  footer: `Apache Licensed | Copyright © 2023-present sharebravery v${version}`,

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "做一个勇敢者 拥有坚定的信念",
    intro: "/intro.html",
    medias: {
      Email: "sharebravery@gmail.com",
    },
    timeline: "行星轨迹",
  },

  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "sharebravery/sharebravery.github.io",
      repoId: "R_kgDOHtEibw",
      category: "Announcements",
      categoryId: "DIC_kwDOHtEib84CQYyN",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      // enableAll: false,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
