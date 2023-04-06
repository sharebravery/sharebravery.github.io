---
title: node爬虫爬取小说（nestjs、IP代理池）
date: 2022-03-10
tag:
  - node
  - nestjs
  - mysql
  - ts
  - IP代理池
categories:
  - node
---

项目使用 nestjs、mysql、superagent 等实现小说的爬取，并写了一个 IP 代理池。

> // TODO: 引入 IP 池
>
> // TODO: 控制并发
>
> // TODO: 爬虫伪装
>
> // TODO: 断点续传
>
> // TODO: 自动抓取书籍列表
>
> // TODO: 外部接口

## 服务基类 BaseService

```typescript
/**
 * 服务基类
 */
// @Injectable()
export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  saveOne<TS extends DeepPartial<T>>(
    entities: TS,
    options?: SaveOptions
  ): Promise<TS> {
    return this.repository.save(entities, options);
  }

  async saveMany<TS extends DeepPartial<T>>(
    entities: TS[],
    options?: SaveOptions
  ): Promise<TS[]> {
    return this.repository.save(entities, options);
  }

  async findOne(options?: FindConditions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findMany(options?: FindConditions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
    return this.repository.remove(entities, options);
  }

  async delete(options?: FindConditions<T>): Promise<DeleteResult> {
    return this.repository.delete(options);
  }

  async update(
    conditions: number | FindConditions<T>,
    newValue: QueryDeepPartialEntity<T>
  ): Promise<number> {
    let updateResult = 1;
    await this.repository
      .update(conditions, newValue)
      .catch((e) => (updateResult = 0));
    return updateResult;
  }
}
```

## request.ts

```typescript
import request = require("request-promise");

class RequestOptions {
  method?: "GET" | "POST" = "GET";
  url: string;
  encoding? = "utf8"; // 编码
  proxy: string; // 代理
  callback?: (body) => any;
}

const service = async function (options: RequestOptions) {
  const { url, method, encoding, proxy, callback } = {
    ...new RequestOptions(),
    ...options,
  };

  return request(
    {
      url: url,
      method,
      proxy,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
      },
    }
    // function (err, res, body) {
    //   //   body = iconv.decode(body, encoding);
    //   if (err) {
    //     console.log(err);
    //     return err;
    //   } else {
    //     callback(body);
    //     return body;
    //   }
    // },
  );
};

export default service;
```

## crawl.controller.ts

```typescript
@Controller("Crawl")
@ApiTags("CrawlController")
export class CrawlController {
  constructor(
    private readonly crawlService: CrawlService,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {}

  // TODO:  引入IP池
  // TODO:  控制并发
  // TODO:  爬虫伪装
  // TODO:  断点续传
  // TODO:  自动抓取书籍列表
  // TODO:  外部接口

  /**
   *启动爬虫
   *
   * @param {*} chapter
   * @param {*} callback
   * @memberof CrawlController
   */
  @ApiOperation({
    summary: "启动爬虫",
  })
  @Get("startCrawlBook")
  async startCrawlBook() {
    try {
      console.log("[ 开始抓取 ]-54");

      const books = await this.CrawlBook(BOOK_URL_LIST); // 书籍基本信息

      for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // 写入书名
        await fs.writeFileSync(
          WRITE_BASEURL + `${book.name}.txt`,
          book.name + "\r\r\n"
        );

        const chapters = await this.analyticalChapterContent(book);

        book.chapters = chapters;

        book.chaptersJson = JSON.stringify(chapters);
        book.introductionItemsJson = JSON.stringify(book.introductionItems);
        book.chaptersDirectoryJson = JSON.stringify(book.chaptersDirectoryList);
        await this.crawlService.SaveBookAsync(book); // 保存书籍进入数据库
      }

      // this.writeAllFileSync(books); // 一并写入
      console.log("[ 爬虫运行完毕 ]-76");

      return books;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   *并发控制
   * @param {Array<string>} bookList
   * @return {*}
   * @memberof CrawlController
   */
  async CrawlBook(bookList: Array<string>): Promise<Book[]> {
    console.log("[ 开始抓取目录 ]-92");
    return new Promise(async (resolve, reject) => {
      const data = [];
      try {
        for (let i = 0; i < bookList.length; i++) {
          const url = bookList[i];
          const book = await this.CrawlBookBaseInfo(url);
          book.url = url;

          data.push(book);
        }

        resolve(data);

        // async.mapLimit(
        //   bookList,
        //   1,
        //   async (url, callback) => {
        //     const book = await this.CrawlBookBaseInfo(url, callback);
        //     book.url = url;
        //     return book;
        //   },
        //   (err, results) => {
        //     resolve(results);
        //   },
        // );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获取书籍基本信息、抓取目录
   * @param url
   * @param callback
   * @returns
   */
  async CrawlBookBaseInfo(url: string, callback?): Promise<Book> {
    const book = new Book();

    return new Promise(async (resolve, reject) => {
      try {
        const html = await this.crawlService.GetHtml(url);

        const $ = cheerio.load(html); // 装载页面

        // 书名
        const name = $("#novelName").text();
        book.name = name;

        // 简介
        const introduction = $(".C-Two p");
        book.introduction = introduction
          .text()
          .replace(new RegExp("飞卢小说网", "g"), "");

        introduction.each((i, el) => {
          const p = $(el).text();
          if (!p.includes("飞卢小说网")) {
            book.introductionItems.push(p);
          }
        });

        //章节目录
        const directory = $(".C-Fo-Zuo a");

        directory.each((i, el) => {
          const directory = new Directory();

          const a = $(el).attr("title");

          const url = "https:" + $(el).attr("href");

          directory.title = a;

          directory.url = url;
          if (a) book.chaptersDirectoryList.push(directory);
        });

        resolve(book);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *解析存入章节内容
   *
   * @param {*} chapters
   * @return {*}
   * @memberof CrawlController
   */
  analyticalChapterContent(book: Book): Promise<Chapter[]> {
    console.log("[ 当前抓取书籍 ]-185", book.name);

    const { chaptersDirectoryList } = book;

    return new Promise(async (resolve, reject) => {
      const chapters: Chapter[] = [];
      try {
        const bookInfo = await this.booksRepository.findOne(book.url); // 查询书籍

        for (let i = 0; i < 3; i++) {
          // for (let i = 0; i < chaptersDirectoryList.length; i++) {
          const item = chaptersDirectoryList[i];

          if (
            bookInfo?.chaptersJson &&
            (JSON.parse(JSON.stringify(bookInfo.chaptersJson)) as Chapter[])
              .map((o) => o.url)
              .includes(item.url)
          ) {
            console.log(item.title, "-章节已存在");

            continue; // 如果数据库内存在 则跳过
          }

          const chapter = new Chapter();

          console.log(" [  正在抓取 ]-198", item.title);

          const html = await this.crawlService.GetHtml(item.url);

          const $ = cheerio.load(html); // 装载页面

          chapter.url = item.url;

          // 章节名称
          const name = $("#novelName").text();
          const title = $(".c_l_title h1").text().replace(name, "").trim();
          chapter.title = title;

          const content = $(".noveContent");
          chapter.content = content.text(); // 存入完整字符串内容

          // 存入段落数组
          content.find("p").each((i, el) => {
            const p = $(el).text();

            chapter.contents.push(p);
          });

          chapters.push(chapter);

          chapter.contentsJson = JSON.stringify(chapter.contents);
          await this.crawlService.SaveChapterAsync(chapter); // 保存章节进入数据库

          //写入章节
          await this.crawlService.SaveChapter(
            chapter,
            WRITE_BASEURL + `${book.name}.txt`
          );
        }

        resolve(chapters);
      } catch (error) {
        reject(error);
      }
    });
  }
}
```

## crawl.service.ts

```typescript
import { Injectable } from "@nestjs/common";
import { Chapter } from "./chapter.entity";
import fs = require("fs");
import { delay, random } from "src/utils";
import request = require("superagent");

import superagentProxy = require("superagent-proxy");
superagentProxy(request);

import charset = require("superagent-charset");
charset(request);

import { Book } from "./book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Proxy } from "src/proxy/proxy.entity";

@Injectable()
export class CrawlService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
    @InjectRepository(Proxy)
    private proxyRepository: Repository<Proxy>
  ) {}

  private time = 0;

  proxy = null;

  timer = null;

  timeoutNumber = 0;

  /**
   *获取html页面
   *
   * @param {string} requestUrl
   * @param {string} [requestType]
   * @return {*}  {Promise<any>}
   * @memberof CrawlController
   */
  async GetHtml(requestUrl: string): Promise<any> {
    // const ms = random(500, 2100);
    // await delay(ms); // 控制爬虫速度

    // if (this.timer) clearInterval(this.timer);

    // if (this.time === 0) {
    //   let randomIps: Proxy[] = await this.proxyRepository.find();
    //   // let randomIps: Proxy[] = await this.proxyRepository.query(
    //   //   'SELECT * FROM proxy ORDER BY  RAND() LIMIT 100;',
    //   // );

    //   // randomIps = randomIps.filter(
    //   //   (o) => o.speed < 500 && o.protocols.includes('http'),
    //   // );
    //   randomIps = randomIps.filter((o) => o.country === 'CN');
    //   this.proxy = `${randomIps[0].protocols[0]}://${randomIps[0].ip}:${randomIps[0].port}`;
    // }

    // this.timer = setInterval(() => {
    //   this.time++;
    //   if (this.time === 1000 * 60 * 30) this.time = 0;
    // }, 1000);

    this.proxy = `http://124.204.33.162:8000`;
    console.log(
      "%c [     this.proxy ]-83",
      "font-size:13px; background:pink; color:#bf2c9f;",
      this.proxy
    );

    return new Promise(async (resolve, reject) => {
      try {
        const result = await (request("GET", requestUrl) as any)
          .charset("gb2312")
          .proxy(this.proxy)
          .set("Referer", "https://b.faloo.com/")
          .buffer(true)
          .set(
            "User-Agent",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
          )
          .timeout({
            response: 50000, // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
          });

        resolve(result.text);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   *保存书籍
   *
   * @param {Book} book
   * @memberof CrawlService
   */
  async SaveBookAsync(book: Book) {
    // console.log('正在保存书籍');
    return await this.booksRepository.save(book);
  }

  async SaveChapterAsync(chapter: Chapter) {
    // console.log('正在保存章节');
    return await this.chaptersRepository.save(chapter);
  }

  /**
   *保存章节内容
   *
   * @param {Chapter} chapter
   * @param {string} [writeUrl]
   * @memberof CrawlService
   */
  async SaveChapter(chapter: Chapter, writeUrl?: string) {
    await fs.appendFile(
      writeUrl,
      chapter.title + "\r\n" + chapter.content,
      () => {
        // console.log('写入章节:' + chapter.title);
      }
    );
  }

  /**
   *写入所有书籍
   *
   * @param {Book[]} books
   * @memberof CrawlController
   */
  async writeAllFileSync(books: Book[], writeUrl?: string) {
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      await fs.writeFileSync(writeUrl, book.name + "\r\r\n"); // 写入书名

      for (let j = 0; j < book.chapters.length; j++) {
        const chapter = book.chapters[j];
        await fs.appendFile(
          writeUrl,
          chapter.title + "\r\n" + chapter.content,
          () => {
            // console.log('写入章节:' + chapter.title);
          }
        );
      }
    }

    console.log("写入完成");
  }

  /**
   *写入单本书籍
   *
   * @param {*} book
   * @memberof CrawlController
   */
  async writeSingleFileSync(book: Book, i, writeUrl?: string) {
    if (i === 1) {
      await fs.writeFileSync(writeUrl, book.name + "\r\r\n"); // 写入书名
    }

    for (let j = 0; j < book.chapters.length; j++) {
      const chapter = book.chapters[j];
      await fs.appendFile(
        writeUrl,
        chapter.title + "\r\n" + chapter.content,
        () => {
          console.log("写入章节:" + chapter.title);
        }
      );
    }
  }
}
```

# IP 代理池

## proxy.entity.ts

```typescript
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { AuditMetadata } from "../entitys/auditMetadata.entity";

@Entity()
export class Proxy extends AuditMetadata {
  @ApiProperty({ description: "IP地址" })
  @PrimaryColumn()
  ip: string;

  @ApiProperty({ description: "端口" })
  @Column()
  port: string;

  // @ApiProperty({ description: '代理位置' })
  // @Column()
  // location: string;

  @ApiProperty({ description: "country" })
  @Column()
  country: string;

  @ApiProperty({ description: "city" })
  @Column()
  city: string;

  @ApiProperty({ description: "isp" })
  @Column()
  isp: string;

  @ApiProperty({ description: "最后检查时间" })
  @Column()
  lastChecked: number;

  @ApiProperty({ description: "速度", nullable: true })
  @Column()
  speed: number;

  @ApiProperty({ description: "匿名等级" })
  @Column()
  anonymityLevel: string;

  @ApiProperty({ description: "匿名协议" })
  @Column({ type: "json", nullable: true })
  protocols: string;

  @ApiProperty({ description: "http | https", nullable: true })
  @Column({ nullable: true })
  type: ProxyType;

  @ApiProperty({ description: "是否可用" })
  @Column({ nullable: true })
  available: boolean;
}

export enum ProxyType {
  http,
  https,
}
```

## proxy.controller.ts

```typescript
// const REQUEST_URL_LIST = ['https://example.com/'];

@ApiTags("ProxyController")
@Controller("Proxy")
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({
    summary: "抓取代理进入IP池",
  })
  @Get("GetProxyList")
  GetProxyList() {
    return this.proxyService.GetProxyList();
  }

  @ApiOperation({
    summary: "校验代理",
  })
  @Get("CheckProxy")
  async CheckProxy() {
    return await this.proxyService.CheckProxy();
  }
}
```
