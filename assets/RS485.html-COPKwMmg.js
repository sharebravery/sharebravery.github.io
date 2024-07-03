import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e}from"./app-DdDb7egX.js";const t={},p=e(`<h1 id="rs-485串口通信-简易指南与代码示例" tabindex="-1"><a class="header-anchor" href="#rs-485串口通信-简易指南与代码示例"><span>RS-485串口通信：简易指南与代码示例</span></a></h1><h1 id="_1-rs-485介绍" tabindex="-1"><a class="header-anchor" href="#_1-rs-485介绍"><span>1. RS-485介绍</span></a></h1><blockquote><p>RS-485是一种<strong>物理层通信标准</strong>，定义了电气特性、传输速率、线路拓扑等细节</p></blockquote><p>RS485是一种广泛应用于工业领域的半双工串行通信协议。RS485可以支持多达32个设备在同一总线上通信。RS485的最大传输速率可以达到10Mbps，但实际应用中，速率和传输距离成反比关系。</p><p>RS485使用<strong>差分信号传输</strong>，这意味着它通过一对互补信号线（通常标记为A和B）传输数据。</p><p>在RS485总线的两端需要连接终端电阻（通常为120欧姆），以匹配线路阻抗，防止信号反射。</p><figure><img src="https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240624154659.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>RS-485与RS-232的差异只体现在物理层上，它们的协议层是相同的，也是使用串口数据包的形式传输数据。</p><figure><img src="https://cdn.jsdelivr.net/gh/sharebravery/album@master/1719215652979.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_2-rs485为何更抗干扰" tabindex="-1"><a class="header-anchor" href="#_2-rs485为何更抗干扰"><span>2. RS485为何更抗干扰</span></a></h1><p>这里说一下为什么RS485会更为抗干扰：</p><p>我们知道普通的 TTL 串口只适合短距离传输。TTL 通信是通过电压的高低变化来传输数据的，由于其单端传输方式，对静电和电磁干扰非常敏感，容易受到干扰而导致信号周期混乱，从而造成数据错误。因此，TTL 适合的传输距离通常较短。</p><p>而RS485使用两根互相扭绞的线*（A 和 B 线）*来传输数据，<strong>当一根线上的电压升高时另一根线上的电压会相应降低</strong>，这就是前面所说的<strong>差分信号传输</strong>，接收端可以通过对比两根线的<strong>电压差</strong>来过滤干扰信号。这样就可以有效抵消外部电磁干扰。</p><p>总线的两端加上的终端电阻也可以减少信号反射和误码率。</p><h1 id="_3-简单的通信测试" tabindex="-1"><a class="header-anchor" href="#_3-简单的通信测试"><span>3. 简单的通信测试</span></a></h1><p>接线时记住A对A，B对B</p><ul><li><p>查看波特率</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>stty <span class="token parameter variable">-F</span> /dev/ttyACM0 <span class="token comment"># ttyACM0 替换为自己的串口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>设置波特率</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>stty <span class="token parameter variable">-F</span> /dev/ttyACM0 <span class="token number">115200</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>接收端</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">cat</span> /dev/ttyACM0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>发送端</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello, RS485&quot;</span> <span class="token operator">&gt;</span> /dev/ttyACM0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h1 id="_4-回环测试" tabindex="-1"><a class="header-anchor" href="#_4-回环测试"><span>4. 回环测试</span></a></h1><p>在硬件上，普通的TTL串口信号通过一个转换芯片（这种芯片可以将TTL电平的单端信号转换为RS-485电平的差分信号）处理后可以转换为RS-485信号。</p><p>我进行了单机测试，将A和B端连接在一起进行回环测试，结果证实RS-485确实不能进行回环通信。</p><h1 id="_5-使用c程序测试rs-485" tabindex="-1"><a class="header-anchor" href="#_5-使用c程序测试rs-485"><span>5. 使用C程序测试RS-485</span></a></h1><h2 id="_5-1-发送端-sender-c" tabindex="-1"><a class="header-anchor" href="#_5-1-发送端-sender-c"><span>5.1 发送端 sender.c</span></a></h2><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;termios.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SERIAL_PORT</span> <span class="token string">&quot;/dev/ttyACM0&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">BAUDRATE</span> <span class="token expression">B115200 </span><span class="token comment">// 波特率，与串口模块配置一致</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">DELAY_US</span> <span class="token expression"><span class="token number">1000000</span> </span><span class="token comment">// 发送间隔，单位微秒</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">termios</span> options<span class="token punctuation">;</span>

    <span class="token comment">// 打开串口</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span>SERIAL_PORT<span class="token punctuation">,</span> O_RDWR <span class="token operator">|</span> O_NOCTTY <span class="token operator">|</span> O_NDELAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fd <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;open_port: Unable to open port&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取当前串口配置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tcgetattr</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;tcgetattr failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置波特率</span>
    <span class="token function">cfsetispeed</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">,</span> BAUDRATE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">cfsetospeed</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">,</span> BAUDRATE<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 无校验，8位数据位，1位停止位</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>PARENB<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CSTOPB<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CSIZE<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">|=</span> CS8<span class="token punctuation">;</span>

    <span class="token comment">// 设置为本地连接，使能接收</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">|=</span> <span class="token punctuation">(</span>CLOCAL <span class="token operator">|</span> CREAD<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 设置为原始模式</span>
    options<span class="token punctuation">.</span>c_lflag <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span>ICANON <span class="token operator">|</span> ECHO <span class="token operator">|</span> ECHOE <span class="token operator">|</span> ISIG<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 禁用软件流控制</span>
    options<span class="token punctuation">.</span>c_iflag <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span>IXON <span class="token operator">|</span> IXOFF <span class="token operator">|</span> IXANY<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 禁用硬件流控制</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CRTSCTS<span class="token punctuation">;</span>

    <span class="token comment">// 设置新的串口设置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tcsetattr</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> TCSANOW<span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;tcsetattr failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 循环发送数据</span>
    <span class="token keyword">char</span> write_buffer<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 获取用户输入</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Enter message to send (max 255 characters): &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fgets</span><span class="token punctuation">(</span>write_buffer<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>write_buffer<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">stdin</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 移除换行符</span>
        write_buffer<span class="token punctuation">[</span><span class="token function">strcspn</span><span class="token punctuation">(</span>write_buffer<span class="token punctuation">,</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token comment">// 发送数据</span>
        <span class="token keyword">int</span> bytes_written <span class="token operator">=</span> <span class="token function">write</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> write_buffer<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>write_buffer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bytes_written <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;write failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Sent: %s\\n&quot;</span><span class="token punctuation">,</span> write_buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">usleep</span><span class="token punctuation">(</span>DELAY_US<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 发送间隔</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 关闭串口</span>
    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-2-接收端-recriver-c" tabindex="-1"><a class="header-anchor" href="#_5-2-接收端-recriver-c"><span>5.2 接收端 recriver.c</span></a></h2><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;termios.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SERIAL_PORT</span> <span class="token string">&quot;/dev/ttyACM0&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">BAUDRATE</span> <span class="token expression">B115200 </span><span class="token comment">// 波特率，与串口模块配置一致</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">termios</span> options<span class="token punctuation">;</span>

    <span class="token comment">// 打开串口</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span>SERIAL_PORT<span class="token punctuation">,</span> O_RDWR<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fd <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;open_port: Unable to open port&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取当前串口配置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tcgetattr</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;tcgetattr failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 设置波特率</span>
    <span class="token function">cfsetispeed</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">,</span> BAUDRATE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">cfsetospeed</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">,</span> BAUDRATE<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 无校验，8位数据位，1位停止位</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>PARENB<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CSTOPB<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CSIZE<span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">|=</span> CS8<span class="token punctuation">;</span>

    <span class="token comment">// 设置为本地连接，使能接收</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">|=</span> <span class="token punctuation">(</span>CLOCAL <span class="token operator">|</span> CREAD<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 设置为原始模式</span>
    options<span class="token punctuation">.</span>c_lflag <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span>ICANON <span class="token operator">|</span> ECHO <span class="token operator">|</span> ECHOE <span class="token operator">|</span> ISIG<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 禁用软件流控制</span>
    options<span class="token punctuation">.</span>c_iflag <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span>IXON <span class="token operator">|</span> IXOFF <span class="token operator">|</span> IXANY<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 禁用硬件流控制</span>
    options<span class="token punctuation">.</span>c_cflag <span class="token operator">&amp;=</span> <span class="token operator">~</span>CRTSCTS<span class="token punctuation">;</span>

    <span class="token comment">// 设置新的串口设置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tcsetattr</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> TCSANOW<span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;tcsetattr failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 循环接收数据</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">char</span> read_buffer<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> bytes_read <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> read_buffer<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>read_buffer<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bytes_read <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">perror</span><span class="token punctuation">(</span><span class="token string">&quot;read failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        read_buffer<span class="token punctuation">[</span>bytes_read<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Received: %s\\n&quot;</span><span class="token punctuation">,</span> read_buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 关闭串口</span>
    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-3-makefile" tabindex="-1"><a class="header-anchor" href="#_5-3-makefile"><span>5.3 Makefile</span></a></h2><p>为了方便编译，这里附上一个简单的Makefile</p><div class="language-makefile line-numbers-mode" data-ext="makefile" data-title="makefile"><pre class="language-makefile"><code>CC <span class="token operator">=</span> arm-linux-gnueabihf-gcc
CFLAGS <span class="token operator">=</span> -Wall

<span class="token target symbol">all</span><span class="token punctuation">:</span> sender receiver

<span class="token target symbol">sender</span><span class="token punctuation">:</span> sender.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> -o sender sender.c

<span class="token target symbol">receiver</span><span class="token punctuation">:</span> receiver.c
	<span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> -o receiver receiver.c

<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f sender receiver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先运行接收端再运行发送端</p><p>send:</p><figure><img src="https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240625172956.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>receive:</p><figure><img src="https://cdn.jsdelivr.net/gh/sharebravery/album@master/20240625173041.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以进行进一步的优化，将<code>SERIAL_PORT</code>等由外部传参而入，这样方便对多个串口进行测试。</p><hr><p>参考资料：</p><p>https://doc.embedfire.com/mcu/stm32/f407batianhu/std/zh/latest/book/RS485.html</p><p><em>END</em></p><hr>`,39),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","RS485.html.vue"]]),k=JSON.parse('{"path":"/linux/RS485.html","title":"RS-485串口通信：简易指南与代码示例","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"5.1 发送端 sender.c","slug":"_5-1-发送端-sender-c","link":"#_5-1-发送端-sender-c","children":[]},{"level":2,"title":"5.2 接收端 recriver.c","slug":"_5-2-接收端-recriver-c","link":"#_5-2-接收端-recriver-c","children":[]},{"level":2,"title":"5.3 Makefile","slug":"_5-3-makefile","link":"#_5-3-makefile","children":[]}],"git":{"createdTime":1719903419000,"updatedTime":1719903419000,"contributors":[{"name":"sharebravery","email":"sharebravery@gmail.com","commits":1}]},"readingTime":{"minutes":4.29,"words":1288},"filePathRelative":"linux/RS485.md","localizedDate":"2024年7月2日","excerpt":""}');export{d as comp,k as data};
