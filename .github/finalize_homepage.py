from pathlib import Path


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text()
    if new in text:
        return
    if old not in text:
        raise RuntimeError(f"Expected text not found in {path}: {old[:80]!r}")
    path.write_text(text.replace(old, new, 1))


config = Path("docs/.vuepress/config.ts")
replace_once(
    config,
    '  base: "/",\n',
    '  base: "/",\n\n  head: [["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }]],\n',
)

data = Path("docs/.vuepress/plugins/homeData.ts")
replace_once(
    data,
    '          type: String(frontmatter.type ?? "Product"),\n',
    '          type: String(frontmatter.type ?? "Product"),\n          kind: String(frontmatter.kind ?? "Product"),\n          status: String(frontmatter.status ?? ""),\n',
)

product_updates = {
    "docs/products/shuangpin.md": ("Web App", "Product", "live"),
    "docs/products/chaincanvas.md": ("Web3", "Project", "development"),
    "docs/products/tracememo.md": ("Extension", "Project", "development"),
}
for filename, (ptype, kind, status) in product_updates.items():
    path = Path(filename)
    text = path.read_text()
    marker = f"kind: {kind}\nstatus: {status}\n"
    if marker not in text:
        expected = f"type: {ptype}\n"
        if expected not in text:
            raise RuntimeError(f"Expected product type not found in {path}")
        path.write_text(text.replace(expected, expected + marker, 1))

home = Path("docs/.vuepress/layouts/Home.vue")
replace_once(
    home,
    'const productType = (product) =>\n  `PRODUCT · ${String(product.type || "Product").toUpperCase()}`;\n',
    'const productType = (product) =>\n  `${String(product.kind || "Product").toUpperCase()} · ${String(product.type || "Product").toUpperCase()}`;\n',
)
replace_once(
    home,
    '<h2 class="section-title">Selected products.</h2>',
    '<div class="section-title-wrap">\n              <h2 class="section-title">Selected works.</h2>\n              <div class="section-zh">精选作品</div>\n            </div>',
)
replace_once(
    home,
    '<div class="product-num">{{ productType(product) }}</div>\n                <h3 class="product-title">{{ product.name }}</h3>',
    '<div class="product-meta">\n                  <div class="product-num">{{ productType(product) }}</div>\n                  <div v-if="product.status === \'development\'" class="product-status">开发中</div>\n                </div>\n                <h3 class="product-title">{{ product.name }}</h3>',
)
replace_once(
    home,
    '.section-title {\n',
    '.section-title-wrap { min-width: 0; }\n.section-zh {\n  margin-top: 10px;\n  color: var(--muted);\n  font-family: "Songti SC", "STSong", Georgia, serif;\n  font-size: 12px;\n  letter-spacing: .08em;\n}\n.section-title {\n',
)
replace_once(
    home,
    '.product-num { color: var(--muted); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }\n',
    '.product-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; }\n.product-num { color: var(--muted); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }\n.product-status { color: var(--muted); font-size: 10px; letter-spacing: .08em; white-space: nowrap; }\n',
)

Path("docs/.vuepress/public/favicon.svg").write_text(
    '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n  <rect width="64" height="64" rx="10" fill="#f8f7f2"/>\n  <text x="32" y="43" text-anchor="middle" font-size="38" font-family="Songti SC, STSong, Georgia, serif" fill="#171715">多</text>\n</svg>\n'''
)
