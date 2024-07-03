import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as s,b as i}from"./app-C49Dhsj6.js";const d={},a=i(`<h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目"><span>创建项目</span></a></h2><ul><li>使用 nest 脚手架来创建新项目</li></ul><p><code>nest new thousand-silk-mongo</code></p><h2 id="安装-swagger" tabindex="-1"><a class="header-anchor" href="#安装-swagger"><span>安装 swagger</span></a></h2><p>除了基本的爬取数据的功能，后面还要写几个接口来操作数据库的数据。swagger 必备，装上。</p><p><code>yarn add --save @nestjs/swagger</code></p><ul><li>main.ts</li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>import { NestFactory } from &#39;@nestjs/core&#39;;
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-mongodb" tabindex="-1"><a class="header-anchor" href="#使用-mongodb"><span>使用 mongodb</span></a></h2><p><code>yarn add @nestjs/mongoose mongoose</code></p><ul><li><p>app.module.ts</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Module({
  imports: [
    ProxyModule,
    MongooseModule.forRoot(&#39;mongodb://localhost:27017/test1&#39;, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,11),l=[a];function o(t,r){return n(),s("div",null,l)}const v=e(d,[["render",o],["__file","使用node（nestjs）连接mongodb.html.vue"]]),u=JSON.parse('{"path":"/node/%E4%BD%BF%E7%94%A8node%EF%BC%88nestjs%EF%BC%89%E8%BF%9E%E6%8E%A5mongodb.html","title":"使用node（nestjs）连接mongodb","lang":"zh-CN","frontmatter":{"title":"使用node（nestjs）连接mongodb","date":"2022-03-15T00:00:00.000Z","tag":["node","nestjs","mongodb","ts"],"categories":["node"]},"headers":[{"level":2,"title":"创建项目","slug":"创建项目","link":"#创建项目","children":[]},{"level":2,"title":"安装 swagger","slug":"安装-swagger","link":"#安装-swagger","children":[]},{"level":2,"title":"使用 mongodb","slug":"使用-mongodb","link":"#使用-mongodb","children":[]}],"git":{"createdTime":1666431725000,"updatedTime":1680753390000,"contributors":[{"name":"sharebravery","email":"sharebavery@gmail.com","commits":1}]},"readingTime":{"minutes":0.53,"words":160},"filePathRelative":"node/使用node（nestjs）连接mongodb.md","localizedDate":"2022年3月15日","excerpt":""}');export{v as comp,u as data};
