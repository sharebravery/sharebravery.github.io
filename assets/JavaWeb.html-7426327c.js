import{_ as a,W as t,X as s,a0 as l,Z as i,C as d}from"./framework-dc03c577.js";const n="/assets/JavaWeb1-20200811102731714-b335ec0e.png",r="/assets/JavaWeb2-20200811102740840-0dd47b27.png",o="/assets/JavaWeb3-20200811102750674-d327025d.png",c="/assets/JavaWeb4-20200811102801749-d6e07643.png",m="/assets/JavaWeb5-20200811102813289-9686fa5b.png",u="/assets/JavaWeb6-20200811102822876-5f8d4674.png",v={},p=i(`<h1 id="阿里云-ecs——搭建-java-web-开发环境" tabindex="-1"><a class="header-anchor" href="#阿里云-ecs——搭建-java-web-开发环境" aria-hidden="true">#</a> 阿里云 ECS——搭建 Java Web 开发环境</h1><h2 id="_1-安装-jdk" tabindex="-1"><a class="header-anchor" href="#_1-安装-jdk" aria-hidden="true">#</a> 1. 安装 JDK</h2><ol><li>1 执行以下命令，查看 yum 源中 JDK 版本。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum list java*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>2 执行以下命令，使用 yum 安装 JDK1.8。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install java-1.8.0-openjdk*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>3 执行以下命令，查看是否安装成功。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>java -version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果显示如下图内容，则表示 JDK 安装成功。</p><p><img src="`+n+`" alt="在这里插入图片描述"></p><h2 id="_2-安装-mysql-数据库" tabindex="-1"><a class="header-anchor" href="#_2-安装-mysql-数据库" aria-hidden="true">#</a> 2. 安装 MySQL 数据库</h2><ol start="2"><li>1 执行以下命令，下载并安装 MySQL 官方的<code>Yum Repository</code>。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="在这里插入图片描述"></p><ol start="2"><li>2 执行以下命令，启动 MySQL 数据库。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl start mysqld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>3 执行以下命令，查看 MySQL 初始密码。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>grep &quot;password&quot; /var/log/mysqld.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+o+`" alt="在这里插入图片描述"></p><ol start="2"><li>4 执行以下命令，登录数据库。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql -uroot -p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>5 执行以下命令，修改 MySQL 默认密码。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set global validate_password_policy=0;  #修改密码安全策略为低（只校验密码长度，至少8位）。
ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;12345678&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>6 执行以下命令，授予 root 用户远程管理权限。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GRANT ALL PRIVILEGES ON *.* TO &#39;root&#39;@&#39;%&#39; IDENTIFIED BY &#39;12345678&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>7 输入<code>exit</code>退出数据库。</li></ol><h2 id="_3-安装-tomcat" tabindex="-1"><a class="header-anchor" href="#_3-安装-tomcat" aria-hidden="true">#</a> 3. 安装 Tomcat</h2><ol start="3"><li>1 执行以下命令，下载 Tomcat 压缩包。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://mirror.bit.edu.cn/apache/tomcat/tomcat-8/v8.5.57/bin/apache-tomcat-8.5.57.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+c+`" alt="在这里插入图片描述"></p><ol start="3"><li>2 执行以下命令，解压刚刚下载 Tomcat 包。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -zxvf apache-tomcat-8.5.57.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>3 执行以下命令，修改 Tomcat 名字。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mv apache-tomcat-8.5.57 /usr/local/Tomcat8.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>4 执行以下命令，为 Tomcat 授权。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>chmod +x /usr/local/Tomcat8.5/bin/*.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>5 执行以下命令，修改 Tomcat 默认端口号为<code>80</code>。</li></ol><p>说明：Tomcat 默认端口号为 8080。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sed -i &#39;s/Connector port=&quot;8080&quot;/Connector port=&quot;80&quot;/&#39; /usr/local/Tomcat8.5/conf/server.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>6 启动 Tomcat。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/local/Tomcat8.5/bin/./startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+m+'" alt="在这里插入图片描述"></p><h2 id="_4-访问-tomcat" tabindex="-1"><a class="header-anchor" href="#_4-访问-tomcat" aria-hidden="true">#</a> 4. 访问 Tomcat</h2><ol start="4"><li>1 打开浏览器，在地址栏中输入 ECS 公网地址，例如：<code>139.0.0.1</code></li></ol><p>​ 如果显示如下界面，则表示 Tomcat 安装配置成功。</p><p><img src="'+u+'" alt="在这里插入图片描述"> 4. 2 至此，Java Web 开发环境搭建完成。</p>',46);function g(b,x){const e=d("Valine");return t(),s("div",null,[p,l(e)])}const _=a(v,[["render",g],["__file","JavaWeb.html.vue"]]);export{_ as default};