<script setup>
import { homePosts, homeProducts } from "@temp/home-data.js";

const external = (url) => /^https?:\/\//.test(url ?? "");

const productHref = (product) => product.url || product.path;

const productType = (product) =>
  `PRODUCT · ${String(product.type || "Product").toUpperCase()}`;

const ctaLabel = (product) =>
  /github\.com/.test(product.url || "") ? "查看项目" : "打开产品";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(date);
};
</script>

<template>
  <div class="xu-home">
    <div class="shell">
      <header class="masthead">
        <a class="masthead-title" href="/">许多言的多言</a>
        <div class="masthead-meta">XU DUOYAN · 2026</div>
      </header>

      <main>
        <div class="entry" aria-label="Primary sections">
          <a class="entry-panel" href="#products">
            <div class="entry-index">01 / Selected</div>
            <div class="entry-head">
              <h1 class="entry-title">Products.</h1>
              <div class="entry-zh">产品</div>
            </div>
            <div class="entry-bottom">
              <span class="entry-note">Tools · Apps · Experiments</span>
              <span class="entry-arrow">↘</span>
            </div>
          </a>

          <a class="entry-panel" href="#writing">
            <div class="entry-index">02 / Recent</div>
            <div class="entry-head">
              <h1 class="entry-title">Writing.</h1>
              <div class="entry-zh">文章</div>
            </div>
            <div class="entry-bottom">
              <span class="entry-note">AI · Web3 · Engineering</span>
              <span class="entry-arrow">↘</span>
            </div>
          </a>
        </div>

        <div class="identity-strip">
          <span><strong>许多言</strong> · Developer · Builder · Writer</span>
          <span class="identity-links">
            <a href="https://github.com/sharebravery" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://x.com/sharebravery" target="_blank" rel="noreferrer">X ↗</a>
            <a href="mailto:sharebravery@gmail.com">Email ↗</a>
          </span>
        </div>

        <section id="products">
          <div class="section-head">
            <div class="section-no">01 / Works</div>
            <h2 class="section-title">Selected products.</h2>
          </div>

          <div class="products">
            <a
              v-for="(product, index) in homeProducts"
              :key="product.path"
              class="product"
              :class="{ trace: index === 2 }"
              :href="productHref(product)"
              :target="external(productHref(product)) ? '_blank' : undefined"
              :rel="external(productHref(product)) ? 'noreferrer' : undefined"
            >
              <div class="product-copy">
                <div class="product-num">{{ productType(product) }}</div>
                <h3 class="product-title">{{ product.name }}</h3>
                <div class="product-tagline">{{ product.tagline }}</div>
                <div class="product-desc">{{ product.description }}</div>
                <div class="product-link">{{ ctaLabel(product) }} ↗</div>
              </div>

              <div class="preview" :class="`preview-${product.preview || 'default'}`">
                <template v-if="product.image">
                  <img :src="product.image" :alt="`${product.name} preview`" />
                </template>

                <template v-else-if="product.preview === 'shuangpin'">
                  <div class="preview-head"><i /><i /><i /></div>
                  <div class="preview-body">
                    <div class="typing">
                      <b>你好</b>
                      <span>NI · HAO</span>
                    </div>
                  </div>
                </template>

                <template v-else-if="product.preview === 'chaincanvas'">
                  <div class="preview-head"><i /><i /><i /></div>
                  <div class="preview-body">
                    <div class="orbit">
                      <i class="node a" />
                      <i class="node b" />
                      <i class="node c" />
                    </div>
                  </div>
                </template>

                <template v-else-if="product.preview === 'tracememo'">
                  <div class="preview-head"><i /><i /><i /></div>
                  <div class="preview-body">
                    <div class="trace-list">
                      <div class="trace-row"><strong>0x7A…92F</strong><span>CONTEXT</span></div>
                      <div class="trace-row"><strong>Seen before</strong><span>3×</span></div>
                      <div class="trace-row"><strong>Saved to memory</strong><span>NOW</span></div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="preview-head"><i /><i /><i /></div>
                  <div class="preview-body preview-name">{{ product.name }}</div>
                </template>
              </div>
            </a>
          </div>
        </section>

        <section id="writing">
          <div class="section-head">
            <div class="section-no">02 / Writing</div>
            <h2 class="section-title">Recent notes.</h2>
            <a class="section-more" href="/article/">All writing →</a>
          </div>

          <div class="writing">
            <a
              v-for="(post, index) in homePosts"
              :key="post.path"
              class="article"
              :href="post.path"
            >
              <span class="article-no">{{ String(index + 1).padStart(2, "0") }}</span>
              <span class="article-title">{{ post.title }}</span>
              <span class="article-meta">{{ post.category }}</span>
              <span class="article-meta">{{ formatDate(post.date) }}</span>
              <span class="article-arrow">↗</span>
            </a>
          </div>
        </section>

        <section>
          <div class="section-head">
            <div class="section-no">03 / About</div>
            <h2 class="section-title">Currently.</h2>
          </div>

          <div class="about">
            <div class="about-editorial">
              <div class="about-label">XU DUOYAN</div>
              <div class="about-word">Building.</div>
              <div class="about-word muted-word">Writing.</div>
              <div class="about-word muted-word">Exploring.</div>
            </div>

            <div class="now">
              <div class="now-row"><b>Building</b><span>Shuangpin · ChainCanvas · TraceMemo</span></div>
              <div class="now-row"><b>Writing</b><span>AI Engineering · Web3 Engineering · Software Systems</span></div>
              <div class="now-row"><b>Elsewhere</b><span>GitHub · X · Email</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>许多言的多言</span>
        <span>© 2026</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.xu-home {
  --bg: #f8f7f2;
  --surface: #f0efe9;
  --ink: #171715;
  --muted: #77756e;
  --line: #ddd9cf;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, "SF Pro Text", "PingFang SC", "Noto Sans CJK SC", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.xu-home * { box-sizing: border-box; }
.xu-home a { color: inherit; text-decoration: none; }
.shell { width: min(calc(100% - 48px), 1240px); margin: auto; }

.masthead {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 28px 0 18px;
  border-bottom: 1px solid var(--ink);
}
.masthead-title {
  font-family: "Songti SC", "STSong", Georgia, serif;
  font-size: 17px;
  letter-spacing: .03em;
}
.masthead-meta {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: .13em;
}

.entry {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 470px;
  border-bottom: 1px solid var(--ink);
}
.entry-panel {
  padding: 58px 42px 48px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.entry-panel + .entry-panel {
  border-left: 1px solid var(--ink);
  padding-left: 42px;
  padding-right: 0;
}
.entry-index,
.section-no,
.about-label {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: .15em;
  text-transform: uppercase;
}
.entry-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(62px, 8.5vw, 118px);
  font-weight: 400;
  line-height: .84;
  letter-spacing: -.07em;
}
.entry-zh {
  margin-top: 14px;
  color: var(--muted);
  font-family: "Songti SC", "STSong", Georgia, serif;
  font-size: 15px;
  letter-spacing: .12em;
}
.entry-head { transition: transform .25s ease; }
.entry-panel:hover .entry-head { transform: translateX(6px); }
.entry-bottom { display: flex; justify-content: space-between; align-items: end; gap: 20px; }
.entry-note { color: var(--muted); font-size: 11px; letter-spacing: .04em; }
.entry-arrow { font-family: Georgia, serif; font-size: 28px; }

.identity-strip {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 0 54px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.identity-strip strong {
  color: var(--ink);
  font-family: "Songti SC", "STSong", Georgia, serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}
.identity-links { display: flex; gap: 18px; }
.identity-links a:hover { color: var(--ink); }

section {
  border-top: 1px solid var(--ink);
  padding: 78px 0 96px;
}
.section-head {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  align-items: end;
  gap: 30px;
  margin-bottom: 42px;
}
.section-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.05em;
}
.section-more { color: var(--muted); font-size: 12px; }
.section-more:hover { color: var(--ink); }

.products { display: grid; grid-template-columns: 1.15fr .85fr; gap: 18px; }
.product {
  position: relative;
  min-height: 455px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: transform .25s ease, border-color .25s ease;
}
.product:hover { transform: translateY(-4px); border-color: var(--ink); }
.product.trace { grid-column: 1 / -1; min-height: 345px; }
.product-copy {
  position: relative;
  z-index: 2;
  width: 48%;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
}
.product-num { color: var(--muted); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.product-title {
  margin: auto 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4vw, 55px);
  font-weight: 400;
  line-height: .95;
  letter-spacing: -.05em;
}
.product-tagline {
  margin-top: 14px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--ink);
}
.product-desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--muted);
}
.product-link { margin-top: 22px; font-size: 13px; letter-spacing: .03em; color: var(--ink); }

.preview {
  position: absolute;
  right: -3%;
  bottom: -7%;
  width: 57%;
  aspect-ratio: 1.22;
  overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--ink);
  box-shadow: 18px 22px 0 rgba(0,0,0,.045);
  transform: rotate(-1.6deg);
}
.preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.preview-head {
  height: 34px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 11px;
  border-bottom: 1px solid var(--line);
}
.preview-head i { width: 5px; height: 5px; border: 1px solid var(--muted); border-radius: 50%; }
.preview-body { height: calc(100% - 34px); display: grid; place-items: center; padding: 24px; }
.typing { text-align: center; font-family: Georgia, serif; }
.typing b {
  display: block;
  margin-bottom: 8px;
  font-family: "Songti SC", "STSong", Georgia, serif;
  font-size: 68px;
  font-weight: 400;
}
.typing span {
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: .28em;
}
.orbit { position: relative; width: 170px; height: 170px; border: 1px solid var(--ink); border-radius: 50%; }
.orbit::before,
.orbit::after { content: ""; position: absolute; border: 1px solid var(--line); border-radius: 50%; }
.orbit::before { inset: 24px; }
.orbit::after { inset: 55px; background: var(--ink); }
.node { position: absolute; width: 7px; height: 7px; background: var(--ink); border-radius: 50%; }
.node.a { top: 11px; left: 54px; }
.node.b { right: -2px; top: 78px; }
.node.c { bottom: 19px; left: 19px; }
.preview-name { font-family: Georgia, serif; font-size: 30px; }
.product.trace .product-copy { width: 40%; }
.product.trace .preview,
.preview-tracememo {
  right: 4%;
  bottom: -14%;
  width: 50%;
  aspect-ratio: 1.7;
  transform: rotate(.8deg);
  background: #171715;
  color: #e9e7df;
  border-color: #171715;
}
.preview-tracememo .preview-head { border-color: #30302c; }
.trace-list { width: 82%; border-top: 1px solid #3a3934; }
.trace-row {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #30302c;
  color: #85847d;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
}
.trace-row strong { color: #eceae2; font-weight: 400; }

.writing { border-top: 1px solid var(--line); }
.article {
  min-height: 70px;
  display: grid;
  grid-template-columns: 42px 1fr 120px 65px 20px;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid var(--line);
  transition: padding .2s ease;
}
.article:hover { padding-left: 7px; }
.article-no,
.article-meta { color: var(--muted); font-size: 10px; }
.article-title { font-size: 14px; }
.article-arrow { text-align: right; }

.about { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
.about-editorial { align-self: start; }
.about-label { margin-bottom: 22px; }
.about-word {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(42px, 5vw, 66px);
  line-height: 1.02;
  letter-spacing: -.05em;
}
.muted-word { color: var(--muted); }
.now { border-top: 1px solid var(--ink); }
.now-row {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 20px;
  padding: 13px 0;
  border-bottom: 1px solid var(--line);
  font-size: 11px;
}
.now-row b {
  color: var(--muted);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: .08em;
  text-transform: uppercase;
}

footer {
  border-top: 1px solid var(--ink);
  padding: 28px 0 42px;
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 10px;
}

@media (prefers-color-scheme: dark) {
  .xu-home {
    --bg: #121210;
    --surface: #191916;
    --ink: #efeee8;
    --muted: #96958d;
    --line: #33322d;
  }
  .preview { box-shadow: 18px 22px 0 rgba(255,255,255,.02); }
}

@media (max-width: 860px) {
  .shell { width: min(calc(100% - 32px), 1240px); }
  .masthead-meta { display: none; }
  .entry { grid-template-columns: 1fr; min-height: auto; }
  .entry-panel { min-height: 300px; padding: 48px 0 34px; }
  .entry-panel + .entry-panel { border-left: 0; border-top: 1px solid var(--ink); padding: 48px 0 34px; }
  .entry-title { font-size: 76px; }
  .identity-strip { padding-bottom: 42px; flex-direction: column; gap: 10px; }
  .section-head { grid-template-columns: 1fr; gap: 14px; }
  .section-more { display: none; }
  .products { grid-template-columns: 1fr; }
  .product.trace { grid-column: auto; }
  .product { min-height: 490px; }
  .product-copy,
  .product.trace .product-copy { width: 100%; height: auto; }
  .preview,
  .product.trace .preview { width: 72%; right: -8%; }
  .article { grid-template-columns: 32px 1fr 20px; }
  .article-meta { display: none; }
  .about { grid-template-columns: 1fr; gap: 55px; }
}

@media (max-width: 520px) {
  .masthead { padding-top: 20px; }
  .entry-panel { min-height: 250px; }
  .entry-title { font-size: 58px; }
  .identity-links { gap: 12px; flex-wrap: wrap; }
  .product { min-height: 450px; }
  .product-copy { padding: 25px; }
  .preview,
  .product.trace .preview { width: 92%; right: -20%; }
  .typing b { font-size: 55px; }
  .article { min-height: 72px; grid-template-columns: 26px 1fr 18px; gap: 10px; }
}
</style>
