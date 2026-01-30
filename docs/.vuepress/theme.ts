import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://sharebravery.github.io",

  author: {
    name: "sharebravery",
    url: "https://github.com/sharebravery",
  },

  logo: "/avatar.svg",

  repo: "https://github.com/sharebravery",

  docsDir: "docs",

  // Blog configuration
  blog: {
    // excerptLength: 200,
    medias: {
      Email: "sharebravery@gmail.com",
    },
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
      footer: "默认页脚",
      displayFooter: true,

      blog: {
        description: "世界的探索者",
        intro: "/intro.html",
        medias: {
          Email: "sharebravery@gmail.com",
        },
        timeline: "行星轨迹",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    /**
     * English locale config
     */
    "/en/": {
      // navbar
      navbar: enNavbar,
      // sidebar
      sidebar: enSidebar,
      footer: "Default footer",
      displayFooter: true,

      blog: {
        description: "Relentless Spirit, Unwavering Faith",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
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
