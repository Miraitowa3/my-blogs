<template><div><h1 id="项目打包和自动化部署" tabindex="-1"><a class="header-anchor" href="#项目打包和自动化部署"><span>项目打包和自动化部署</span></a></h1>
<h2 id="一-项目部署和devops" tabindex="-1"><a class="header-anchor" href="#一-项目部署和devops"><span>一. 项目部署和DevOps</span></a></h2>
<h3 id="_1-1-传统的开发模式" tabindex="-1"><a class="header-anchor" href="#_1-1-传统的开发模式"><span>1.1. 传统的开发模式</span></a></h3>
<p>在传统的开发模式中，开发的整个过程是按部就班就行：</p>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_01.jpg" alt="早期的开发模式" style="zoom:67%;" />
<p>但是这种模式存在很大的弊端：</p>
<ul>
<li>工作的不协调：开发人员在开发阶段，测试和运维人员其实是处于等待的状态。等到测试阶段，开发人员等待测试反馈bug，也会处于等待状态。</li>
<li>线上bug的隐患：项目准备交付时，突然出现了bug，所有人员需要加班、等待问题的处理；</li>
</ul>
<h3 id="_1-2-devops开发模式" tabindex="-1"><a class="header-anchor" href="#_1-2-devops开发模式"><span>1.2. DevOps开发模式</span></a></h3>
<p>DevOps是Development和Operations两个词的结合，将开发和运维结合起来的模式：</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_02.jpg" alt="打开格局"></p>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_03.jpg" alt="DevOps模式" style="zoom:67%;" />
<h3 id="_1-3-持续集成和持续交付" tabindex="-1"><a class="header-anchor" href="#_1-3-持续集成和持续交付"><span>1.3. 持续集成和持续交付</span></a></h3>
<p>伴随着DevOps一起出现的两个词就是持续集成和持续交付(部署)：</p>
<ul>
<li>CI是Continuous Integration（持续集成）；</li>
<li>CD是两种翻译：Continuous Delivery（持续交付）或Continuous Deployment（持续部署）；</li>
</ul>
<p>持续集成CI：</p>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_04.jpg" alt="持续集成" style="zoom:67%;" />
<p>持续交付和持续部署：</p>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_05.jpg" alt="持续交付" style="zoom:67%;" />
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_06.jpg" alt="持续部署" style="zoom:67%;" />
<h3 id="_1-4-自动化部署流程" tabindex="-1"><a class="header-anchor" href="#_1-4-自动化部署流程"><span>1.4. 自动化部署流程</span></a></h3>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_07.jpg" alt="自动化部署的流程"></p>
<h2 id="二-购买云服务器" tabindex="-1"><a class="header-anchor" href="#二-购买云服务器"><span>二. 购买云服务器</span></a></h2>
<h3 id="_2-1-注册阿里云的账号" tabindex="-1"><a class="header-anchor" href="#_2-1-注册阿里云的账号"><span>2.1. 注册阿里云的账号</span></a></h3>
<p>云服务器我们可以有很多的选择：阿里云、腾讯云、华为云。</p>
<ul>
<li>目前在公司使用比较多的是阿里云；</li>
<li>我自己之前也一直使用阿里云，也在使用腾讯云；</li>
<li>之前华为云也有找我帮忙推广他们的活动；</li>
</ul>
<p>但是在我们的课程中，我选择目前使用更加广泛的阿里云来讲解：</p>
<p>我们需要注册阿里云账号</p>
<ul>
<li>
<p>https://aliyun.com/</p>
</li>
<li>
<p>注册即可，非常简单</p>
</li>
</ul>
<h3 id="_2-2-购买云服务器" tabindex="-1"><a class="header-anchor" href="#_2-2-购买云服务器"><span>2.2. 购买云服务器</span></a></h3>
<p>购买云服务器</p>
<p>1.来到控制台：</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_08.jpg" alt="image-20201204152032769"></p>
<p>2.创建实例，选择类型和配置</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_09.jpg" alt="image-20201204152133800"></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_10.jpg" alt="image-20201203103047329"></p>
<p>3.配置网络安全组</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_11.jpg" alt="image-20201203103725892"></p>
<p>4.创建实例</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_12.jpg" alt="image-20201203104249296"></p>
<div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>目前的最新版本为Node.js v18.x不支持Centos 7系统，因此安装支持Centos 7 的最高版本Nodejs v16.x。
<br/>
如果要使用&gt;=Node.js18x,则需要安装centos8</p>
</div><h2 id="三-搭建服务器环境" tabindex="-1"><a class="header-anchor" href="#三-搭建服务器环境"><span>三. 搭建服务器环境</span></a></h2>
<ul>
<li><strong>java11</strong></li>
<li><strong>jenkins-2.471-1.1.noarch</strong></li>
<li><strong>centos7</strong></li>
</ul>
<h3 id="_3-1-jenkins自动化部署" tabindex="-1"><a class="header-anchor" href="#_3-1-jenkins自动化部署"><span>3.1. jenkins自动化部署</span></a></h3>
<h4 id="_3-1-1-安装java环境" tabindex="-1"><a class="header-anchor" href="#_3-1-1-安装java环境"><span>3.1.1. 安装Java环境</span></a></h4>
<p>Jenkins本身是依赖Java的，所以我们需要先安装Java环境：</p>
<ul>
<li>安装Java</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">yum search java-11</span>
<span class="line">yum <span class="token function">install</span> java-11-openjdk.x86_64</span>
<span class="line"><span class="token comment">#或者</span></span>
<span class="line">yum <span class="token function">install</span> java-11-openjdk*</span>
<span class="line"></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-version</span> <span class="token comment">#查看jdk版本</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-2-安装jenkins" tabindex="-1"><a class="header-anchor" href="#_3-1-2-安装jenkins"><span>3.1.2. 安装Jenkins</span></a></h4>
<p>因为Jenkins本身是没有在dnf的软件仓库包中的，所以我们需要连接Jenkins仓库：</p>
<ul>
<li>wget是Linux中下载文件的一个工具，-O表示输出到某个文件夹并且命名为什么文件；</li>
<li>rpm：全称为<strong>The RPM Package Manage</strong>，是Linux下一个软件包管理器；</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">wget</span> –O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 导入GPG密钥以确保您的软件合法</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://pkg.jenkins.io/redhat/jenkins.io.key</span>
<span class="line"><span class="token comment"># 或者</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">--import</span> http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑一下文件/etc/yum.repos.d/jenkins.repo</p>
<ul>
<li>可以通过vim编辑</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">[jenkins]</span>
<span class="line"></span>
<span class="line">name=Jenkins-stable</span>
<span class="line"></span>
<span class="line">baseurl=http://pkg.jenkins.io/redhat</span>
<span class="line"></span>
<span class="line">gpgcheck=1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装Jenkins</p>
<CodeGroup>
<CodeGroupItem title="war 包安装">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token comment">#下载</span></span>
<span class="line"><span class="token function">wget</span> https://mirrors.tuna.tsinghua.edu.cn/jenkins/war-stable/latest/jenkins.war <span class="token comment">#下载jenkins.war</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#启动</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> jenkins.war <span class="token parameter variable">--httpPort</span><span class="token operator">=</span><span class="token number">8080</span> <span class="token comment">#启动jenkins</span></span>
<span class="line"><span class="token comment">#启动成功后，通过`ip地址+端口`访问</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#停止</span></span>
<span class="line"><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> jenkins</span>
<span class="line"></span>
<span class="line"><span class="token function">kill</span> <span class="token parameter variable">-9</span> 进程号</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="yum 安装">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token comment">#安装</span></span>
<span class="line">yum <span class="token function">install</span> jenkins <span class="token comment"># --nogpgcheck(可以不加)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#启动Jenkins的服务</span></span>
<span class="line">systemctl start jenkins <span class="token comment">#启动jenkins服务</span></span>
<span class="line">systemctl stop jenkins <span class="token comment">#停止jenkins服务</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> jenkins <span class="token comment">#开机启动jenkins服务</span></span>
<span class="line">systemctl daemon-reload <span class="token comment">#守护进程</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<div class="custom-container danger"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg><p class="custom-container-title">DANGER</p><ol>
<li><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_14.png" alt="error">
<strong>Job for jenkins.service failed because the control process exited with error code. See &quot;systemctl status jenkins.service&quot; and &quot;journalctl -xe&quot; for details.</strong></li>
</ol>
<p>错误原因: java与jenkins的版本不匹配</p>
<p>解决：安装对应的版本，  jenkins 在这个范围内<code v-pre>2.x ~ 2.289.x</code> 需要 <code v-pre>java8</code> ，&gt; <code v-pre>2.289.x</code>需要<code v-pre>java11</code></p>
<ol>
<li>
<p>jenkins构建时错误：Job for jenkins.service failed becasused a timeout was exceeded ，错误如下
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_30.png" alt="error"></p>
<p>排查过程：根据提示查看systemctl status jenkins和journalctl -xe
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_31.png" alt="error">
根据systemctl status jenkins，可以看到jenkins服务一直处于启动中的状态</p>
</li>
</ol>
<p>错误原因：发生此问题的原因是用户无权在目录/var/libs/jenkins上执行作业</p>
<p>解决方法：在jenkins配置文件中将将用户改为root，并重启</p>
</div><p><strong>Jenkins默认使用8080端口提供服务，所以需要加入到安全组中：</strong></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_13.jpg" alt="image-20201204173117359"></p>
<h4 id="_3-1-3-安装-git-仓库" tabindex="-1"><a class="header-anchor" href="#_3-1-3-安装-git-仓库"><span>3.1.3. 安装 git 仓库</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">yum <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"> <span class="token function">git</span> <span class="token parameter variable">--version</span> <span class="token comment">#查看git版本</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-4-jenkins用户" tabindex="-1"><a class="header-anchor" href="#_3-1-4-jenkins用户"><span>3.1.4. jenkins用户</span></a></h4>
<p><strong>查看当前安装jenkins的安装报名</strong></p>
<ul>
<li><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_27.png" alt="eror"></li>
</ul>
<p><strong>查看安装包的文件及路径</strong></p>
<ul>
<li><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_28.png" alt="eror"></li>
</ul>
<p><strong>vim <code v-pre>/usr/lib/systemed/system/jenkins.service</code>,修改为 User=root</strong></p>
<ul>
<li><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_29.png" alt="eror"></li>
</ul>
<p><strong>之后需要重启一下Jenkins：</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">systemctl restart jenkins</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-1-5-jenkins任务" tabindex="-1"><a class="header-anchor" href="#_3-1-5-jenkins任务"><span>3.1.5. jenkins任务</span></a></h4>
<p><strong>打开浏览器，输入：http://8.134.60.235:9000</strong></p>
<ul>
<li>注意：你输入自己的IP地址</li>
</ul>
<p><strong>获取输入管理员密码：</strong></p>
<ul>
<li>在下面的地址中 <code v-pre>cat /var/lib/jenkins/secrets/initialAdminPassword</code></li>
</ul>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_16.webp" alt="image-20201203173047824"></p>
<p><strong>然后创建用户</strong></p>
<p><strong>可以安装推荐的插件：</strong></p>
<p>-<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_17.jpg" alt="安装推荐的插件"></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_18.webp" alt="jenkins2.jpg"></p>
<p><strong>创建任务</strong></p>
<p>点击 <strong>新建 Item</strong> 创建一个 <code v-pre>Freestyle Project</code></p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b47056dd01e545719ca5b461c79b5f95~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="jenkins3.jpg"></p>
<p>在 <strong>添加远程仓库</strong> 处选择 git ，输入仓库地址，点击添加。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb0c956a428c4e5ca334b8e86ea8b711~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="jenkins4.jpg">
<strong>添加凭证，与远程仓库建立关系</strong></p>
<p>输入 github 账号和密码，这里的密码有时候可能会出现问题，可以使用 <code v-pre>token</code> <a href="https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token" title="https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token" target="_blank" rel="noopener noreferrer">github 如何生成 token ？<ExternalLinkIcon/></a></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_19.webp" alt="jenkins5.jpg"></p>
<p><strong>构建触发器</strong></p>
<ul>
<li>
<p>修改 <code v-pre>Jenkins</code> 任务配置 构建触发器中选择 GitHub hook trigger for GITScm polling
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_20.png" alt="jenkins5.jpg"></p>
</li>
<li>
<p>来到 Jenkins 中选择 系统管理 -&gt; 系统配置 找到 Jenkins URL 将其复制。</p>
</li>
<li>
<p>随后在尾部添加 github-webhook/ 尾部斜杠一定不要丢。 整体结构大致为 http://http://8.134.60.235:8080/github-webhook/</p>
</li>
<li>
<p>登录 github 需要集成的项目中添加 webhook。在 Payload URL 中将上述内容填入。
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_25.png" alt="jenkins5.jpg"></p>
</li>
</ul>
<p><strong>构建环境安装</strong></p>
<ul>
<li>
<p>安装nodejs插件
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_21.png" alt="安装nodejs插件"></p>
</li>
<li>
<p>系统管理 -&gt; 全局工具配置 中配置 Node (吐槽：没有安装任何插件时系统管理以及其子页面全是英文，安装完插件后又变成了中文。这国际化不知道是系统原因还是它的原因 😂)。
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_22.png" alt="安装node插件"></p>
</li>
<li>
<p>构建环境 -&gt;选择 Provide Node &amp; npm bin/ folder to PATH  -&gt;选择nodejs版本
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_23.png" alt="安装node插件"></p>
</li>
</ul>
<p><strong>部署到主机目标</strong></p>
<ul>
<li>增加构建步骤 -&gt; 执行 shell 输入打包发布相关的命令。Jenkins 会逐行执行。
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_26.png" alt="安装node插件"></li>
</ul>
<div class="custom-container danger"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg><p class="custom-container-title">DANGER</p><ol>
<li>由于项目构建时是在 Jenkins 的工作目录下执行脚本，会出现权限问题。导致即使使用了 sudo 还会出现类似以下错误,报错如下</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">We trust you have received the usual lecture from the <span class="token builtin class-name">local</span> System</span>
<span class="line">Administrator. It usually boils down to these three things:</span>
<span class="line"></span>
<span class="line">    <span class="token comment">#1) Respect the privacy of others.</span></span>
<span class="line">    <span class="token comment">#2) Think before you type.</span></span>
<span class="line">    <span class="token comment">#3) With great power comes great responsibility.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案：在 /etc/sudoers 文件中增加 jenkins ALL=(ALL) NOPASSWD:ALL 表示在执行 sudo 时不需要输入密码。</p>
<ol start="2">
<li>如果不使用 sudo 则会出现以下错误。</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">xxxxxxx: Permission denied</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>解决方案：修改 /lib/systemed/system/jenkins.service 文件。将 User=jenkins 修改为 User=root，表示给 Jenkins 赋权限。修改配置文件后记得重启服务。</p>
<ol start="3">
<li>构建的过程中还可能出现以下错误</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">ERROR: Error fetching remote repo <span class="token string">'origin'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>解决方案：由于需要构建的代码在 github 上面，这种错误表示拉取代码失败了，重试几次就可以了。</p>
</div><div class="custom-container info"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">INFO</p><p><em>jenkins-2.471-1.1.noarch+</em>
jenkins安装目录：<code v-pre>/var/lib/jenkins/</code>
<br/>
jenkinsg工作目录：<code v-pre>/var/lib/jenkins/workspace/</code></p>
</div><h3 id="_3-2-钉钉机器人通知-jenkins" tabindex="-1"><a class="header-anchor" href="#_3-2-钉钉机器人通知-jenkins"><span>3.2. 钉钉机器人通知（jenkins）</span></a></h3>
<p>1，<strong>系统管理 -&gt; 插件管理</strong> 搜索 <code v-pre>DingTalk</code> 进行安装。<a href="https://jenkinsci.github.io/dingtalk-plugin/" title="https://jenkinsci.github.io/dingtalk-plugin/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_39.webp" alt="jenkins13.jpg"></p>
<p>2，钉钉群创建机器人。<strong>钉钉群 -&gt; 只能群助手 -&gt; 添加机器人 -&gt; 自定义</strong></p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_40.webp" alt="ding1.jpg"></p>
<p>3，定义机器人名字和关键字，创建完成后先将 <code v-pre>webhook</code> 中的内容复制。</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_41.webp" alt="ding2.jpg"></p>
<p>4，<code v-pre>Jenkins</code> 中 <strong>系统管理 -&gt; 系统配置 -&gt; 钉钉 -&gt; 新增</strong> 配置完成后可点击右下角进行测试。</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_42.webp" alt="jenkins14.jpg"></p>
<p>5，修改构建任务配置。</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_43.png" alt="jenkins15.jpg"></p>
<ul>
<li>
<p>通知人：atAll 勾选后 <code v-pre>@</code> 不到准确的人。😂。输入框内可填写需要被 <code v-pre>@</code> 人的手机号，多个换行。</p>
</li>
<li>
<p>自定义内容：支持 <code v-pre>markdown</code> 写法，可以使用一些环境变量。</p>
</li>
<li>
<p><a href="https://jenkinsci.github.io/dingtalk-plugin/advance/user-property.html" title="https://jenkinsci.github.io/dingtalk-plugin/advance/user-property.html" target="_blank" rel="noopener noreferrer">实现默认 <code v-pre>@</code> 执行人<ExternalLinkIcon/></a></p>
</li>
</ul>
<p>6，构建成功</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_38.png" alt="ding3.jpg"></p>
<h3 id="_3-3-jenkins备份" tabindex="-1"><a class="header-anchor" href="#_3-3-jenkins备份"><span>3.3. jenkins备份</span></a></h3>
<p><strong>方式一:将 /var/lib/jenkins(jenkins-2.471的安装目录)进行备份<code v-pre>，使用的时候直接覆盖新Jenkins服务的</code>/var/lib/jenkins`这个目录</strong>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_34.png" alt="jenkins备份"></p>
<p><strong>方式二: 使用<code v-pre>ThinBackup</code>进行备份</strong></p>
<ul>
<li>下载<code v-pre>ThinBackup</code>
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_35.png" alt="下载 ThinBackup"></li>
<li>配置<code v-pre>ThinBackup</code></li>
</ul>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_36.png" alt="配置ThinBackup"></p>
<ul>
<li>点击<code v-pre>Backup now</code> 开始备份
<img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_37.png" alt="开始备份"></li>
</ul>
<h3 id="_3-4-nginx安装和配置" tabindex="-1"><a class="header-anchor" href="#_3-4-nginx安装和配置"><span>3.4. nginx安装和配置</span></a></h3>
<h4 id="_3-4-1-安装nginx" tabindex="-1"><a class="header-anchor" href="#_3-4-1-安装nginx"><span>3.4.1. 安装nginx</span></a></h4>
<p>后续我们部署会使用nginx，所以需要先安装一下nginx：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">yum <span class="token function">install</span> nginx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>启动nginx：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">systemctl start nginx</span>
<span class="line">systemctl status nginx</span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> nginx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-2-配置nginx" tabindex="-1"><a class="header-anchor" href="#_3-4-2-配置nginx"><span>3.4.2. 配置nginx</span></a></h4>
<p>我们这里主要配置nginx的用户和默认访问目录：</p>
<p>配置用户：</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_32.jpg" alt="image-20210825163329209"></p>
<p>通过Linux命令创建文件夹和文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">mkdir</span> /root/mall_cms</span>
<span class="line"><span class="token builtin class-name">cd</span> /root/mall_cms</span>
<span class="line"><span class="token function">touch</span> index.html</span>
<span class="line"></span>
<span class="line"><span class="token function">vi</span> index.html</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置访问目录：</p>
<p><img src="@source/blogs/前端工程化/cicd/git+jenkins+gitHub+nginx实现/imgs/cicd_33.jpg" alt="image-20210825163406566"></p>
<p>参考：</p>
<ul>
<li><a href="https://www.jenkins.io/zh/doc/book/installing/" target="_blank" rel="noopener noreferrer">jenkins官网<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/7102360505313918983" target="_blank" rel="noopener noreferrer">65岁退休Coder<ExternalLinkIcon/></a></li>
<li><a href="https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html" target="_blank" rel="noopener noreferrer">阮一峰<ExternalLinkIcon/></a></li>
</ul>
</div></template>


