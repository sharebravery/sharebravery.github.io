import{U as e,V as n,W as i,Y as s}from"./app.73988f25.js";import"./vendor.506c23d9.js";const d={},a=s(`<h1 id="使用-node-nestjs-爬取小说" tabindex="-1"><a class="header-anchor" href="#使用-node-nestjs-爬取小说" aria-hidden="true">#</a> 使用 node（nestjs）爬取小说</h1><p>想写个爬取小说的爬虫，因为喜欢使用 ts，所以用上了 nestjs。</p><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><ul><li>使用 nest 脚手架来创建新项目</li></ul><p><code>nest new thousand-silk-mongo</code></p><h2 id="安装-swagger" tabindex="-1"><a class="header-anchor" href="#安装-swagger" aria-hidden="true">#</a> 安装 swagger</h2><p>除了基本的爬取数据的功能，后面还要写几个接口来操作数据库的数据。swagger 必备，装上。</p><p><code>yarn add --save @nestjs/swagger</code></p><ul><li>main.ts</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { NestFactory } from &#39;@nestjs/core&#39;;
import { SwaggerModule, DocumentBuilder } from &#39;@nestjs/swagger&#39;;
import { AppModule } from &#39;./app.module&#39;;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(&#39;千丝&#39;)
    .setDescription(&#39;爬虫-mongodb&#39;)
    .setVersion(&#39;1.1&#39;)
    .addTag(&#39;千丝&#39;)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(&#39;api&#39;, app, document);

  console.log(&#39;[ TARGET ]   &#39; + &#39;http://localhost:3000/api&#39;);

  await app.listen(3000);
}
bootstrap();

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-mongodb" tabindex="-1"><a class="header-anchor" href="#使用-mongodb" aria-hidden="true">#</a> 使用 mongodb</h2><p><code>yarn add @nestjs/mongoose mongoose</code></p><ul><li><p>app.module.ts</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Module({
  imports: [
    ProxyModule,
    MongooseModule.forRoot(&#39;mongodb://localhost:27017/test1&#39;, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,13),l=[a];function r(o,t){return n(),i("div",null,l)}const v=e(d,[["render",r],["__file","使用node（nestjs）爬取小说.html.vue"]]);export{v as default};
