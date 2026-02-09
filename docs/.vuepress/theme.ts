import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://sharebravery.com",

  author: {
    name: "不辞远",
    url: "https://github.com/sharebravery",
  },

  logo: "/avatar.svg",

  repo: "https://github.com/sharebravery",

  docsDir: "docs",

  // 禁用编辑链接
  editLink: false,
  contributors: false,

  // Blog configuration
  blog: {
    // excerptLength: 200,
    medias: {
      Email: "sharebravery@gmail.com",
      Twitter: "https://x.com/sharebravery",
    },
  },

  // 右上角导航栏社交链接
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Language", "Repo", "Outlook", "Search"],
  },

  locales: {
    /**
     * Chinese locale config (Root)
     */
    "/": {
      // navbar
      navbar: zhNavbar,
      // sidebar
      sidebar: zhSidebar,
      footer: '<a href="https://github.com/sharebravery" target="_blank">GitHub</a> | <a href="https://x.com/sharebravery" target="_blank">X (Twitter)</a> | <a href="mailto:sharebravery@gmail.com">Email</a><br/>© 2024-present sharebravery | 做一个勇敢者 拥有坚定的信念',
      displayFooter: true,

      blog: {
        description: "sharebravery 世界的探索者",
        intro: "/intro.html",
        medias: {
          Email: "sharebravery@gmail.com",
          Twitter: "https://x.com/sharebravery",
        },
        timeline: "行星轨迹",
      },
    },

  },

  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    mermaid: true,
    sub: true,
    sup: true,
    tabs: true,
    vPre: true,
    math: {
      type: "katex",
    },
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
  },

  plugins: {
    blog: true,

    // Fixed: Correct way to configure icon assets in V2
    icon: {
      assets: "fontawesome-with-brands",
    },

    // Enable local search
    slimsearch: {
      indexContent: true,
    },

    comment: {
      provider: "Giscus",
      repo: "sharebravery/sharebravery.github.io",
      repoId: "R_kgDOHtEibw",
      category: "Announcements",
      categoryId: "DIC_kwDOHtEib84CQYyN",
    },

    components: {
      components: ["Badge", "VPCard"],
    },
  },
});
