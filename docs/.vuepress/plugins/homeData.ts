export const homeDataPlugin = () => ({
  name: "local-home-data",

  async onPrepared(app) {
    const products = app.pages
      .filter((page) => page.filePathRelative?.startsWith("products/"))
      .map((page) => {
        const frontmatter = page.frontmatter;

        return {
          name: String(frontmatter.name ?? page.title),
          type: String(frontmatter.type ?? "Product"),
          tagline: String(frontmatter.tagline ?? ""),
          description: String(frontmatter.description ?? ""),
          url: String(frontmatter.url ?? ""),
          image: String(frontmatter.image ?? ""),
          preview: String(frontmatter.preview ?? ""),
          featured: Boolean(frontmatter.featured),
          order: Number(frontmatter.order ?? 999),
          path: page.path,
        };
      })
      .sort((a, b) => a.order - b.order);

    const posts = app.pages
      .filter(
        (page) =>
          page.filePathRelative?.startsWith("posts/") &&
          page.frontmatter.article !== false,
      )
      .map((page) => {
        const frontmatter = page.frontmatter;
        const rawDate = frontmatter.date;
        const date = rawDate instanceof Date ? rawDate : rawDate ? new Date(String(rawDate)) : null;
        const category = frontmatter.category ?? frontmatter.categories ?? [];

        return {
          title: String(frontmatter.shortTitle ?? page.title),
          path: page.path,
          category: Array.isArray(category)
            ? String(category[0] ?? "")
            : String(category ?? ""),
          date: date && !Number.isNaN(date.getTime()) ? date.toISOString() : "",
        };
      })
      .sort((a, b) => Date.parse(b.date || "1970-01-01") - Date.parse(a.date || "1970-01-01"))
      .slice(0, 4);

    await app.writeTemp(
      "home-data.js",
      `export const homeProducts = ${JSON.stringify(products)};\nexport const homePosts = ${JSON.stringify(posts)};\n`,
    );
  },
});
