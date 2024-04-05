import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-BzmWTzzC.js";const p={},o=t(`<pre><code>业务需要，做了个前端导出，由于有部分数据长度不固定，所以合并范围需要动态计算，为了能够支持修改样式，使用了国产的ExcelJS。
基于国产ExcelJS封装的一个工具类，封装简化原有的函数操作，并将使用方式向sheetjs靠拢，保持API使用一致。
</code></pre><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ExcelJSuu</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> worksheet<span class="token operator">:</span> Worksheet<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  calcHeaders <span class="token operator">=</span> calcHeaders<span class="token punctuation">;</span>

  flatCells <span class="token operator">=</span> flatCells<span class="token punctuation">;</span>

  flatColumns <span class="token operator">=</span> flatColumns<span class="token punctuation">;</span>

  ColumnCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   *根据间隔构造排及其合并数据
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>string[]<span class="token punctuation">}</span> row
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> interval
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span><span class="token punctuation">{</span> row: string[][]; merges: Range[] <span class="token punctuation">}</span><span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">buildRowAndMergesByInterval</span><span class="token punctuation">(</span>
    row<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    interval<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span> row<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> merges<span class="token operator">:</span> Range<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newRow <span class="token operator">=</span> row<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pre<span class="token punctuation">,</span> cur<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>pre<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">==</span> row<span class="token punctuation">.</span>length <span class="token operator">*</span> interval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pre<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        pre<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">[</span>cur<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span>interval<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> merges <span class="token operator">=</span> <span class="token function">rangeArray</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> newRow<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token punctuation">(</span>interval <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> num <span class="token operator">+</span> interval<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> e<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Range<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      row<span class="token operator">:</span> newRow<span class="token punctuation">,</span>
      merges<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *构建表头
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>IUuColumn[]<span class="token punctuation">}</span> columns
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span>string[][]<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">buildHeadersAndMerges</span><span class="token punctuation">(</span>columns<span class="token operator">:</span> IUuColumn<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    headers<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    merges<span class="token operator">:</span> Range<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token function">calcHeaders</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> mgs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span><span class="token operator">...</span>m<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>e<span class="token punctuation">.</span>top<span class="token punctuation">,</span> e<span class="token punctuation">.</span>left<span class="token punctuation">,</span> e<span class="token punctuation">.</span>bottom<span class="token punctuation">,</span> e<span class="token punctuation">.</span>right<span class="token punctuation">]</span> <span class="token keyword">as</span> Range
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      headers<span class="token operator">:</span> <span class="token function">flatCells</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">,</span>
      merges<span class="token operator">:</span> mgs<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *构建sheet二维数据结构
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>IUuTableColumnsType<span class="token punctuation">}</span> flatColumns
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>any[]<span class="token punctuation">}</span> tableData
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span>string[][]<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">buildSheet</span><span class="token punctuation">(</span>columns<span class="token operator">:</span> IUuTableColumnsType<span class="token punctuation">,</span> tableData<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> flats <span class="token operator">=</span> <span class="token function">flatColumns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> tableData<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pre<span class="token punctuation">,</span> cur<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      flats<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>column<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">[</span>column<span class="token punctuation">.</span>dataIndex<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      pre<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *根据数据构建基本带边框的表格
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>IUuTableColumnsType<span class="token punctuation">}</span> columns
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>any[]<span class="token punctuation">}</span> tableData
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span>string[][]<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">buildBaseSheet</span><span class="token punctuation">(</span>
    columns<span class="token operator">:</span> IUuTableColumnsType<span class="token punctuation">,</span>
    tableData<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    autoMerge <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> headersAndMgs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildHeadersAndMerges</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> sheet <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildSheet</span><span class="token punctuation">(</span>columns<span class="token punctuation">,</span> tableData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    sheet<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token operator">...</span>headersAndMgs<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">addRows</span><span class="token punctuation">(</span>sheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    autoMerge <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">merges</span><span class="token punctuation">(</span>headersAndMgs<span class="token punctuation">.</span>merges<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setWidthByColumns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setDefaultStyleByColumn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span>columnCount<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> sheet<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *合并单元格
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>MergeCells<span class="token punctuation">}</span> v
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">merges</span><span class="token punctuation">(</span>
    v<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">[</span>top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> bottom<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    v<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">mergeCells</span><span class="token punctuation">(</span>
        item <span class="token keyword">as</span> <span class="token punctuation">[</span>top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> bottom<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *根据columns的width属性调整表格宽度
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>IUuTableColumnsType<span class="token punctuation">}</span> columns
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">setWidthByColumns</span><span class="token punctuation">(</span>columns<span class="token operator">:</span> IUuTableColumnsType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> flats <span class="token operator">=</span> <span class="token function">flatColumns</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span><span class="token punctuation">;</span>
    flats<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>column<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getColumn</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width <span class="token operator">=</span> column<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *设置指定范围填充
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> top
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> left
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> bottom
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> right
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Fill<span class="token punctuation">}</span> fill
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">setFillByRange</span><span class="token punctuation">(</span>
    top<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    bottom<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    fill<span class="token operator">:</span> Fill
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> rows <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getRows</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> bottom<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">rangeArray</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      rows<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        row<span class="token punctuation">.</span><span class="token function">getCell</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span>fill <span class="token operator">=</span> fill<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *设置默认样式 边框 居中
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> start
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> end
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> style
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">setDefaultStyleByColumn</span><span class="token punctuation">(</span>start<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> end<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> style<span class="token operator">?</span><span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Style<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeArray</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> column <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getColumn</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>

      column<span class="token punctuation">.</span><span class="token function">eachCell</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>cell<span class="token punctuation">,</span> rowNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cell<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token punctuation">{</span>
          top<span class="token operator">:</span> <span class="token punctuation">{</span> style<span class="token operator">:</span> <span class="token string">&quot;thin&quot;</span><span class="token punctuation">,</span> color<span class="token operator">:</span> <span class="token punctuation">{</span> argb<span class="token operator">:</span> <span class="token string">&quot;ff000000&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          left<span class="token operator">:</span> <span class="token punctuation">{</span> style<span class="token operator">:</span> <span class="token string">&quot;thin&quot;</span><span class="token punctuation">,</span> color<span class="token operator">:</span> <span class="token punctuation">{</span> argb<span class="token operator">:</span> <span class="token string">&quot;ff000000&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          bottom<span class="token operator">:</span> <span class="token punctuation">{</span> style<span class="token operator">:</span> <span class="token string">&quot;thin&quot;</span><span class="token punctuation">,</span> color<span class="token operator">:</span> <span class="token punctuation">{</span> argb<span class="token operator">:</span> <span class="token string">&quot;ff000000&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          right<span class="token operator">:</span> <span class="token punctuation">{</span> style<span class="token operator">:</span> <span class="token string">&quot;thin&quot;</span><span class="token punctuation">,</span> color<span class="token operator">:</span> <span class="token punctuation">{</span> argb<span class="token operator">:</span> <span class="token string">&quot;ff000000&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        cell<span class="token punctuation">.</span>alignment <span class="token operator">=</span> <span class="token punctuation">{</span> vertical<span class="token operator">:</span> <span class="token string">&quot;middle&quot;</span><span class="token punctuation">,</span> horizontal<span class="token operator">:</span> <span class="token string">&quot;center&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> style<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          cell<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> style<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *设置宽高
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> start
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> end
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> width
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> height
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">setWidthAndHeight</span><span class="token punctuation">(</span>start<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> end<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeArray</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> column <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getColumn</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>

      column<span class="token punctuation">.</span>width <span class="token operator">=</span> width<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> rows <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getRows</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>

    rows<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      row<span class="token punctuation">.</span>height <span class="token operator">=</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *获取当前范围的列
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> start
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> end
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">getRangeByColumn</span><span class="token punctuation">(</span>start<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> end<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">rangeArray</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> column <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getColumn</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">[</span>column<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *根据列来设置当前范围的样式
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> start
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> end
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> [style]
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token function">setStyleInViewByColumn</span><span class="token punctuation">(</span>
    start<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    end<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    style<span class="token operator">?</span><span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Style<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token function">rangeArray</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> column <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span><span class="token function">getColumn</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
      column<span class="token punctuation">.</span><span class="token function">eachCell</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>cell<span class="token punctuation">,</span> rowNumber<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> style<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          cell<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> style<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *写入XLSX文件
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Workbook<span class="token punctuation">}</span> workbook
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token keyword">async</span> <span class="token function">writeXLSXFile</span><span class="token punctuation">(</span>
    workbook<span class="token operator">:</span> Workbook<span class="token punctuation">,</span>
    filename <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span>name
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> buffer <span class="token operator">=</span> <span class="token keyword">await</span> workbook<span class="token punctuation">.</span>xlsx<span class="token punctuation">.</span><span class="token function">writeBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>buffer<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&quot;application/octet-stream&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">openDownloadDialog</span><span class="token punctuation">(</span>blob<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   *将row插入工作簿流 不会破坏原有的结构 并返回新的工作簿
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>Workbook<span class="token punctuation">}</span> workbook
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> pos
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>any[]<span class="token punctuation">}</span> values
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>*<span class="token punctuation">}</span>  <span class="token punctuation">{</span>Promise&lt;Workbook&gt;<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> ExcelJSuu
   */</span>
  <span class="token keyword">async</span> <span class="token function">insertRowWithBuffer</span><span class="token punctuation">(</span>
    workbook<span class="token operator">:</span> Workbook<span class="token punctuation">,</span>
    pos<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    values<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Workbook<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> buffer <span class="token operator">=</span> <span class="token keyword">await</span> workbook<span class="token punctuation">.</span>xlsx<span class="token punctuation">.</span><span class="token function">writeBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> newWb <span class="token operator">=</span> <span class="token keyword">await</span> workbook<span class="token punctuation">.</span>xlsx<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> worksheet <span class="token operator">=</span> newWb<span class="token punctuation">.</span>worksheets<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> e<span class="token punctuation">.</span>name <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>worksheet<span class="token punctuation">.</span>name
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>worksheet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;找不到工作表&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    worksheet<span class="token punctuation">.</span><span class="token function">insertRow</span><span class="token punctuation">(</span>pos<span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> newWb<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>用例</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
-
- @param queryHeader 第一排表头数组
- @param data 所有处理好的表格数据
  \\*/</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">exportTable</span><span class="token punctuation">(</span>
  queryHeader <span class="token operator">=</span> tableHeader1<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
  data <span class="token operator">=</span> tableData<span class="token punctuation">.</span>value
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> workbook <span class="token operator">=</span> <span class="token function">exportTableByExcelJSuu</span><span class="token punctuation">(</span>
    <span class="token function">unref</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span> <span class="token keyword">as</span> IUuTableColumnsType<span class="token punctuation">,</span>
    data<span class="token punctuation">,</span>
    queryHeader <span class="token operator">??</span> <span class="token punctuation">[</span><span class="token string">&quot;学校&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;考试&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;考试时间&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;年级&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;班级&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;考试总分&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token punctuation">[</span>worksheet<span class="token punctuation">]</span> <span class="token operator">=</span> workbook<span class="token punctuation">.</span>worksheets<span class="token punctuation">;</span>
  ty<span class="token punctuation">;</span>

  worksheet<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;全科成绩.xlsx&quot;</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> excelJSuu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ExcelJSuu</span><span class="token punctuation">(</span>worksheet<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> length <span class="token operator">=</span> excelJSuu<span class="token punctuation">.</span><span class="token function">flatColumns</span><span class="token punctuation">(</span>
    <span class="token function">unref</span><span class="token punctuation">(</span>columns<span class="token punctuation">)</span> <span class="token keyword">as</span> IUuTableColumnsType
  <span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>

  excelJSuu<span class="token punctuation">.</span><span class="token function">setFillByRange</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> length<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&quot;pattern&quot;</span><span class="token punctuation">,</span>
    pattern<span class="token operator">:</span> <span class="token string">&quot;solid&quot;</span><span class="token punctuation">,</span>
    fgColor<span class="token operator">:</span> <span class="token punctuation">{</span> argb<span class="token operator">:</span> <span class="token string">&quot;ffc2f8ed&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  excelJSuu<span class="token punctuation">.</span><span class="token function">writeXLSXFile</span><span class="token punctuation">(</span>workbook<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","mergeUU.html.vue"]]),d=JSON.parse('{"path":"/front-end/mergeUU.html","title":"前端表格导出合并二（ExcelJSuu）","lang":"zh-CN","frontmatter":{"title":"前端表格导出合并二（ExcelJSuu）","date":"2022-10-23T00:00:00.000Z","tag":["excel","ts"],"categories":["vue"]},"headers":[],"git":{"createdTime":1666433633000,"updatedTime":1680161427000,"contributors":[{"name":"sharebravery","email":"sharebavery@gmail.com","commits":6}]},"readingTime":{"minutes":3.09,"words":927},"filePathRelative":"front-end/mergeUU.md","localizedDate":"2022年10月23日","excerpt":""}');export{r as comp,d as data};
