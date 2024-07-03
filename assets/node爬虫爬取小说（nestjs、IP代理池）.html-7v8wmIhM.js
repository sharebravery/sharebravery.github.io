import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-DdDb7egX.js";const p={},o=t(`<p>项目使用 nestjs、mysql、superagent 等实现小说的爬取，并写了一个 IP 代理池。</p><blockquote><p>// TODO: 引入 IP 池</p><p>// TODO: 控制并发</p><p>// TODO: 爬虫伪装</p><p>// TODO: 断点续传</p><p>// TODO: 自动抓取书籍列表</p><p>// TODO: 外部接口</p></blockquote><h2 id="服务基类-baseservice" tabindex="-1"><a class="header-anchor" href="#服务基类-baseservice"><span>服务基类 BaseService</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 服务基类
 */</span>
<span class="token comment">// @Injectable()</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">BaseService<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> repository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token generic-function"><span class="token function">saveOne</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">TS</span> <span class="token keyword">extends</span> DeepPartial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span></span></span><span class="token punctuation">(</span>
    entities<span class="token operator">:</span> <span class="token constant">TS</span><span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> SaveOptions
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">TS</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>entities<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token generic-function"><span class="token function">saveMany</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">TS</span> <span class="token keyword">extends</span> DeepPartial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;&gt;</span></span></span><span class="token punctuation">(</span>
    entities<span class="token operator">:</span> <span class="token constant">TS</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> SaveOptions
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">TS</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>entities<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">findOne</span><span class="token punctuation">(</span>options<span class="token operator">?</span><span class="token operator">:</span> FindConditions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">findMany</span><span class="token punctuation">(</span>options<span class="token operator">?</span><span class="token operator">:</span> FindConditions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">removeOne</span><span class="token punctuation">(</span>entity<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> options<span class="token operator">?</span><span class="token operator">:</span> RemoveOptions<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>entity<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">removeMany</span><span class="token punctuation">(</span>entities<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> options<span class="token operator">?</span><span class="token operator">:</span> RemoveOptions<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>entities<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>options<span class="token operator">?</span><span class="token operator">:</span> FindConditions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>DeleteResult<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">update</span><span class="token punctuation">(</span>
    conditions<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> FindConditions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
    newValue<span class="token operator">:</span> QueryDeepPartialEntity<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> updateResult <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repository
      <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>conditions<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>updateResult <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> updateResult<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="request-ts" tabindex="-1"><a class="header-anchor" href="#request-ts"><span>request.ts</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> request <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;request-promise&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">RequestOptions</span> <span class="token punctuation">{</span>
  method<span class="token operator">?</span><span class="token operator">:</span> <span class="token string">&quot;GET&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;POST&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">;</span>
  url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  encoding<span class="token operator">?</span> <span class="token operator">=</span> <span class="token string">&quot;utf8&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 编码</span>
  proxy<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 代理</span>
  callback<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">service</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>options<span class="token operator">:</span> RequestOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> url<span class="token punctuation">,</span> method<span class="token punctuation">,</span> encoding<span class="token punctuation">,</span> proxy<span class="token punctuation">,</span> callback <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">RequestOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>options<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token function">request</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
      url<span class="token operator">:</span> url<span class="token punctuation">,</span>
      method<span class="token punctuation">,</span>
      proxy<span class="token punctuation">,</span>
      headers<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&quot;User-Agent&quot;</span><span class="token operator">:</span>
          <span class="token string">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// function (err, res, body) {</span>
    <span class="token comment">//   //   body = iconv.decode(body, encoding);</span>
    <span class="token comment">//   if (err) {</span>
    <span class="token comment">//     console.log(err);</span>
    <span class="token comment">//     return err;</span>
    <span class="token comment">//   } else {</span>
    <span class="token comment">//     callback(body);</span>
    <span class="token comment">//     return body;</span>
    <span class="token comment">//   }</span>
    <span class="token comment">// },</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> service<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crawl-controller-ts" tabindex="-1"><a class="header-anchor" href="#crawl-controller-ts"><span>crawl.controller.ts</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">&quot;Crawl&quot;</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiTags</span></span><span class="token punctuation">(</span><span class="token string">&quot;CrawlController&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CrawlController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> crawlService<span class="token operator">:</span> CrawlService<span class="token punctuation">,</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">InjectRepository</span></span><span class="token punctuation">(</span>Book<span class="token punctuation">)</span>
    <span class="token keyword">private</span> booksRepository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span>Book<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token comment">// TODO:  引入IP池</span>
  <span class="token comment">// TODO:  控制并发</span>
  <span class="token comment">// TODO:  爬虫伪装</span>
  <span class="token comment">// TODO:  断点续传</span>
  <span class="token comment">// TODO:  自动抓取书籍列表</span>
  <span class="token comment">// TODO:  外部接口</span>

  <span class="token doc-comment comment">/**
   *启动爬虫
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> chapter
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> callback
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiOperation</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    summary<span class="token operator">:</span> <span class="token string">&quot;启动爬虫&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">&quot;startCrawlBook&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">async</span> <span class="token function">startCrawlBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ 开始抓取 ]-54&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">const</span> books <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">CrawlBook</span><span class="token punctuation">(</span><span class="token constant">BOOK_URL_LIST</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 书籍基本信息</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> books<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> book <span class="token operator">=</span> books<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 写入书名</span>
        <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>
          <span class="token constant">WRITE_BASEURL</span> <span class="token operator">+</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>book<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.txt</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
          book<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;\\r\\r\\n&quot;</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> chapters <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">analyticalChapterContent</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

        book<span class="token punctuation">.</span>chapters <span class="token operator">=</span> chapters<span class="token punctuation">;</span>

        book<span class="token punctuation">.</span>chaptersJson <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>chapters<span class="token punctuation">)</span><span class="token punctuation">;</span>
        book<span class="token punctuation">.</span>introductionItemsJson <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span>introductionItems<span class="token punctuation">)</span><span class="token punctuation">;</span>
        book<span class="token punctuation">.</span>chaptersDirectoryJson <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span>chaptersDirectoryList<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>crawlService<span class="token punctuation">.</span><span class="token function">SaveBookAsync</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 保存书籍进入数据库</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// this.writeAllFileSync(books); // 一并写入</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ 爬虫运行完毕 ]-76&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> books<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> error<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *并发控制
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Array&lt;string&gt;<span class="token punctuation">}</span> bookList
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token keyword">async</span> <span class="token function">CrawlBook</span><span class="token punctuation">(</span>bookList<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Book<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ 开始抓取目录 ]-92&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> bookList<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> url <span class="token operator">=</span> bookList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> book <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">CrawlBookBaseInfo</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
          book<span class="token punctuation">.</span>url <span class="token operator">=</span> url<span class="token punctuation">;</span>

          data<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// async.mapLimit(</span>
        <span class="token comment">//   bookList,</span>
        <span class="token comment">//   1,</span>
        <span class="token comment">//   async (url, callback) =&gt; {</span>
        <span class="token comment">//     const book = await this.CrawlBookBaseInfo(url, callback);</span>
        <span class="token comment">//     book.url = url;</span>
        <span class="token comment">//     return book;</span>
        <span class="token comment">//   },</span>
        <span class="token comment">//   (err, results) =&gt; {</span>
        <span class="token comment">//     resolve(results);</span>
        <span class="token comment">//   },</span>
        <span class="token comment">// );</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 获取书籍基本信息、抓取目录
   * <span class="token keyword">@param</span> <span class="token parameter">url</span>
   * <span class="token keyword">@param</span> <span class="token parameter">callback</span>
   * <span class="token keyword">@returns</span>
   */</span>
  <span class="token keyword">async</span> <span class="token function">CrawlBookBaseInfo</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> callback<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Book<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>crawlService<span class="token punctuation">.</span><span class="token function">GetHtml</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 装载页面</span>

        <span class="token comment">// 书名</span>
        <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;#novelName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book<span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>

        <span class="token comment">// 简介</span>
        <span class="token keyword">const</span> introduction <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;.C-Two p&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        book<span class="token punctuation">.</span>introduction <span class="token operator">=</span> introduction
          <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">&quot;飞卢小说网&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        introduction<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> el<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&quot;飞卢小说网&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            book<span class="token punctuation">.</span>introductionItems<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//章节目录</span>
        <span class="token keyword">const</span> directory <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;.C-Fo-Zuo a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        directory<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> el<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> directory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Directory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">&quot;https:&quot;</span> <span class="token operator">+</span> <span class="token function">$</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span><span class="token string">&quot;href&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          directory<span class="token punctuation">.</span>title <span class="token operator">=</span> a<span class="token punctuation">;</span>

          directory<span class="token punctuation">.</span>url <span class="token operator">=</span> url<span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> book<span class="token punctuation">.</span>chaptersDirectoryList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>directory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">resolve</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *解析存入章节内容
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> chapters
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token function">analyticalChapterContent</span><span class="token punctuation">(</span>book<span class="token operator">:</span> Book<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Chapter<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ 当前抓取书籍 ]-185&quot;</span><span class="token punctuation">,</span> book<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token punctuation">{</span> chaptersDirectoryList <span class="token punctuation">}</span> <span class="token operator">=</span> book<span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> chapters<span class="token operator">:</span> Chapter<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> bookInfo <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>booksRepository<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 查询书籍</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// for (let i = 0; i &lt; chaptersDirectoryList.length; i++) {</span>
          <span class="token keyword">const</span> item <span class="token operator">=</span> chaptersDirectoryList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            bookInfo<span class="token operator">?.</span>chaptersJson <span class="token operator">&amp;&amp;</span>
            <span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>bookInfo<span class="token punctuation">.</span>chaptersJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Chapter<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> o<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>title<span class="token punctuation">,</span> <span class="token string">&quot;-章节已存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">continue</span><span class="token punctuation">;</span> <span class="token comment">// 如果数据库内存在 则跳过</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">const</span> chapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Chapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot; [  正在抓取 ]-198&quot;</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>crawlService<span class="token punctuation">.</span><span class="token function">GetHtml</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">const</span> $ <span class="token operator">=</span> cheerio<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 装载页面</span>

          chapter<span class="token punctuation">.</span>url <span class="token operator">=</span> item<span class="token punctuation">.</span>url<span class="token punctuation">;</span>

          <span class="token comment">// 章节名称</span>
          <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;#novelName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> title <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;.c_l_title h1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          chapter<span class="token punctuation">.</span>title <span class="token operator">=</span> title<span class="token punctuation">;</span>

          <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">&quot;.noveContent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          chapter<span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 存入完整字符串内容</span>

          <span class="token comment">// 存入段落数组</span>
          content<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&quot;p&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> el<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            chapter<span class="token punctuation">.</span>contents<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          chapters<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>chapter<span class="token punctuation">)</span><span class="token punctuation">;</span>

          chapter<span class="token punctuation">.</span>contentsJson <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>chapter<span class="token punctuation">.</span>contents<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>crawlService<span class="token punctuation">.</span><span class="token function">SaveChapterAsync</span><span class="token punctuation">(</span>chapter<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 保存章节进入数据库</span>

          <span class="token comment">//写入章节</span>
          <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>crawlService<span class="token punctuation">.</span><span class="token function">SaveChapter</span><span class="token punctuation">(</span>
            chapter<span class="token punctuation">,</span>
            <span class="token constant">WRITE_BASEURL</span> <span class="token operator">+</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>book<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.txt</span><span class="token template-punctuation string">\`</span></span>
          <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">resolve</span><span class="token punctuation">(</span>chapters<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crawl-service-ts" tabindex="-1"><a class="header-anchor" href="#crawl-service-ts"><span>crawl.service.ts</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@nestjs/common&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Chapter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./chapter.entity&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> fs <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> delay<span class="token punctuation">,</span> random <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;src/utils&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> request <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;superagent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> superagentProxy <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;superagent-proxy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">superagentProxy</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> charset <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;superagent-charset&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">charset</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Book <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./book.entity&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> InjectRepository <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@nestjs/typeorm&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Repository <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;typeorm&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Proxy <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;src/proxy/proxy.entity&quot;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CrawlService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">InjectRepository</span></span><span class="token punctuation">(</span>Book<span class="token punctuation">)</span>
    <span class="token keyword">private</span> booksRepository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span>Book<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">InjectRepository</span></span><span class="token punctuation">(</span>Chapter<span class="token punctuation">)</span>
    <span class="token keyword">private</span> chaptersRepository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span>Chapter<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">InjectRepository</span></span><span class="token punctuation">(</span>Proxy<span class="token punctuation">)</span>
    <span class="token keyword">private</span> proxyRepository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span>Proxy<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">private</span> time <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  proxy <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  timeoutNumber <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   *获取html页面
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> requestUrl
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> [requestType]
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span>Promise&lt;any&gt;<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token keyword">async</span> <span class="token function">GetHtml</span><span class="token punctuation">(</span>requestUrl<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// const ms = random(500, 2100);</span>
    <span class="token comment">// await delay(ms); // 控制爬虫速度</span>

    <span class="token comment">// if (this.timer) clearInterval(this.timer);</span>

    <span class="token comment">// if (this.time === 0) {</span>
    <span class="token comment">//   let randomIps: Proxy[] = await this.proxyRepository.find();</span>
    <span class="token comment">//   // let randomIps: Proxy[] = await this.proxyRepository.query(</span>
    <span class="token comment">//   //   &#39;SELECT * FROM proxy ORDER BY  RAND() LIMIT 100;&#39;,</span>
    <span class="token comment">//   // );</span>

    <span class="token comment">//   // randomIps = randomIps.filter(</span>
    <span class="token comment">//   //   (o) =&gt; o.speed &lt; 500 &amp;&amp; o.protocols.includes(&#39;http&#39;),</span>
    <span class="token comment">//   // );</span>
    <span class="token comment">//   randomIps = randomIps.filter((o) =&gt; o.country === &#39;CN&#39;);</span>
    <span class="token comment">//   this.proxy = \`\${randomIps[0].protocols[0]}://\${randomIps[0].ip}:\${randomIps[0].port}\`;</span>
    <span class="token comment">// }</span>

    <span class="token comment">// this.timer = setInterval(() =&gt; {</span>
    <span class="token comment">//   this.time++;</span>
    <span class="token comment">//   if (this.time === 1000 * 60 * 30) this.time = 0;</span>
    <span class="token comment">// }, 1000);</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>proxy <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">http://124.204.33.162:8000</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token string">&quot;%c [     this.proxy ]-83&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;font-size:13px; background:pink; color:#bf2c9f;&quot;</span><span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>proxy
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> requestUrl<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">charset</span><span class="token punctuation">(</span><span class="token string">&quot;gb2312&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">proxy</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>proxy<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;Referer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://b.faloo.com/&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">buffer</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>
            <span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36&quot;</span>
          <span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            response<span class="token operator">:</span> <span class="token number">50000</span><span class="token punctuation">,</span> <span class="token comment">// Wait 5 seconds for the server to start sending,</span>
            deadline<span class="token operator">:</span> <span class="token number">60000</span><span class="token punctuation">,</span> <span class="token comment">// but allow 1 minute for the file to finish loading.</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *保存书籍
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Book<span class="token punctuation">}</span> book
   * <span class="token keyword">@memberof</span> CrawlService
   */</span>
  <span class="token keyword">async</span> <span class="token function">SaveBookAsync</span><span class="token punctuation">(</span>book<span class="token operator">:</span> Book<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// console.log(&#39;正在保存书籍&#39;);</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>booksRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token function">SaveChapterAsync</span><span class="token punctuation">(</span>chapter<span class="token operator">:</span> Chapter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// console.log(&#39;正在保存章节&#39;);</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>chaptersRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>chapter<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *保存章节内容
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Chapter<span class="token punctuation">}</span> chapter
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> [writeUrl]
   * <span class="token keyword">@memberof</span> CrawlService
   */</span>
  <span class="token keyword">async</span> <span class="token function">SaveChapter</span><span class="token punctuation">(</span>chapter<span class="token operator">:</span> Chapter<span class="token punctuation">,</span> writeUrl<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span>
      writeUrl<span class="token punctuation">,</span>
      chapter<span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span> <span class="token operator">+</span> chapter<span class="token punctuation">.</span>content<span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// console.log(&#39;写入章节:&#39; + chapter.title);</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *写入所有书籍
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Book[]<span class="token punctuation">}</span> books
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token keyword">async</span> <span class="token function">writeAllFileSync</span><span class="token punctuation">(</span>books<span class="token operator">:</span> Book<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> writeUrl<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> books<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> book <span class="token operator">=</span> books<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>writeUrl<span class="token punctuation">,</span> book<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;\\r\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 写入书名</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> book<span class="token punctuation">.</span>chapters<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> chapter <span class="token operator">=</span> book<span class="token punctuation">.</span>chapters<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span>
          writeUrl<span class="token punctuation">,</span>
          chapter<span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span> <span class="token operator">+</span> chapter<span class="token punctuation">.</span>content<span class="token punctuation">,</span>
          <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// console.log(&#39;写入章节:&#39; + chapter.title);</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;写入完成&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *写入单本书籍
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span> book
   * <span class="token keyword">@memberof</span> CrawlController
   */</span>
  <span class="token keyword">async</span> <span class="token function">writeSingleFileSync</span><span class="token punctuation">(</span>book<span class="token operator">:</span> Book<span class="token punctuation">,</span> i<span class="token punctuation">,</span> writeUrl<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>writeUrl<span class="token punctuation">,</span> book<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&quot;\\r\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 写入书名</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> book<span class="token punctuation">.</span>chapters<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> chapter <span class="token operator">=</span> book<span class="token punctuation">.</span>chapters<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">appendFile</span><span class="token punctuation">(</span>
        writeUrl<span class="token punctuation">,</span>
        chapter<span class="token punctuation">.</span>title <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span> <span class="token operator">+</span> chapter<span class="token punctuation">.</span>content<span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;写入章节:&quot;</span> <span class="token operator">+</span> chapter<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="ip-代理池" tabindex="-1"><a class="header-anchor" href="#ip-代理池"><span>IP 代理池</span></a></h1><h2 id="proxy-entity-ts" tabindex="-1"><a class="header-anchor" href="#proxy-entity-ts"><span>proxy.entity.ts</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ApiProperty <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@nestjs/swagger&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Column<span class="token punctuation">,</span> Entity<span class="token punctuation">,</span> PrimaryColumn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;typeorm&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AuditMetadata <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../entitys/auditMetadata.entity&quot;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Entity</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token keyword">extends</span> <span class="token class-name">AuditMetadata</span> <span class="token punctuation">{</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;IP地址&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">PrimaryColumn</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  ip<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;端口&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  port<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token comment">// @ApiProperty({ description: &#39;代理位置&#39; })</span>
  <span class="token comment">// @Column()</span>
  <span class="token comment">// location: string;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;country&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  country<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;city&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  city<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;isp&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  isp<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;最后检查时间&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  lastChecked<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;速度&quot;</span><span class="token punctuation">,</span> nullable<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  speed<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;匿名等级&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  anonymityLevel<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;匿名协议&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span> nullable<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  protocols<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;http | https&quot;</span><span class="token punctuation">,</span> nullable<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> nullable<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  type<span class="token operator">:</span> ProxyType<span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiProperty</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> description<span class="token operator">:</span> <span class="token string">&quot;是否可用&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span> nullable<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  available<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">enum</span> ProxyType <span class="token punctuation">{</span>
  http<span class="token punctuation">,</span>
  https<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="proxy-controller-ts" tabindex="-1"><a class="header-anchor" href="#proxy-controller-ts"><span>proxy.controller.ts</span></a></h2><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">// const REQUEST_URL_LIST = [&#39;https://example.com/&#39;];</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiTags</span></span><span class="token punctuation">(</span><span class="token string">&quot;ProxyController&quot;</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token string">&quot;Proxy&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ProxyController</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">readonly</span> proxyService<span class="token operator">:</span> ProxyService<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiOperation</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    summary<span class="token operator">:</span> <span class="token string">&quot;抓取代理进入IP池&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">&quot;GetProxyList&quot;</span><span class="token punctuation">)</span>
  <span class="token function">GetProxyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>proxyService<span class="token punctuation">.</span><span class="token function">GetProxyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">ApiOperation</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    summary<span class="token operator">:</span> <span class="token string">&quot;校验代理&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token string">&quot;CheckProxy&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">async</span> <span class="token function">CheckProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>proxyService<span class="token punctuation">.</span><span class="token function">CheckProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","node爬虫爬取小说（nestjs、IP代理池）.html.vue"]]),d=JSON.parse('{"path":"/node/node%E7%88%AC%E8%99%AB%E7%88%AC%E5%8F%96%E5%B0%8F%E8%AF%B4%EF%BC%88nestjs%E3%80%81IP%E4%BB%A3%E7%90%86%E6%B1%A0%EF%BC%89.html","title":"node爬虫爬取小说（nestjs、IP代理池）","lang":"zh-CN","frontmatter":{"title":"node爬虫爬取小说（nestjs、IP代理池）","date":"2022-03-10T00:00:00.000Z","tag":["node","nestjs","mysql","ts","IP代理池"],"categories":["node"]},"headers":[{"level":2,"title":"服务基类 BaseService","slug":"服务基类-baseservice","link":"#服务基类-baseservice","children":[]},{"level":2,"title":"request.ts","slug":"request-ts","link":"#request-ts","children":[]},{"level":2,"title":"crawl.controller.ts","slug":"crawl-controller-ts","link":"#crawl-controller-ts","children":[]},{"level":2,"title":"crawl.service.ts","slug":"crawl-service-ts","link":"#crawl-service-ts","children":[]},{"level":2,"title":"proxy.entity.ts","slug":"proxy-entity-ts","link":"#proxy-entity-ts","children":[]},{"level":2,"title":"proxy.controller.ts","slug":"proxy-controller-ts","link":"#proxy-controller-ts","children":[]}],"git":{"createdTime":1680753390000,"updatedTime":1680753390000,"contributors":[{"name":"sharebravery","email":"sharebavery@gmail.com","commits":1}]},"readingTime":{"minutes":5.5,"words":1650},"filePathRelative":"node/node爬虫爬取小说（nestjs、IP代理池）.md","localizedDate":"2022年3月10日","excerpt":""}');export{k as comp,d as data};
