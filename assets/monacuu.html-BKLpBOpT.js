import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-DWQcF8C0.js";const p={},o=t(`<p>由于有大量的爬虫配置需要调试，下载运行后端代码过于笨重，于是使用和 vscode 同样的编辑器 monaco-editor 加上 websocket 实现在线调试。</p><h2 id="usemonaco" tabindex="-1"><a class="header-anchor" href="#usemonaco"><span>useMonaco</span></a></h2><p>对 monaco-editor 提供的 API 进行一些基础的封装以便提供外部使用，这里有一点需要注意的是读取值(getValue)和赋值（setValue）的时候需要使用 toRaw 函数对 editor 包裹一层，不然页面会卡死。</p><h3 id="toraw-官网说法" tabindex="-1"><a class="header-anchor" href="#toraw-官网说法"><span>toRaw()官网说法</span></a></h3><blockquote><p>根据一个 Vue 创建的代理返回其原始对象。这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。</p><p><code>function toRaw&lt;T&gt;(_proxy_: T): T</code></p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 14:45:34
 */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> toRaw<span class="token punctuation">,</span> unref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> monaco <span class="token keyword">from</span> <span class="token string">&quot;monaco-editor&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> EditorWorker <span class="token keyword">from</span> <span class="token string">&quot;monaco-editor/esm/vs/editor/editor.worker?worker&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> JsonWorker <span class="token keyword">from</span> <span class="token string">&quot;monaco-editor/esm/vs/language/json/json.worker?worker&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> TSWorker <span class="token keyword">from</span> <span class="token string">&quot;monaco-editor/esm/vs/language/typescript/ts.worker?worker&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> languages <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token string">&quot;typescript&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;javascript&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;yaml&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;bat&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;cpp&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;css&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;dockerfile&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;go&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;graphql&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;html&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;ini&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;java&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;json&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;julia&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;kotlin&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;less&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;markdown&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;objective-c&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;pascal&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;pascaligo&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;php&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;powershell&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;r&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;redis&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;rust&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;scala&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;scheme&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;scss&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;shell&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;sophia&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;sql&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;swift&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;tcl&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;xml&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useMonaco</span><span class="token punctuation">(</span>
  domElement<span class="token operator">:</span> HTMLElement <span class="token operator">|</span> Ref<span class="token operator">&lt;</span>HTMLElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  override<span class="token operator">?</span><span class="token operator">:</span> monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IEditorOverrideServices
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  self<span class="token punctuation">.</span>MonacoEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">getWorker</span><span class="token punctuation">(</span>_<span class="token punctuation">,</span> label<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>label <span class="token operator">===</span> <span class="token string">&quot;json&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JsonWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>label <span class="token operator">===</span> <span class="token string">&quot;css&quot;</span> <span class="token operator">||</span> label <span class="token operator">===</span> <span class="token string">&quot;scss&quot;</span> <span class="token operator">||</span> label <span class="token operator">===</span> <span class="token string">&quot;less&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//   return new cssWorker();</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>label <span class="token operator">===</span> <span class="token string">&quot;html&quot;</span> <span class="token operator">||</span> label <span class="token operator">===</span> <span class="token string">&quot;handlebars&quot;</span> <span class="token operator">||</span> label <span class="token operator">===</span> <span class="token string">&quot;razor&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//   return new htmlWorker();</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>label <span class="token operator">===</span> <span class="token string">&quot;typescript&quot;</span> <span class="token operator">||</span> label <span class="token operator">===</span> <span class="token string">&quot;javascript&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TSWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EditorWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> editor <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IStandaloneCodeEditor<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> monacoOptions <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span>monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IStandaloneEditorConstructionOptions<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span>
      theme<span class="token operator">:</span> <span class="token string">&quot;vs-dark&quot;</span><span class="token punctuation">,</span>
      language<span class="token operator">:</span> <span class="token string">&quot;typescript&quot;</span><span class="token punctuation">,</span>
      tabSize<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      automaticLayout<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 自适应宽高</span>
      selectOnLineNumbers<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 显示行号</span>
      multiCursorModifier<span class="token operator">:</span> <span class="token string">&quot;ctrlCmd&quot;</span><span class="token punctuation">,</span>
      fontSize<span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token comment">// 字体大小</span>
      scrollbar<span class="token operator">:</span> <span class="token punctuation">{</span>
        verticalScrollbarSize<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
        horizontalScrollbarSize<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">getValue</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>editor<span class="token punctuation">.</span>value<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span>
    ops<span class="token operator">:</span> monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IStandaloneEditorConstructionOptions <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> defaultOptions<span class="token operator">:</span> monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IStandaloneEditorConstructionOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">unref</span><span class="token punctuation">(</span>monacoOptions<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token operator">...</span>ops<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    editor<span class="token punctuation">.</span>value <span class="token operator">=</span> monaco<span class="token punctuation">.</span>editor<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>
      <span class="token function">unref</span><span class="token punctuation">(</span>domElement<span class="token punctuation">)</span><span class="token punctuation">,</span>
      defaultOptions<span class="token punctuation">,</span>
      override
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> editor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> monaco<span class="token punctuation">,</span> editor<span class="token punctuation">,</span> monacoOptions<span class="token punctuation">,</span> create<span class="token punctuation">,</span> languages<span class="token punctuation">,</span> getValue <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="monacoeditor-component" tabindex="-1"><a class="header-anchor" href="#monacoeditor-component"><span>MonacoEditor Component</span></a></h2><div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><pre class="language-vue"><code><span class="token comment">&lt;!--
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 14:46:10
--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onBeforeUnmount<span class="token punctuation">,</span> onMounted<span class="token punctuation">,</span> shallowRef<span class="token punctuation">,</span> toRaw <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> type <span class="token operator">*</span> <span class="token keyword">as</span> monacoType <span class="token keyword">from</span> <span class="token string">&quot;monaco-editor&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> message <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;ant-design-vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> useMonaco <span class="token keyword">from</span> <span class="token string">&quot;../hooks/useMonaco&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">IProps</span>
  <span class="token keyword">extends</span> <span class="token class-name">monacoType<span class="token punctuation">.</span>editor<span class="token punctuation">.</span>IStandaloneEditorConstructionOptions</span> <span class="token punctuation">{</span>
  showToolbar<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>IProps<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">showToolbar</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">&quot;vs-dark&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">language</span><span class="token operator">:</span> <span class="token string">&quot;yaml&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;update:value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;onCtrlS&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;onF5&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">YAML_KEY</span> <span class="token operator">=</span> <span class="token string">&quot;YAML_KEY&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> editorRef <span class="token operator">=</span> <span class="token function">shallowRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> monaco<span class="token punctuation">,</span> editor<span class="token punctuation">,</span> create<span class="token punctuation">,</span> getValue <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useMonaco</span><span class="token punctuation">(</span>editorRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">setValue</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">toRaw</span><span class="token punctuation">(</span>editor<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token operator">?.</span><span class="token function">setValue</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">onBeforeUnmount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  editor<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// new Proxy({},{</span>
<span class="token comment">//   set</span>
<span class="token comment">// })</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> localYaml <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token constant">YAML_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>localYaml<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    value <span class="token operator">=</span> localYaml<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">language</span><span class="token operator">:</span> <span class="token string">&quot;yaml&quot;</span><span class="token punctuation">,</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> editor<span class="token punctuation">)</span><span class="token punctuation">;</span>

  editor<span class="token punctuation">.</span>value<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">onDidChangeModelContent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;update:value&quot;</span><span class="token punctuation">,</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  editor<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">addCommand</span><span class="token punctuation">(</span>monaco<span class="token punctuation">.</span>KeyMod<span class="token punctuation">.</span>CtrlCmd <span class="token operator">|</span> monaco<span class="token punctuation">.</span>KeyCode<span class="token punctuation">.</span>KeyS<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token constant">YAML_KEY</span><span class="token punctuation">,</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;onCtrlS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    message<span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token string">&quot;保存成功&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  editor<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">addCommand</span><span class="token punctuation">(</span>monaco<span class="token punctuation">.</span>KeyCode<span class="token punctuation">.</span><span class="token constant">F5</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;onF5&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">defineExpose</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  setValue<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>editorRef<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ height: &#39;inherit&#39;, width: &#39;100%&#39; }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>less<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">ul</span> <span class="token punctuation">{</span>
  <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token selector">li</span> <span class="token punctuation">{</span>
    <span class="token selector">h3</span> <span class="token punctuation">{</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 16px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usesignalr" tabindex="-1"><a class="header-anchor" href="#usesignalr"><span>useSignalR</span></a></h2><p>长链接服务使用了@microsoft/signalr，由于涉及到的业务不复杂，所以没有做过多的封装。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-02 16:50:02
 */</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> SignalR <span class="token keyword">from</span> <span class="token string">&quot;@microsoft/signalr&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> HubConnection<span class="token punctuation">,</span> IHttpConnectionOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@microsoft/signalr&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useSignalR</span><span class="token punctuation">(</span>
  signalRUrl<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  options<span class="token operator">:</span> IHttpConnectionOptions <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> connection <span class="token operator">=</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span>HubConnection<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token class-name">SignalR</span><span class="token punctuation">.</span><span class="token function">HubConnectionBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withUrl</span><span class="token punctuation">(</span>signalRUrl<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">configureLogging</span><span class="token punctuation">(</span>SignalR<span class="token punctuation">.</span>LogLevel<span class="token punctuation">.</span>None<span class="token punctuation">)</span> <span class="token comment">// 日志等级</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token keyword">as</span> HubConnection<span class="token punctuation">;</span>

  connection<span class="token punctuation">.</span><span class="token function">onreconnecting</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ onreconnecting ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  connection<span class="token punctuation">.</span><span class="token function">onreconnected</span><span class="token punctuation">(</span><span class="token punctuation">(</span>connectionId<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ onreconnected ]&quot;</span><span class="token punctuation">,</span> connectionId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  connection<span class="token punctuation">.</span><span class="token function">onclose</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;[ onclose ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    connection<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usesignalrforeditor" tabindex="-1"><a class="header-anchor" href="#usesignalrforeditor"><span>useSignalRForEditor</span></a></h2><p>提供的一些调试方法。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token comment">/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-12-05 11:20:00
 */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token operator">*</span> <span class="token keyword">as</span> signalr <span class="token keyword">from</span> <span class="token string">&quot;@microsoft/signalr&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> HubConnectionState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@microsoft/signalr&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> logResult <span class="token operator">=</span> <span class="token generic-function"><span class="token function">ref</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">logger</span><span class="token punctuation">(</span>msg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> color<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  logResult<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">%c [ </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>msg<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ]</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">color:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>color <span class="token operator">??</span> <span class="token string">&quot;#2f90b9&quot;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ImportConfig</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> entryUrl<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span> <span class="token comment">// 网站网址</span>

  <span class="token keyword">public</span> configs<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useSignalRForEditor</span><span class="token punctuation">(</span>connection<span class="token operator">:</span> signalr<span class="token punctuation">.</span>HubConnection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">onWriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">onCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">start</span><span class="token punctuation">(</span>yml<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>connection<span class="token punctuation">.</span>state <span class="token operator">===</span> HubConnectionState<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果处于已连接状态，则先停止</span>

    <span class="token keyword">await</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;Start&quot;</span><span class="token punctuation">,</span> yml<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">logger</span><span class="token punctuation">(</span><span class="token string">&quot;[ Start ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *停止调试
   *
   */</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;Stop&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">offWriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">offCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">logger</span><span class="token punctuation">(</span><span class="token string">&quot;[ Stop ]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *爬虫运行完成
   *
   */</span>
  <span class="token keyword">function</span> <span class="token function">onCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;Completed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">logger</span><span class="token punctuation">(</span><span class="token string">&quot;[ Completed ]&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;#fff3a7&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">offCompleted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    connection<span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&quot;Completed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">offWriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    connection<span class="token punctuation">.</span><span class="token function">off</span><span class="token punctuation">(</span><span class="token string">&quot;WriteLine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *
   *控制台输出
   *
   */</span>
  <span class="token keyword">function</span> <span class="token function">onWriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;WriteLine&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>msg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">logger</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    start<span class="token punctuation">,</span>
    stop<span class="token punctuation">,</span>
    onWriteLine<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),e=[o];function c(i,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","monacuu.html.vue"]]),d=JSON.parse('{"path":"/front-end/monacuu.html","title":"在线代码编辑器monaco-editor、websocket在线调试","lang":"zh-CN","frontmatter":{"title":"在线代码编辑器monaco-editor、websocket在线调试","date":"2022-12-02T00:00:00.000Z","tag":["monaco-editor","websocket","online-debugger","在线编辑器"],"categories":["vue"]},"headers":[{"level":2,"title":"useMonaco","slug":"usemonaco","link":"#usemonaco","children":[{"level":3,"title":"toRaw()官网说法","slug":"toraw-官网说法","link":"#toraw-官网说法","children":[]}]},{"level":2,"title":"MonacoEditor Component","slug":"monacoeditor-component","link":"#monacoeditor-component","children":[]},{"level":2,"title":"useSignalR","slug":"usesignalr","link":"#usesignalr","children":[]},{"level":2,"title":"useSignalRForEditor","slug":"usesignalrforeditor","link":"#usesignalrforeditor","children":[]}],"git":{"createdTime":1680747438000,"updatedTime":1680747438000,"contributors":[{"name":"sharebravery","email":"sharebavery@gmail.com","commits":1}]},"readingTime":{"minutes":3.02,"words":906},"filePathRelative":"front-end/monacuu.md","localizedDate":"2022年12月2日","excerpt":""}');export{r as comp,d as data};
