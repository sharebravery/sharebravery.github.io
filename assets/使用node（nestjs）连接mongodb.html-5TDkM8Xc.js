import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as i}from"./app-B7bFyEfn.js";const l={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2><ul><li>使用 nest 脚手架来创建新项目</li></ul><p><code>nest new thousand-silk-mongo</code></p><h2 id="安装-swagger" tabindex="-1"><a class="header-anchor" href="#安装-swagger"><span>安装 swagger</span></a></h2><p>除了基本的爬取数据的功能，后面还要写几个接口来操作数据库的数据。swagger 必备，装上。</p><p><code>yarn add --save @nestjs/swagger</code></p><ul><li>main.ts</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>import { NestFactory } from &#39;@nestjs/core&#39;;</span></span>
<span class="line"><span>import { SwaggerModule, DocumentBuilder } from &#39;@nestjs/swagger&#39;;</span></span>
<span class="line"><span>import { AppModule } from &#39;./app.module&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>async function bootstrap() {</span></span>
<span class="line"><span>  const app = await NestFactory.create(AppModule);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const config = new DocumentBuilder()</span></span>
<span class="line"><span>    .setTitle(&#39;千丝&#39;)</span></span>
<span class="line"><span>    .setDescription(&#39;爬虫-mongodb&#39;)</span></span>
<span class="line"><span>    .setVersion(&#39;1.1&#39;)</span></span>
<span class="line"><span>    .addTag(&#39;千丝&#39;)</span></span>
<span class="line"><span>    .build();</span></span>
<span class="line"><span>  const document = SwaggerModule.createDocument(app, config);</span></span>
<span class="line"><span>  SwaggerModule.setup(&#39;api&#39;, app, document);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  console.log(&#39;[ TARGET ]   &#39; + &#39;http://localhost:3000/api&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  await app.listen(3000);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bootstrap();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-mongodb" tabindex="-1"><a class="header-anchor" href="#使用-mongodb"><span>使用 mongodb</span></a></h2><p><code>yarn add @nestjs/mongoose mongoose</code></p><ul><li><p>app.module.ts</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    ProxyModule,</span></span>
<span class="line"><span>    MongooseModule.forRoot(&#39;mongodb://localhost:27017/test1&#39;, {</span></span>
<span class="line"><span>      useNewUrlParser: true,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,11)])])}const c=n(l,[["render",p]]),t=JSON.parse('{"path":"/node/%E4%BD%BF%E7%94%A8node%EF%BC%88nestjs%EF%BC%89%E8%BF%9E%E6%8E%A5mongodb.html","title":"使用node（nestjs）连接mongodb","lang":"zh-CN","frontmatter":{"title":"使用node（nestjs）连接mongodb","date":"2022-03-15T00:00:00.000Z","tag":["node","nestjs","mongodb","ts"],"categories":["node"]},"git":{"createdTime":1666431725000,"updatedTime":1680753390000,"contributors":[{"name":"sharebravery","username":"sharebravery","email":"sharebavery@gmail.com","commits":5,"url":"https://github.com/sharebravery"}]},"readingTime":{"minutes":0.53,"words":160},"filePathRelative":"node/使用node（nestjs）连接mongodb.md","excerpt":""}');export{c as comp,t as data};
