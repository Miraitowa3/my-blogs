<template><div><p>安装 jenkins</p>
<h2 id="安装-java-环境" tabindex="-1"><a class="header-anchor" href="#安装-java-环境"><span>安装 java 环境</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">yum search <span class="token function">java</span> <span class="token operator">|</span> <span class="token function">grep</span> jdk <span class="token comment">#搜索java</span></span>
<span class="line">yum <span class="token function">install</span> - y java-11-openjdk.x86_64</span>
<span class="line">or</span>
<span class="line">yum <span class="token function">install</span> <span class="token parameter variable">-y</span> java-11-openjdk*</span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-version</span> <span class="token comment">#查看jdk版本</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-git-仓库" tabindex="-1"><a class="header-anchor" href="#安装-git-仓库"><span>安装 git 仓库</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">yum <span class="token function">install</span> <span class="token function">git</span></span>
<span class="line"> <span class="token function">git</span> <span class="token parameter variable">--version</span> <span class="token comment">#查看git版本</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3.安装 jenkins</strong></p>
<CodeGroup>
<CodeGroupItem title="war 包安装">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">wget</span> https://mirrors.tuna.tsinghua.edu.cn/jenkins/war-stable/latest/jenkins.war <span class="token comment">#下载jenkins.war</span></span>
<span class="line"><span class="token function">java</span> <span class="token parameter variable">-jar</span> jenkins.war <span class="token parameter variable">--httpPort</span><span class="token operator">=</span><span class="token number">8080</span> <span class="token comment">#启动jenkins</span></span>
<span class="line"><span class="token comment">#启动成功后，通过`ip地址+端口`访问</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="yum 安装">
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/jenkins.repo https://pkg.jenkins-ci.org/redhat-stable/jenkins.repo <span class="token comment"># 在yum.repos.d中添加jenkins源文件</span></span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://pkg.jenkins.io/redhat-stable/jenkins.io.key <span class="token comment">#导入GPG密钥以确保软件合法</span></span>
<span class="line">yum <span class="token function">install</span>  java-11-openjdk.X86_64</span>
<span class="line">yum <span class="token function">install</span> jenkins</span>
<span class="line">systemctl start jenkins <span class="token comment">#启动jenkins服务</span></span>
<span class="line">systemctl stop jenkins <span class="token comment">#停止jenkins服务</span></span>
<span class="line">systemctl <span class="token builtin class-name">enable</span> jenkins <span class="token comment">#开机启动jenkins服务</span></span>
<span class="line">systemctl daemon-reload <span class="token comment">#守护进程</span></span>
<span class="line"><span class="token comment">#如果使用的是云服务器，需要在安全组中添加Jenkins端口</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">如何jenkins安装失败，可以进行一下操作</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line"><span class="token comment"># 进入 /etc/yum.repo.d/jenkins.repo 中进行编辑 ，把baseurl的值改为http://pkg.jenkins.io/rehat</span></span>
<span class="line"><span class="token punctuation">[</span>jenkins<span class="token punctuation">]</span></span>
<span class="line">name:Jenkins-stable</span>
<span class="line"><span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://pkg.jenkins.io/rehat</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">jenkins相关修改</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre class="language-bash"><code><span class="line">查找jenkins安装路径</span>
<span class="line"><span class="token function">rpm</span> <span class="token parameter variable">-ql</span> jenkins</span>
<span class="line">修改jenkins port</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/sysconfig/jenkins</span>
<span class="line">修改jenkins 启动的jdk版本</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/init.d/jenkins</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="系统配置与项目构建" tabindex="-1"><a class="header-anchor" href="#系统配置与项目构建"><span>系统配置与项目构建</span></a></h2>
<p>.安装 nodeJS 插件</p>
<p><img src="/images/linux/cicd/CICD_1.png" alt="Image from alias">
.安装对应版本 node</p>
<p><img src="/images/linux/cicd/CICD_2.png" alt="node环境安装"></p>
<p>.新建一个自由风格的软件项目的任务</p>
<p><img src="/images/linux/cicd/CICD_3.png" alt="新建任务"></p>
<p>.配置 git 仓库信息</p>
<p><img src="/images/linux/cicd/CICD_4.png" alt="配置git仓库信息"></p>
<p>.添加 gitHub 认证</p>
<p><img src="/images/linux/cicd/CICD_5.png" alt="添加gitHub认证">
.构建触发器</p>
<p><img src="/images/linux/cicd/CICD_6.png" alt="构建触发器"></p>
<p>.添加 node 环境</p>
<p><img src="/images/linux/cicd/CICD_7.png" alt="添加node环境"></p>
<p>这个步骤容易出现以下问题：</p>
<p><img src="/images/linux/cicd/CICD_9.png" alt="添加node环境出现的问题"></p>
<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">解决方法</p><p>安装最新版的 node 或者多安装几遍 node 环境</p>
</div><p><img src="/images/linux/cicd/CICD_7.png" alt="配置git仓库信息"></p>
<p>执行 shell 脚本</p>
<p><img src="/images/linux/cicd/CICD_8.png" alt="配置git仓库信息"></p>
</div></template>


