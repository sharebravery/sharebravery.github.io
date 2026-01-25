---
title: "Connecting NestJS to MongoDB: A Type-Safe Love Story"
date: 2026-01-25
categories:
  - Backend
tags:
  - Node.js
  - NestJS
  - MongoDB
---

# Connecting NestJS to MongoDB: A Type-Safe Love Story

So you've chosen NestJS (because you love Angular or just really miss Java annotations) and MongoDB (because schemas are for people with commitment issues). Let's make them talk to each other.

Here is the quick-and-dirty guide to getting a NestJS app up, documenting it automatically, and connecting it to Mongo without crying.

## 1. The Genesis

First, let's birth a new project. NestJS has a CLI that makes this trivial.

```bash
# If you haven't installed the CLI globally yet
npm i -g @nestjs/cli

# Create the project
nest new thousand-silk-mongo
```

## 2. Swagger (Because We Aren't Savages)

If you build an API in the woods and don't document it, does it make a sound? No. It just makes frontend developers angry. Install Swagger immediately.

```bash
yarn add --save @nestjs/swagger
```

Open `main.ts` and dress it up:

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // The "Look at me, I have documentation" setup
  const config = new DocumentBuilder()
    .setTitle('Thousand Silk')
    .setDescription('Crawler & MongoDB API')
    .setVersion('1.1')
    .addTag('Silk')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`[ TARGET ] 🚀 http://localhost:3000/api`);

  await app.listen(3000);
}
bootstrap();
```

## 3. The MongoDB Connection 🍃

We'll use Mongoose. Yes, the native driver is faster, but Mongoose gives us structure, and in a TypeScript project, structure is king.

```bash
yarn add @nestjs/mongoose mongoose
```

Now, wire it up in your `AppModule`.

**app.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // The "Sanity Check" connection string.
    // In production, PLEASE use ConfigService and environment variables.
    // Hardcoding connection strings is how you get hacked.
    MongooseModule.forRoot('mongodb://localhost:27017/test1', {
      // These options are largely deprecated in newer driver versions,
      // but good to know they exist if you're on legacy versions.
      // useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Pro Tip:
Don't actually hardcode `'mongodb://localhost:27017/test1'`. Use `@nestjs/config` and a `.env` file. But for a "Hello World" or a quick prototype? Send it.

That's it. You now have a structured Node.js backend connected to a NoSQL database with auto-generated documentation. Go forth and build things.
