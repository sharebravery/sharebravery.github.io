import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  sidebarSorter: ["readme", "order", "date-desc", "title", "filename"],

  hostname: "https://sharebravery.com",

  author: {
    name: "许多言",
    url: "https://github.com/sharebravery",
  },

  docsDir: "docs",

  editLink: false,
  contributors: false,

  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Outlook", "Search"],
  },

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      footer:
        '<a href="https://github.com/sharebravery" target="_blank">GitHub</a> · <a href="https://x.com/sharebravery" target="_blank">X</a> · <a href="mailto:sharebravery@gmail.com">Email</a><br/>© 2026 许多言',
      displayFooter: true,

      blog: {
        name: "许多言",
        description: "AI · Web3 · Software Engineering",
        intro: "/intro.html",
        medias: {
          Email: "sharebravery@gmail.com",
          GitHub: "https://github.com/sharebravery",
          Twitter: "https://x.com/sharebravery",
        },
        timeline: "时间线",
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
    blog: {
      filter: ({ filePathRelative, frontmatter }) =>
        frontmatter.article ??
        (Boolean(filePathRelative) &&
          !frontmatter.home &&
          !filePathRelative?.startsWith("products/")),
    },

    icon: {
      assets: "fontawesome-with-brands",
    },

    slimsearch: {
      indexContent: true,
      // Product pages are Markdown data sources for the homepage cards,
      // not standalone reading pages, so keep them out of search results.
      filter: (page) => !page.filePathRelative?.startsWith("products/"),
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
