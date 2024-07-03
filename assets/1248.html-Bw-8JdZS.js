import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as l,b as n}from"./app-C49Dhsj6.js";const a={},d=n('<h1 id="_1248转换法-快捷心转二进制" tabindex="-1"><a class="header-anchor" href="#_1248转换法-快捷心转二进制"><span>1248转换法：快捷心转二进制</span></a></h1><p>某日，小坤坤顶着狂风暴雨出门面试，坐了地铁，转了共享单车，摔了一跤，走过马路，跨过人行天桥，一路又唱又跳终于到达面试地点，见到了面试官：</p><p>面试官：“1的二进制是多少？”</p><p>小坤坤：“01”</p><p>面试官：“2呢？”</p><p>小坤坤：“10”（坤：So easy）</p><p>面试官：“13的二进制是多少？”</p><p>小坤坤：“这个需要算一下，平时不用” 说完掏出纸笔进行除二法运算</p><p>小坤坤顶着面试官灼热的目光一通写画后：“是1101”</p><p>面试官：“那15呢？”</p><p>小坤坤又一通写画道：“是1111”</p><p>面试官诧异：“就这还要笔算？合着你只背了10以内的二进制转换是吧？”</p><p>小坤坤顿时无言，羞愧离去</p><p>我们熟知的十进制转二进制的方法为除二法，需要列式计算，极为不便。这里介绍一种便于心算的方法，让面试官问到你不用再掏出草稿纸来列式计算。</p><h1 id="二进制转十进制" tabindex="-1"><a class="header-anchor" href="#二进制转十进制"><span>二进制转十进制</span></a></h1><p>先来点开胃小菜：</p><ul><li>110</li><li>111</li><li>1010</li></ul><p>快速写出这三个数的十进制数字，不是死记硬背哦</p><p>十进制数字分别为6、7、10,怎么快捷算出来的呢，背后的指导理论是什么，观察下面的表格</p><table><thead><tr><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;"></td><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td></tr></tbody></table><p>110，以0为假，1为真。为真的位的数字为4、2，加起来为<code>6</code>，这就是110的十进制。</p><p>代入1010，根据1248理论画出表格模型：</p><table><thead><tr><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td></tr></tbody></table><p>为真的位数字为8和2，加起来是<code>10</code>。怎么样，根据1248转换法十进制转二进制是不是很简单，你可能会问，要是101010怎么办</p><p>依此类推1、2、4、8、16、32、64、128......，为2的幂次方递进，如下</p><table><thead><tr><th style="text-align:center;">32</th><th style="text-align:center;">16</th><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td></tr></tbody></table><p>为1的位的数字相加，即32 + 8 + 2 = 42，101010的十进制为<code>42</code>。</p><h1 id="十进制转二进制" tabindex="-1"><a class="header-anchor" href="#十进制转二进制"><span>十进制转二进制</span></a></h1><p>计算下面三个数的二进制：</p><ul><li>9</li><li>23</li><li>77</li></ul><p>还是使用1248转换法的理论来进行操作，对数字9进行拆解 <code>9 = 8 + 1</code>，列出1248表格</p><table><thead><tr><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td></tr></tbody></table><p>则&quot;8&quot;位和&quot;1&quot;位为真，则为1，余者补位0，则最终得到<code>1001</code>，这就是9的二进制。</p><p>对23拆解，<code>23 = 16 + 7 = 16 + 4 + 2 + 1</code>，列出1248表格：</p><table><thead><tr><th style="text-align:center;">16</th><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td></tr></tbody></table><p>观察得知，23的二进制为<code>10111</code></p><p>同理，<code>77 = 64 + 13 = 64 + 8 + 4 + 1 </code>，列出1248表格：</p><table><thead><tr><th style="text-align:center;">64</th><th style="text-align:center;">32</th><th style="text-align:center;">16</th><th style="text-align:center;">8</th><th style="text-align:center;">4</th><th style="text-align:center;">2</th><th style="text-align:center;">1</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td></tr></tbody></table><p>余位补0，观察可知77的二进制为<code>1001101</code>.</p><p>我们以后遇到二进制和十进制互转的题目就不用怕了，也不用顶着面试官灼热的目光拿出草稿纸进行除二法慢慢推算（😇），只要根据1248转换理论心列表格就迎刃而解了。</p><h1 id="十进制和十六进制互转" tabindex="-1"><a class="header-anchor" href="#十进制和十六进制互转"><span>十进制和十六进制互转</span></a></h1><p>这里顺便提一下十进制转十六进制，方法其实也很简单，但是如果不主动去总结发现很容易就忽略了。</p><ul><li>24</li><li>36</li><li>82</li></ul><p>计算这三个数的16进制 $$ 24 = 16 * 1+ 8 =&gt; 0x18 $$</p><p>$$ 36 = 16 *2 + 4 =&gt; 0x24 $$</p><p>$$ 82 = 16 * 5 + 2 =&gt; 0x52 $$</p><p>观察可知，由16的倍数加上剩余的数字组成16进制数。</p><p>十六进制转十进制则为： $$ 0x18 = 1 * 16^1 + 8 * 16^0 = 24 $$</p><p>$$ 0x24 = 2 * 16^1 + 4 * 16^0 = 36 $$</p><p>$$ 0x52 = 5*16^1 + 2 * 16^0 = 82 $$</p><hr><p><em>END</em></p><hr>',53),r=[d];function c(i,h){return e(),l("div",null,r)}const x=t(a,[["render",c],["__file","1248.html.vue"]]),y=JSON.parse('{"path":"/linux/1248.html","title":"1248转换法：快捷心转二进制","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"createdTime":1719971186000,"updatedTime":1719971186000,"contributors":[{"name":"sharebravery","email":"sharebravery@gmail.com","commits":1}]},"readingTime":{"minutes":2.96,"words":889},"filePathRelative":"linux/1248.md","localizedDate":"2024年7月3日","excerpt":""}');export{x as comp,y as data};
