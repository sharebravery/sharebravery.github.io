---
title: "使用 node（nestjs）连接 mongodb"
date: 2022-03-15
tags:
  - Node.js
  - NestJS
  - MongoDB
  - TypeScript
categories:
  - 后端技术
---


## 创建项目

- 使用 nest 脚手架来创建新项目

`nest new thousand-silk-mongo`

## 安装 swagger

除了基本的爬取数据的功能，后面还要写几个接口来操作数据库的数据。swagger 必备，装上。

`yarn add --save @nestjs/swagger`

- main.ts

```
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('千丝')
    .setDescription('爬虫-mongodb')
    .setVersion('1.1')
    .addTag('千丝')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('[ TARGET ]   ' + 'http://localhost:3000/api');

  await app.listen(3000);
}
bootstrap();

```

## 使用 mongodb

`yarn add @nestjs/mongoose mongoose`

- app.module.ts

  ```
  @Module({
    imports: [
      ProxyModule,
      MongooseModule.forRoot('mongodb://localhost:27017/test1', {
        useNewUrlParser: true,
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  ```
