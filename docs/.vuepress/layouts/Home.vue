<script setup>
import { homePosts, homeProducts } from "@temp/home-data.js";

const external = (url) => /^https?:\/\//.test(url ?? "");
const productHref = (product) => product?.url || product?.path || "#";
const productByPreview = (preview) => homeProducts.find((product) => product.preview === preview);
const traceMemo = productByPreview("tracememo") || homeProducts[0];
const chainCanvas = productByPreview("chaincanvas");
const shuangpin = productByPreview("shuangpin");
const secondaryProducts = [chainCanvas, shuangpin].filter(Boolean);

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
  <div class="studio-home">
    <header class="site-nav">
      <div class="shell nav-inner">
        <a class="brand" href="/">
          <span class="brand-mark" />
          <strong>Xu Duoyan</strong>
          <small>许多言</small>
        </a>
        <nav class="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="/article/">Writing</a>
          <a href="#about">About</a>
          <a href="https://github.com/sharebravery" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="shell hero">
        <div class="hero-copy-wrap">
          <div class="hero-kicker"><i />Software · Web3 · Systems</div>
          <h1>Building useful systems around crypto, markets and agents.</h1>
          <p class="hero-copy">
            我做产品，也研究底层机制。现在主要关注链上数据、Prediction Markets、
            Agent 工作流与开发者工具，把复杂系统变成可以真正使用和验证的软件。
          </p>
          <div class="hero-actions">
            <a class="button primary" href="#work">Explore work ↓</a>
            <a class="button" href="https://github.com/sharebravery" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a class="button" href="/article/">Read writing →</a>
          </div>
        </div>

        <div class="system-scene" aria-hidden="true">
          <div class="scene-glow" />

          <div class="float-card wallet-card">
            <div class="float-label">ONCHAIN CONTEXT</div>
            <div class="wallet-code">0x7A32…92F1</div>
            <div class="wallet-foot"><span>Seen 3×</span><span>remembered</span></div>
          </div>

          <div class="dashboard">
            <div class="dash-head">
              <span>PREDICTION MARKET / SIGNAL VIEW</span>
              <span class="live">LIVE</span>
            </div>
            <div class="market-row">
              <div>
                <small>MARKET</small>
                <div class="market-question">Will BTC close above $120k this week?</div>
              </div>
              <div class="probability">67%</div>
            </div>
            <div class="metrics">
              <div class="metric"><small>PRICE SIGNAL</small><strong>+2.8%</strong></div>
              <div class="metric"><small>LIQUIDITY</small><strong>$1.24M</strong></div>
              <div class="metric"><small>AGENT CONF.</small><strong>0.81</strong></div>
            </div>
          </div>

          <div class="float-card agent-card">
            <div class="agent-head"><span>Agent run</span><span>active</span></div>
            <div class="agent-list">
              <div class="agent-item"><i /><span>Collect market context</span></div>
              <div class="agent-item"><i /><span>Compare contract state</span></div>
              <div class="agent-item"><i /><span>Persist findings</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" class="shell work-section">
        <div class="section-head">
          <div>
            <span class="section-kicker">Selected work</span>
            <h2>Products from real problems.</h2>
          </div>
          <p>首页只展示少量代表项目。项目本身负责证明能力，而不是再做一层“技能介绍”。</p>
        </div>

        <a
          v-if="traceMemo"
          class="featured-project"
          :href="productHref(traceMemo)"
          :target="external(productHref(traceMemo)) ? '_blank' : undefined"
          :rel="external(productHref(traceMemo)) ? 'noreferrer' : undefined"
        >
          <div class="featured-copy">
            <span class="project-tag">FEATURED · WEB3 · {{ traceMemo.status === 'development' ? 'IN DEVELOPMENT' : 'LIVE' }}</span>
            <h3>{{ traceMemo.name }}</h3>
            <p>{{ traceMemo.description || traceMemo.tagline }}</p>
            <div class="tech-line">Browser Extension · TypeScript · Dexie · Local-first</div>
            <span class="project-link">View project ↗</span>
          </div>

          <div class="product-stage">
            <div class="extension-window">
              <div class="window-bar"><i /><i /><i /></div>
              <div class="window-content">
                <div class="lookup"><span>0x7A32f11A…92F1</span><span>Known address</span></div>
                <div class="memory-grid">
                  <div class="memory-panel">
                    <div class="memory-title">MEMORY</div>
                    <div class="memory-row">Seen on explorer <small>Aug 21 · Etherscan</small></div>
                    <div class="memory-row">Liquidity wallet <small>Saved manually</small></div>
                    <div class="memory-row">Related to prior research <small>3 previous visits</small></div>
                  </div>
                  <div class="memory-panel">
                    <div class="memory-title">CONTEXT</div>
                    <div class="memory-row">Protocol interaction <small>DEX / router</small></div>
                    <div class="memory-row">Confidence <small>High</small></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <div class="project-grid">
          <a
            v-for="product in secondaryProducts"
            :key="product.path"
            class="project-card"
            :class="product.preview"
            :href="productHref(product)"
            :target="external(productHref(product)) ? '_blank' : undefined"
            :rel="external(productHref(product)) ? 'noreferrer' : undefined"
          >
            <span class="project-tag">{{ product.type.toUpperCase() }} · {{ product.status === 'development' ? 'IN DEVELOPMENT' : 'LIVE' }}</span>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description || product.tagline }}</p>

            <div class="mini-stage">
              <div v-if="product.preview === 'chaincanvas'" class="orbit">
                <i /><i /><i />
              </div>
              <div v-else class="typing">
                <strong>你好</strong>
                <small>NI · HAO</small>
              </div>
            </div>
          </a>
        </div>

        <div class="focus-panel">
          <div class="focus-title">
            <span class="section-kicker">Current focus</span>
            <h3>What I keep returning to.</h3>
          </div>
          <div class="focus-grid">
            <div class="focus-item"><small>01 / ONCHAIN</small><strong>Context & identity</strong></div>
            <div class="focus-item"><small>02 / MARKETS</small><strong>Prediction markets</strong></div>
            <div class="focus-item"><small>03 / AGENTS</small><strong>Reliable workflows</strong></div>
            <div class="focus-item"><small>04 / SYSTEMS</small><strong>Protocol boundaries</strong></div>
          </div>
        </div>

        <div class="writing-preview">
          <div class="section-head">
            <div>
              <span class="section-kicker">Selected writing</span>
              <h2>Notes from the work.</h2>
            </div>
            <a class="button compact" href="/article/">View all writing →</a>
          </div>

          <div class="notes-grid">
            <a v-for="post in homePosts" :key="post.path" class="note-card" :href="post.path">
              <small>{{ post.category || 'WRITING' }} · {{ formatDate(post.date) }}</small>
              <strong>{{ post.title }}</strong>
              <span>Read note →</span>
            </a>
          </div>
        </div>
      </section>

      <section id="about" class="shell about-section">
        <h2>I build things, study how systems behave, and keep the useful parts.</h2>
        <div>
          <p>
            这个站是作品、研究和写作的统一入口，不承担在线简历的职责。
            首页保持产品与系统感；Writing 则进入专门的浅色阅读空间。
          </p>
          <div class="about-links">
            <a href="https://github.com/sharebravery" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://x.com/sharebravery" target="_blank" rel="noreferrer">X ↗</a>
            <a href="mailto:sharebravery@gmail.com">Email ↗</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="shell footer">
      <span>© 2026 Xu Duoyan / 许多言</span>
      <span>Work · Writing · GitHub</span>
    </footer>
  </div>
</template>

<style scoped>
.studio-home {
  --bg: #090c11;
  --panel: #0f141c;
  --panel-2: #151b26;
  --text: #f4f7fb;
  --muted: #929aa8;
  --line: rgba(255,255,255,.09);
  --blue: #7082ff;
  --blue-bright: #9aa8ff;
  --mint: #62dfbd;
  --blue-soft: rgba(112,130,255,.13);
  --mint-soft: rgba(98,223,189,.10);
  min-height: 100vh;
  background:
    radial-gradient(circle at 82% 4%, rgba(112,130,255,.12), transparent 24%),
    radial-gradient(circle at 76% 24%, rgba(98,223,189,.035), transparent 18%),
    var(--bg);
  color: var(--text);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Noto Sans CJK SC", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.studio-home * { box-sizing: border-box; }
.studio-home a { color: inherit; text-decoration: none; }
.shell { width: min(calc(100% - 44px), 1200px); margin: 0 auto; }

.site-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid rgba(255,255,255,.06);
  background: rgba(9,12,17,.76);
  backdrop-filter: blur(20px);
}
.nav-inner { min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { display: flex; align-items: center; gap: 11px; }
.brand-mark { position: relative; width: 11px; height: 11px; border-radius: 50%; background: linear-gradient(135deg,var(--blue),var(--mint)); box-shadow: 0 0 0 6px rgba(112,130,255,.07), 0 0 20px rgba(112,130,255,.3); }
.brand-mark::after { content: ""; position: absolute; width: 4px; height: 4px; right: -2px; top: -2px; border-radius: 50%; background: var(--mint); }
.brand strong { font-size: 14px; letter-spacing: -.025em; }
.brand small { color: var(--muted); font-size: 10px; }
.nav-links { display: flex; align-items: center; gap: 22px; color: var(--muted); font-size: 12px; }
.nav-links a:hover { color: var(--text); }

.hero { min-height: 670px; padding: 78px 0 70px; display: grid; grid-template-columns: minmax(0,.92fr) minmax(470px,1.08fr); gap: 64px; align-items: center; }
.hero-kicker { display: inline-flex; align-items: center; gap: 9px; color: var(--mint); font: 10px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .08em; text-transform: uppercase; }
.hero-kicker i { width: 23px; height: 1px; background: var(--mint); }
.hero h1 { margin: 20px 0 22px; max-width: 650px; font-size: clamp(46px,5.5vw,72px); font-weight: 650; line-height: 1.01; letter-spacing: -.057em; }
.hero-copy { max-width: 600px; margin: 0; color: var(--muted); font-size: 16px; line-height: 1.75; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.button { min-height: 42px; padding: 0 16px; border: 1px solid var(--line); border-radius: 11px; background: rgba(255,255,255,.035); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; transition: .18s ease; }
.button:hover { transform: translateY(-2px); border-color: rgba(154,168,255,.44); }
.button.primary { border-color: transparent; background: linear-gradient(135deg,#7181ff,#5f6df2); box-shadow: 0 12px 30px rgba(96,110,243,.2); }
.button.compact { min-height: 38px; }

.system-scene { position: relative; height: 500px; isolation: isolate; }
.scene-glow { position: absolute; inset: 9% 0 5% 9%; z-index: -1; border-radius: 50%; background: radial-gradient(circle,rgba(112,130,255,.18),transparent 62%); filter: blur(14px); }
.dashboard { position: absolute; width: 82%; min-height: 332px; right: 0; top: 78px; padding: 20px; border: 1px solid rgba(255,255,255,.13); border-radius: 24px; background: linear-gradient(180deg,rgba(20,25,35,.97),rgba(12,15,21,.97)); box-shadow: 0 34px 90px rgba(0,0,0,.4); transform: rotate(-1.4deg); }
.dash-head { display: flex; justify-content: space-between; gap: 14px; padding-bottom: 17px; border-bottom: 1px solid var(--line); color: var(--muted); font: 9px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .06em; }
.live { display: inline-flex; align-items: center; gap: 7px; color: var(--mint); }
.live::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--mint); box-shadow: 0 0 0 5px var(--mint-soft); }
.market-row { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: end; padding: 22px 0; border-bottom: 1px solid var(--line); }
.market-row small { color: var(--muted); font: 9px ui-monospace,SFMono-Regular,Menlo,monospace; }
.market-question { margin-top: 7px; max-width: 310px; font-size: 18px; line-height: 1.3; letter-spacing: -.025em; }
.probability { color: var(--blue-bright); font-size: 42px; font-weight: 650; letter-spacing: -.06em; }
.metrics { padding-top: 16px; display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; }
.metric { padding: 12px; border: 1px solid rgba(255,255,255,.06); border-radius: 11px; background: rgba(255,255,255,.03); }
.metric small { display: block; margin-bottom: 8px; color: var(--muted); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; }
.metric strong { font-size: 12px; }
.float-card { position: absolute; border: 1px solid rgba(255,255,255,.13); border-radius: 17px; background: rgba(18,22,31,.94); backdrop-filter: blur(16px); box-shadow: 0 20px 55px rgba(0,0,0,.3); }
.wallet-card { width: 225px; left: 0; top: 22px; padding: 16px; transform: rotate(2deg); }
.float-label { color: var(--muted); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .07em; }
.wallet-code { margin-top: 10px; font: 12px ui-monospace,SFMono-Regular,Menlo,monospace; }
.wallet-foot { margin-top: 13px; display: flex; justify-content: space-between; color: var(--muted); font-size: 9px; }
.wallet-foot span:last-child { color: var(--mint); }
.agent-card { width: 245px; right: 20px; bottom: 9px; padding: 16px; transform: rotate(1.3deg); }
.agent-head { display: flex; justify-content: space-between; font-size: 10px; }
.agent-head span:last-child { color: var(--mint); }
.agent-list { margin-top: 13px; display: grid; gap: 9px; }
.agent-item { display: flex; align-items: center; gap: 9px; color: var(--muted); font-size: 9px; }
.agent-item i { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 4px var(--blue-soft); }

.work-section { padding: 90px 0; }
.section-head { margin-bottom: 28px; display: flex; align-items: end; justify-content: space-between; gap: 30px; }
.section-kicker { color: var(--blue-bright); font: 9px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .08em; text-transform: uppercase; }
.section-head h2 { margin: 10px 0 0; font-size: clamp(32px,4vw,48px); line-height: 1.03; letter-spacing: -.05em; }
.section-head > p { max-width: 380px; margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }

.featured-project { min-height: 560px; display: grid; grid-template-columns: .88fr 1.12fr; overflow: hidden; border: 1px solid rgba(255,255,255,.08); border-radius: 28px; background: radial-gradient(circle at 77% 23%,rgba(98,223,189,.11),transparent 27%),linear-gradient(145deg,#131929,#0d1119 58%,#0a0d12); box-shadow: 0 28px 86px rgba(0,0,0,.28); }
.featured-copy { padding: 46px 26px 46px 46px; display: flex; flex-direction: column; justify-content: center; }
.project-tag { width: max-content; padding: 7px 9px; border: 1px solid rgba(112,130,255,.19); border-radius: 999px; background: rgba(112,130,255,.09); color: var(--blue-bright); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .05em; }
.featured-copy h3 { margin: 20px 0 13px; font-size: clamp(44px,5.5vw,68px); line-height: .96; letter-spacing: -.065em; }
.featured-copy p { max-width: 430px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.75; }
.tech-line { margin-top: 22px; color: #b2b8c5; font: 9px ui-monospace,SFMono-Regular,Menlo,monospace; line-height: 1.6; }
.project-link { margin-top: 25px; font-size: 11px; font-weight: 600; }
.product-stage { min-height: 560px; position: relative; overflow: hidden; }
.extension-window { position: absolute; width: 92%; min-height: 380px; top: 78px; right: -7%; overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 20px; background: #0a0d12; box-shadow: 0 30px 76px rgba(0,0,0,.43); transform: rotate(-1.8deg); }
.window-bar { height: 42px; padding: 0 13px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid rgba(255,255,255,.08); background: #121720; }
.window-bar i { width: 6px; height: 6px; border: 1px solid #646b77; border-radius: 50%; }
.window-content { padding: 20px; }
.lookup { padding: 14px; display: flex; justify-content: space-between; gap: 20px; border: 1px solid rgba(255,255,255,.08); border-radius: 11px; background: #10141b; font: 10px ui-monospace,SFMono-Regular,Menlo,monospace; }
.lookup span:last-child { color: var(--mint); }
.memory-grid { margin-top: 14px; display: grid; grid-template-columns: 1.1fr .9fr; gap: 12px; }
.memory-panel { min-height: 210px; padding: 15px; border: 1px solid rgba(255,255,255,.065); border-radius: 13px; background: #10141b; }
.memory-title { margin-bottom: 11px; color: var(--muted); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; }
.memory-row { padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.065); color: #c7cbd3; font-size: 10px; }
.memory-row small { display: block; margin-top: 5px; color: var(--muted); font-size: 8px; }

.project-grid { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.project-card { min-height: 400px; padding: 27px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.07); border-radius: 23px; }
.project-card.chaincanvas { background: radial-gradient(circle at 78% 32%,rgba(112,130,255,.13),transparent 30%),#111622; }
.project-card.shuangpin { background: radial-gradient(circle at 78% 30%,rgba(98,223,189,.09),transparent 28%),#111815; }
.project-card h3 { margin: 15px 0 9px; font-size: 31px; letter-spacing: -.045em; }
.project-card p { max-width: 410px; margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
.mini-stage { position: absolute; left: 27px; right: 27px; bottom: 27px; height: 178px; border: 1px solid rgba(255,255,255,.075); border-radius: 15px; background: rgba(8,10,14,.42); display: grid; place-items: center; }
.orbit { position: relative; width: 125px; height: 125px; border: 1px solid var(--blue-bright); border-radius: 50%; }
.orbit::before,.orbit::after { content: ""; position: absolute; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; }
.orbit::before { inset: 23px; }
.orbit::after { inset: 48px; background: var(--blue); border-color: var(--blue); box-shadow: 0 0 0 13px var(--blue-soft); }
.orbit i { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--mint); }
.orbit i:nth-child(1) { top: 7px; left: 35px; }
.orbit i:nth-child(2) { right: -4px; top: 54px; }
.orbit i:nth-child(3) { bottom: 12px; left: 15px; }
.typing { text-align: center; }
.typing strong { display: block; font-size: 53px; letter-spacing: -.06em; }
.typing small { display: block; margin-top: 7px; color: var(--muted); font: 9px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: .22em; }

.focus-panel { margin-top: 72px; padding: 28px; display: grid; grid-template-columns: 210px 1fr; gap: 28px; border: 1px solid rgba(112,130,255,.13); border-radius: 21px; background: linear-gradient(135deg,rgba(112,130,255,.08),rgba(98,223,189,.025)); }
.focus-title h3 { margin: 7px 0 0; font-size: 23px; letter-spacing: -.035em; }
.focus-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.focus-item { min-height: 100px; padding: 14px; border: 1px solid rgba(255,255,255,.055); border-radius: 14px; background: rgba(255,255,255,.025); }
.focus-item small { color: var(--blue-bright); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; }
.focus-item strong { display: block; margin-top: 26px; font-size: 12px; line-height: 1.4; }

.writing-preview { margin-top: 86px; }
.notes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.note-card { min-height: 170px; padding: 20px; border: 1px solid rgba(255,255,255,.07); border-radius: 17px; background: rgba(255,255,255,.025); display: flex; flex-direction: column; transition: .18s ease; }
.note-card:hover { transform: translateY(-3px); background: rgba(255,255,255,.04); }
.note-card small { color: var(--blue-bright); font: 8px ui-monospace,SFMono-Regular,Menlo,monospace; text-transform: uppercase; }
.note-card strong { max-width: 470px; margin: auto 0 8px; font-size: 17px; line-height: 1.3; letter-spacing: -.025em; }
.note-card span { color: var(--muted); font-size: 10px; }

.about-section { padding: 90px 0 70px; display: grid; grid-template-columns: 1.15fr .85fr; gap: 70px; align-items: start; }
.about-section h2 { margin: 0; max-width: 680px; font-size: clamp(32px,4vw,48px); line-height: 1.08; letter-spacing: -.05em; }
.about-section p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.8; }
.about-links { margin-top: 20px; display: flex; gap: 18px; flex-wrap: wrap; font-size: 11px; font-weight: 600; }
.footer { padding: 26px 0 40px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; gap: 20px; color: var(--muted); font-size: 10px; }

@media (prefers-reduced-motion: no-preference) {
  .wallet-card { animation: float-wallet 7s ease-in-out infinite; }
  .agent-card { animation: float-agent 8s ease-in-out infinite; }
  @keyframes float-wallet { 0%,100%{transform:rotate(2deg) translateY(0)} 50%{transform:rotate(1deg) translateY(-7px)} }
  @keyframes float-agent { 0%,100%{transform:rotate(1.3deg) translateY(0)} 50%{transform:rotate(2deg) translateY(6px)} }
}

@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; }
  .system-scene { min-height: 500px; }
  .featured-project { grid-template-columns: 1fr; }
  .featured-copy { padding: 42px; }
  .product-stage { min-height: 490px; }
  .focus-panel { grid-template-columns: 1fr; }
  .focus-grid { grid-template-columns: 1fr 1fr; }
  .about-section { grid-template-columns: 1fr; gap: 26px; }
}

@media (max-width: 680px) {
  .shell { width: min(calc(100% - 28px),1200px); }
  .brand small { display: none; }
  .nav-links a:nth-child(-n+3) { display: none; }
  .hero { min-height: auto; padding: 62px 0 48px; gap: 40px; }
  .hero h1 { font-size: 46px; }
  .system-scene { height: 455px; min-height: 455px; }
  .dashboard { width: 92%; right: -3%; top: 85px; }
  .wallet-card { width: 205px; }
  .agent-card { width: 215px; right: 0; }
  .metrics { grid-template-columns: 1fr; }
  .section-head { align-items: flex-start; flex-direction: column; }
  .featured-copy { padding: 32px 24px; }
  .product-stage { min-height: 400px; }
  .extension-window { width: 96%; right: -12%; top: 52px; }
  .memory-grid { grid-template-columns: 1fr; }
  .memory-panel:nth-child(2) { display: none; }
  .project-grid { grid-template-columns: 1fr; }
  .focus-grid { grid-template-columns: 1fr; }
  .notes-grid { grid-template-columns: 1fr; }
  .footer { flex-direction: column; }
}
</style>
