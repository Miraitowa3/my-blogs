<template><div><h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h1>
<p>这是一篇属于面向<strong>前端</strong>的关于<code v-pre>CICD</code>和<code v-pre>Github Action</code>的入门文章，其旨在：</p>
<ol>
<li>入门掌握<code v-pre>Github Action</code>的用法</li>
<li>学习<code v-pre>CI</code>和<code v-pre>CD</code>的含义及其实现细节</li>
<li>基于<code v-pre>Github Action</code>展示如何给自己手上的项目添加<code v-pre>CICD</code>的流程</li>
<li>基于<code v-pre>CICD</code>流程去添加其他延伸机制，如回滚、端对端测试等</li>
</ol>
<p>事不宜迟，直接开始本文的内容吧。</p>
<h1 id="为什么要选择github-action" tabindex="-1"><a class="header-anchor" href="#为什么要选择github-action"><span>为什么要选择<code v-pre>Github Action</code></span></a></h1>
<p>本文选择<code v-pre>Github Action</code>不代表他是最好选择，但在我用过的<strong>CICD 工具</strong>中，他对<strong>开源项目</strong>的支持是最友好的(不过这个项目得放在<code v-pre>Github</code>，如果是放在<code v-pre>Gitee</code>就用不到了)。</p>
<blockquote>
<p>公共仓库和自托管运行器免费使用 <code v-pre>GitHub Actions</code>。 对于私有仓库，每个 GitHub 帐户可获得一定数量的免费记录和存储，具体取决于帐户所使用的产品。 超出包含金额的任何使用量都由支出限制控制。</p>
</blockquote>
<p><code v-pre>Github Action</code>在<strong>开源项目</strong>是免费使用的，而在<strong>私有项目</strong>方面的计费会根据你购买的服务而不同，详细可看<a href="https://docs.github.com/cn/billing/managing-billing-for-github-actions/about-billing-for-github-actions" title="https://docs.github.com/cn/billing/managing-billing-for-github-actions/about-billing-for-github-actions" target="_blank" rel="noopener noreferrer">关于 GitHub Actions 的计费<ExternalLinkIcon/></a>。</p>
<p>而对于其他我用过的<strong>CICD 工具</strong>及其没被选为本文实现方式的原因如下所示：</p>
<ul>
<li><strong><code v-pre>Gitlab CI</code></strong>：与<code v-pre>Gitlab</code>高度绑定，项目放在<code v-pre>Gitlab</code>就谈不上开源了</li>
<li><strong><code v-pre>Travic CI</code></strong>：限时免费，过后按进程收费</li>
<li><strong><code v-pre>Drone CI</code></strong>：执行任务时，国内机器从<code v-pre>Github</code>拉取仓库代码时会偶尔超时，从而导致任务失败</li>
<li><strong><code v-pre>Jenkins CI</code></strong>：除了存在与<code v-pre>Drone CI</code>一样的缺点外，自身比较重量，占用宿主机较多资源</li>
</ul>
<h1 id="github-action初学入门-熟悉的可跳过此章节" tabindex="-1"><a class="header-anchor" href="#github-action初学入门-熟悉的可跳过此章节"><span><code v-pre>Github Action</code>初学入门（熟悉的可跳过此章节）</span></a></h1>
<p>当我们想往自己的项目里接入<strong>Github Actions</strong>时，要在根项目目录里新建<code v-pre>.github/workflows</code>目录。然后通过编写<code v-pre>yml</code>格式文件定义<strong>Workflow(工作流程)<strong>去实现<code v-pre>CI</code>。在阅读<code v-pre>yml</code>文件之前，我们要先搞懂在</strong>Workflow</strong>中一些比较重要的概念：</p>
<ul>
<li><strong>Event(触发事件)</strong>：指触发 <strong>Workflow(工作流程)</strong> 运行的事件。</li>
<li><strong>Job(作业)</strong>：一个<strong>工作流程</strong>中包含一个或多个<strong>Job</strong>，这些<strong>Job</strong>默认情况下并行运行，但我们也可以通过设置让其按顺序执行。每个<strong>Job</strong>都在指定的环境(虚拟机或容器)里开启一个<strong>Runner</strong>(可以理解为一个进程)运行，包含多个<strong>Step(步骤)</strong>。</li>
<li><strong>Step(步骤)</strong>：<strong>Job</strong>的组成部分，用于定义每一部的工作内容。每个<strong>Step</strong>在运行器环境中以其单独的进程运行，且可以访问工作区和文件系统。</li>
</ul>
<p>以下图的<code v-pre>Workflow</code>作为例子，我们可以更直观地看懂<strong>Event</strong>、<strong>Job</strong>以及<strong>Step</strong>两者的关系：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27deef91333747ab8f7e09bd2649b5bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p><em>在<code v-pre>Github Action</code>中， <strong>Job</strong> 和 <strong>Step</strong> 以及 <strong>Workflow</strong> 都有资源占用以及时间限制，超出限制就会直接取消运行，关于这些限制可看<a href="https://docs.github.com/cn/actions/learn-github-actions/usage-limits-billing-and-administration#usage-limits" title="https://docs.github.com/cn/actions/learn-github-actions/usage-limits-billing-and-administration#usage-limits" target="_blank" rel="noopener noreferrer">Usage limits<ExternalLinkIcon/></a>。</em></p>
<p>下面我们用<code v-pre>Github</code>的官方教程中的一个<code v-pre>Workflow</code>例子来学习：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token comment"># 指定工作流程的名称</span></span>
<span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> learn<span class="token punctuation">-</span>github<span class="token punctuation">-</span>actions</span>
<span class="line"><span class="token comment"># 指定此工作流程的触发事件Event。 此示例使用 推送 事件，即执行push后，触发该流水线的执行</span></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span></span>
<span class="line"><span class="token comment"># 存放 learn-github-actions 工作流程中的所有Job</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 指定一个Job的名称为check-bats-version</span></span>
<span class="line">  <span class="token key atrule">check-bats-version</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 指定该Job在最新版本的 Ubuntu Linux 的 Runner(运行器)上运行</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token comment"># 存放 check-bats-version 作业中的所有Step</span></span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># step-no.1: 运行actions/checkout@v3操作，操作一般用uses来调用，</span></span>
<span class="line">      <span class="token comment"># 一般用于处理一些复杂又频繁的操作例如拉取分支，安装插件</span></span>
<span class="line">      <span class="token comment"># 此处 actions/checkout 操作是从仓库拉取代码到Runner里的操作</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3</span>
<span class="line">      <span class="token comment"># step-no.2: actions/setup-node@v3 操作来安装指定版本的 Node.js，此处指定安装的版本为v14</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"14"</span></span>
<span class="line">      <span class="token comment"># step-no.3: 运行命令行下载bats依赖到全局环境中</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token punctuation">-</span>g bats</span>
<span class="line">      <span class="token comment"># step-no.4: 运行命令行查看bats依赖的版本</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> bats <span class="token punctuation">-</span>v</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个<code v-pre>learn-github-actions</code><strong>工作流程</strong>弄成流程图可如下所示：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf3432f09abe493cbc5a96a94c34a441~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h1 id="基础篇-来给一个项目添加cicd流程" tabindex="-1"><a class="header-anchor" href="#基础篇-来给一个项目添加cicd流程"><span>基础篇：来给一个项目添加<code v-pre>CICD</code>流程</span></a></h1>
<h2 id="初始化项目" tabindex="-1"><a class="header-anchor" href="#初始化项目"><span>初始化项目</span></a></h2>
<p>为了让读者更多地专注于<code v-pre>CICD</code>的实现细节，这里我用<code v-pre>Vite</code>的<a href="https://vitejs.cn/guide/#scaffolding-your-first-vite-project" title="https://vitejs.cn/guide/#scaffolding-your-first-vite-project" target="_blank" rel="noopener noreferrer">创建指令<ExternalLinkIcon/></a>简单新建一个项目。通过<code v-pre>yarn create vite cicd-study --template react-ts</code>创建一个技术栈为<code v-pre>Vite</code>、<code v-pre>React</code>、<code v-pre>Typescript</code>的前端项目，安装依赖后运行起来的页面效果如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49744ea6dcd24fa2870900518f1371bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="vite-react-ts.gif"></p>
<p>读者也可以通过<a href="https://stackblitz.com/edit/vitejs-vite-rfo4fe?file=index.html&amp;terminal=dev" title="https://stackblitz.com/edit/vitejs-vite-rfo4fe?file=index.html&amp;terminal=dev" target="_blank" rel="noopener noreferrer">stackblitz<ExternalLinkIcon/></a>查看项目的目录结构和文件代码。</p>
<p>接下来会在这个项目上添加<code v-pre>CI</code>和<code v-pre>CD</code>流程。完整项目地址可看<a href="https://github.com/Hitotsubashi/cicd-study" title="https://github.com/Hitotsubashi/cicd-study" target="_blank" rel="noopener noreferrer">ciccd-study<ExternalLinkIcon/></a>。</p>
<h2 id="添加ci流程" tabindex="-1"><a class="header-anchor" href="#添加ci流程"><span>添加<code v-pre>CI</code>流程</span></a></h2>
<h3 id="ci的概念" tabindex="-1"><a class="header-anchor" href="#ci的概念"><span><code v-pre>CI</code>的概念</span></a></h3>
<p><strong>CI</strong>的全称是<strong>Continuous Integration</strong>，直译为<strong>可持续集成</strong>，而普遍对其的解释是<strong>频繁地（一天多次）将代码集成到主干</strong>。对于这个解释我们要搞懂其中的两个概念：</p>
<ol>
<li><strong>主干</strong>：是指包含多个已上和即将上线的特性的分支。</li>
<li><strong>集成</strong>：是指把含新特性的分支合并(<code v-pre>merge</code>)到<strong>主干</strong>上的行为</li>
</ol>
<p>我们借<code v-pre>github flow</code>分支管理策略作为例子来更加深入了解<code v-pre>CI</code>及上面的两个概念：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e231ae5101154085bcb13b18443c5e2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p><code v-pre>github flow</code>在开发新特性的运行模式如下所示：</p>
<ol>
<li>基于<code v-pre>master</code>创建新的分支<code v-pre>feature</code>进行开发。注意这需要保证<code v-pre>master</code>的代码和特性永远是最稳定的。</li>
<li>开发期间，定期提交更改(<code v-pre>commit and push change</code>)到远程仓库的<code v-pre>feature</code>分支</li>
<li>在编码以及自测完成后，通过创建<code v-pre>pull request</code>去对<code v-pre>master</code>发起合并<code v-pre>feature</code>的请求</li>
<li><code v-pre>pull request</code>在经过审核确认可行后合并到<code v-pre>master</code>分支</li>
<li>删除已合并的特性分支<code v-pre>feature</code></li>
</ol>
<p>更多详细细节可看<a href="https://docs.github.com/cn/get-started/quickstart/github-flow" title="https://docs.github.com/cn/get-started/quickstart/github-flow" target="_blank" rel="noopener noreferrer">GitHub flow<ExternalLinkIcon/></a>。</p>
<p>在<code v-pre>github Flow</code>模型中，<strong>主干</strong>指<code v-pre>master</code>分支，广义上是一个包含多个已上和即将上线的特性的分支；<strong>集成</strong>指的是在<code v-pre>pull request</code>通过后把特性分支<code v-pre>merge</code>合并到<strong>主干</strong>，也就是<code v-pre>master</code>分支上。</p>
<p>阮一峰老师的<a href="https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html" title="https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html" target="_blank" rel="noopener noreferrer">持续集成是什么？<ExternalLinkIcon/></a>里说到过：</p>
<blockquote>
<p>持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。它的核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。</p>
</blockquote>
<p>而<code v-pre>github flow</code>模型<strong>保证高质量的核心措施</strong>是：在<strong>集成</strong>前通过<code v-pre>pull request</code>，从而触发审核（审核可以是一系列的自动化校验测试以及代码审核<strong>Code Review</strong>），在审核通过后再合并到<strong>主干</strong>，从而保证<strong>主干</strong>的稳定性。</p>
<p>下面我们就按照<code v-pre>github flow</code>模型的机制，在开头创建的项目上添加<code v-pre>CI</code>流程。</p>
<h3 id="在项目中实现ci" tabindex="-1"><a class="header-anchor" href="#在项目中实现ci"><span>在项目中实现<code v-pre>CI</code></span></a></h3>
<p>根据上面所说的<code v-pre>github flow</code>模型<strong>保证高质量的核心措施</strong>可知，我们要定义的执行<code v-pre>CI</code>的<strong>Workflow</strong>（下称<strong>CI Workflow</strong>）的<strong>Event</strong>是<code v-pre>master</code>分支的<code v-pre>pull request</code>事件。而<code v-pre>Job</code>和<code v-pre>Step</code>的话没具体说明，而我们可以把目前最普遍的 <strong>代码测试（Test）</strong> 和 <strong>代码扫描（Lint）</strong> 加入其中。</p>
<p>其实现思路是，首先要借助一些第三方插件，在<code v-pre>package.json</code>中的<code v-pre>scripts</code>定义可以执行<strong>代码测试（Test）<strong>和</strong>代码扫描（Lint）<strong>的命令，然后在把这些命令行加到</strong>CI Workflow</strong>的<strong>Step</strong>里。</p>
<p>具体流程图如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cd2441838274ff39f63af4fccb134a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h4 id="代码扫描命令实现" tabindex="-1"><a class="header-anchor" href="#代码扫描命令实现"><span>代码扫描命令实现</span></a></h4>
<p>一般公司里都会通过类似<code v-pre>Sonar</code>这类代码质量管理插件来保证代码质量。不过我们也可以通过前端样式三剑侠：<code v-pre>eslint</code>+<code v-pre>prettier</code>+<code v-pre>stylelint</code>来简单保证。这里我直接使用本人比较喜好和经常使用的<code v-pre>umi</code>的代码规范：<a href="https://github.com/umijs/fabric" title="https://github.com/umijs/fabric" target="_blank" rel="noopener noreferrer"><strong>@umijs/fabric</strong><ExternalLinkIcon/></a>来规定三剑侠的规则了，使用方式如下所示：</p>
<p><strong>.eslintrc.js</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"@umijs/fabric/dist/eslint"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.prettierrc.js</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> fabric <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@umijs/fabric"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token operator">...</span>fabric<span class="token punctuation">.</span>prettier<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.stylelintrc.js</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> fabric <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@umijs/fabric"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token operator">...</span>fabric<span class="token punctuation">.</span>stylelint<span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在<code v-pre>package.json</code>的<code v-pre>script</code>上加上对应的执行命令即可：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="line"><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"tsc &amp;&amp; vite build"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"preview"</span><span class="token operator">:</span> <span class="token string">"vite preview"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"lint"</span><span class="token operator">:</span> <span class="token string">"npm run lint:js &amp;&amp; npm run lint:style &amp;&amp; npm run lint:prettier"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"lint:js"</span><span class="token operator">:</span> <span class="token string">"eslint --cache --ext .js,.jsx,.ts,.tsx ./src"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"lint:prettier"</span><span class="token operator">:</span> <span class="token string">"prettier --check \"src/**/*\" --end-of-line auto"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"lint:style"</span><span class="token operator">:</span> <span class="token string">"stylelint --fix 'src/**/*.{css,scss,less}' --cache"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样子就完成了<strong>代码扫描</strong>部分了。通过<code v-pre>yarn run lint</code>执行后的效果如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed18411c0d2c41108d62ab0fd1716779~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h4 id="自动化测试命令实现" tabindex="-1"><a class="header-anchor" href="#自动化测试命令实现"><span>自动化测试命令实现</span></a></h4>
<p>前端测试主要有<strong>单元测试（Unit Test）</strong>、<strong>集成测试（Integration Test）</strong>、<strong>UI 测试（UI Test）</strong>。由于项目里只有一个页面组件，且本章节的重点是实现<code v-pre>CI</code>而不是<strong>前端自动化测试</strong>，因此这里用<strong>单元测试</strong>来实现一下：</p>
<p>为了多写点测试用例给测试代码加点内容，我给页面对应组件<code v-pre>App.tsx</code>加了个<code v-pre>props</code>，代码如下所示：</p>
<p><strong>App.tsx</strong></p>
<div class="language-tsx line-numbers-mode" data-highlighter="prismjs" data-ext="tsx" data-title="tsx"><pre v-pre class="language-tsx"><code><span class="line"><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> <span class="token constant">FC</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> logo <span class="token keyword">from</span> <span class="token string">"./logo.svg"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"./App.css"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span></span>
<span class="line">  value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> App<span class="token operator">:</span> <span class="token constant">FC</span><span class="token operator">&lt;</span>Props<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>App<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>App-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>logo<span class="token punctuation">}</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>App-logo<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello Vite + React!!!!!!!!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">          </span><span class="token punctuation">{</span><span class="token comment">/*</span>
<span class="line">            测试代码中需要获取的DOM元素用role属性标记，这里的role属性只会在测试代码中用到，</span>
<span class="line">            这样子就可以避免代码因需求改动时，因DOM属性改变导致测试不通过。有利于TDD（测试驱动开发）开发的进行</span>
<span class="line">          */</span><span class="token punctuation">}</span><span class="token plain-text"></span>
<span class="line">          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span></span>
<span class="line">            <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span></span>
<span class="line">            <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span></span>
<span class="line">            <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">=></span> v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span></span>
<span class="line">          <span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">            count is: </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text"></span>
<span class="line">          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>props<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>value<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">></span></span><span class="token plain-text"></span>
<span class="line">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里采用<code v-pre>ts-jest</code>+<code v-pre>@testing-library</code>来编写测试代码（当然对于<code v-pre>React</code>还有别的选择，例如<code v-pre>ts-jest</code>+<code v-pre>enzyme</code>），测试代码如下所示：</p>
<p><strong>App.test.tsx</strong></p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@testing-library/react"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"props is avaliable"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token string">"123"</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 为了多写点测试用例，我给App组件加了个prop</span></span>
<span class="line">  <span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App value<span class="token operator">=</span><span class="token punctuation">{</span>value<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">"props"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveTextContent</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"click of button is avaliable"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">render</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>App value<span class="token operator">=</span><span class="token string">"123"</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveTextContent</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">count is: 1</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>jest.config.js</code>的配置比较复杂，可以从<a href="https://github.com/Hitotsubashi/cicd-study/blob/main/jest.config.js" title="https://github.com/Hitotsubashi/cicd-study/blob/main/jest.config.js" target="_blank" rel="noopener noreferrer">此处<ExternalLinkIcon/></a>查看。配置好后运行<code v-pre>yarn test</code>后控制台输出如下所示：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/916b1e12446b45f796f1cc376d635af1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h4 id="配置ci-workflow" tabindex="-1"><a class="header-anchor" href="#配置ci-workflow"><span>配置<strong>CI Workflow</strong></span></a></h4>
<p>在项目根目录里的<code v-pre>.github/workflows</code>文件夹上新建<code v-pre>ci.yml</code>，代码如下所示：</p>
<p><strong>ci.yml</strong></p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CI</span>
<span class="line"><span class="token comment"># Event设置为main分支的pull request事件，</span></span>
<span class="line"><span class="token comment"># 这里的main分支相当于master分支，github项目新建是把main设置为默认分支，我懒得改了所以就保持这样吧</span></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> main</span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 只需要定义一个job并命名为CI</span></span>
<span class="line">  <span class="token key atrule">CI</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 拉取项目代码</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repository</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token comment"># 给当前环境下载node</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"16.x"</span></span>
<span class="line">      <span class="token comment"># 检查缓存</span></span>
<span class="line">      <span class="token comment"># 如果key命中缓存则直接将缓存的文件还原到 path 目录，从而减少流水线运行时间</span></span>
<span class="line">      <span class="token comment"># 若 key 没命中缓存时，在当前Job成功完成时将自动创建一个新缓存</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache</span>
<span class="line">        <span class="token comment"># 缓存命中结果会存储在steps.[id].outputs.cache-hit里，该变量在继后的step中可读</span></span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>dependencies</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># 缓存文件目录的路径</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">            **/node_modules</span></span>
<span class="line">          <span class="token comment"># key中定义缓存标志位的生成方式。runner.OS指当前环境的系统。外加对yarn.lock内容生成哈希码作为key值，如果yarn.lock改变则代表依赖有变化。</span></span>
<span class="line">          <span class="token comment"># 这里用yarn.lock而不是package.json是因为package.json中还有version和description之类的描述项目但和依赖无关的属性</span></span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>runner.OS<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span>hashFiles('<span class="token important">**/yarn.lock')</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment"># 安装依赖</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Installing Dependencies</span>
<span class="line">        <span class="token comment"># 如果缓存标志位没命中，则执行该step。否则就跳过该step</span></span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.cache<span class="token punctuation">-</span>dependencies.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install</span>
<span class="line">      <span class="token comment"># 运行代码扫描</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Running Lint</span>
<span class="line">        <span class="token comment"># 通过前面章节定义的命令行执行代码扫描</span></span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn lint</span>
<span class="line">      <span class="token comment"># 运行自动化测试</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Running Test</span>
<span class="line">        <span class="token comment"># 通过前面章节定义的命令行执行自动化测试</span></span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn test</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于上面的<code v-pre>Cahe</code>步骤中，7 天内未被访问的任何缓存条目将会被删除。 可以存储的缓存数没有限制，但存储库中所有缓存的总大小限制为 10 GB。更多内容请看<a href="https://docs.github.com/cn/actions/using-workflows/caching-dependencies-to-speed-up-workflows" title="https://docs.github.com/cn/actions/using-workflows/caching-dependencies-to-speed-up-workflows" target="_blank" rel="noopener noreferrer">缓存依赖项以加快工作流程<ExternalLinkIcon/></a>。</p>
<hr>
<p>当创建<code v-pre>pull request</code>合并到主干时，<strong>CI Workflow</strong>触发运行，此时可以看到下面的情况：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da87fc3688394d11a1be7391721250e1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>当<strong>CI Workflow</strong>运行完成时，其效果如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f59410d312a4dc8aa517701f98a94b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>我们可以通过点击<code v-pre>Details</code>查看执行详细信息，如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a907606f73e4894a13fc72d4f9bb731~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>也可以点开每个<code v-pre>step</code>查看控制台输出信息：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69118f7b049d4ec0ba3746493be1a653~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>确认代码安全可靠后就可以点击<code v-pre>Merge pull request</code>来把新代码<strong>集成</strong>到<strong>主干</strong>上。从而基于<code v-pre>CI</code>完成一次<strong>bug 修复</strong>或<strong>新特性迭代</strong>。</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcecb9fa1df148f291d0ce40fe88a5f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>合并成功后，可以点击<code v-pre>Delete branch</code>以删除已合并的特性分支。</p>
<h3 id="补充" tabindex="-1"><a class="header-anchor" href="#补充"><span>补充</span></a></h3>
<p>部分<code v-pre>DevOps</code>平台中的<code v-pre>CI</code>流程比上面我们实现的流程里多一个阶段：<strong>编译并整理产物</strong>，即基于当前版本的代码打包构建产物。在这篇文章中我把这个阶段放在<code v-pre>CD</code>流程里。</p>
<h2 id="添加cd流程" tabindex="-1"><a class="header-anchor" href="#添加cd流程"><span>添加<code v-pre>CD</code>流程</span></a></h2>
<h3 id="cd的概念" tabindex="-1"><a class="header-anchor" href="#cd的概念"><span><code v-pre>CD</code>的概念</span></a></h3>
<p><code v-pre>CD</code>指的是 <strong>持续交付（Continuous delivery）</strong> 或者 <strong>持续部署（continuous deployment）</strong> 或者是两者的并集，我们借用<a href="https://aws.amazon.com/cn/devops/continuous-delivery/" title="https://aws.amazon.com/cn/devops/continuous-delivery/" target="_blank" rel="noopener noreferrer">AWS 中对持续交付说明<ExternalLinkIcon/></a>来说明下这两者的解释，如下：</p>
<blockquote>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/539a9328755340e69a1fa5d50abd3bb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"> 采用持续交付时，系统会构建并测试每一个代码变更，然后将其推送到非生产测试环境或临时环境中。生产部署前可能存在多个并行测试阶段。<strong>持续交付与持续部署之间的区别在于，需要手动批准才能更新到生产环境。对于持续部署，生产会在没有明确批准的情况下自动发生。</strong></p>
</blockquote>
<p>从上面的解释中可知其有三个步骤：</p>
<ol>
<li>生成制品</li>
<li>自动部署到测试环境以校验其稳定性</li>
<li>部署到生产环境（自动的是<strong>持续部署</strong>，手动的是<strong>持续交付</strong>）</li>
</ol>
<p>基于本文是以入门为主，且很多读者也就只有一个服务器来直接部署自己的小项目，因此本章节的<code v-pre>CD</code>实现中，我们以<strong>持续部署（continuous deployment）</strong> 且跳过上面第二步来实现，也就是生成制品后直接自动部署到生产环境。</p>
<hr>
<p>其实对于<strong>持续交付（Continuous delivery）</strong> 和 <strong>持续部署（continuous deployment）</strong> ，不同<code v-pre>DevOps</code>平台有不同的解释，而不同的企业和项目也有不同的实现方式。但本质上不会有太大区别，而我们也没必要去花时间咬文嚼字，借用<strong>Red Hat</strong>对 <a href="https://www.redhat.com/zh/topics/devops/what-is-ci-cd" title="https://www.redhat.com/zh/topics/devops/what-is-ci-cd" target="_blank" rel="noopener noreferrer"><strong>CICD</strong>说明<ExternalLinkIcon/></a> 里的一句话总结，如下：</p>
<blockquote>
<p>CI/CD 既可能仅指持续集成和持续交付构成的关联环节，也可以指持续集成、持续交付和持续部署这三项构成的关联环节。更为复杂的是，有时&quot;持续交付&quot;也包含了持续部署流程。</p>
<p>归根结底，我们没必要纠结于这些语义，您只需记得 CI/CD 其实就是一个流程（通常形象地表述为管道），用于实现应用开发中的高度持续自动化和持续监控。因案例而异，该术语的具体含义取决于 CI/CD 管道的自动化程度。许多企业最开始先添加 CI，然后逐步实现交付和部署的自动化（例如作为云原生应用的一部分）。</p>
</blockquote>
<h3 id="在项目中实现cd" tabindex="-1"><a class="header-anchor" href="#在项目中实现cd"><span>在项目中实现<code v-pre>CD</code></span></a></h3>
<p>这是我们在本章节要实现的<code v-pre>CD</code>机制的流程图：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34de1e458c6e4f5f9429ca6251272a77~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h4 id="先前准备" tabindex="-1"><a class="header-anchor" href="#先前准备"><span>先前准备</span></a></h4>
<p>在编写<strong>CD Workflow</strong>前，我们要准备以下东西：</p>
<ol>
<li>内置<code v-pre>nginx</code>的服务器一台：用于部署制品</li>
<li>服务器的密钥对：用于提供给流水线通过 ssh 免密登录到服务器进行部署</li>
<li><code v-pre>Github</code>里的<strong>Personal Access Token</strong>：用于提供给流水线免密登录<code v-pre>github</code>账号进行发布制品的操作</li>
<li>把步骤 2 和步骤 3 及其他关于机器的信息都放在对应仓库的<strong>Secret</strong>里</li>
</ol>
<p>下面对上述需要准备的东西逐一讲解：</p>
<ol>
<li>
<p><strong>准备一台服务器，在里面启动<code v-pre>nginx</code>服务。</strong></p>
<p>读者可以直接通过<code v-pre>apt</code>下载<code v-pre>nginx</code>到指定目录后启动。我个人习惯以<code v-pre>docker</code>启动容器以开启<code v-pre>nginx</code>服务。因此我直接通过下面的<code v-pre>docker-compose.yml</code>去创建启动<code v-pre>nginx</code>容器：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token comment"># 指定docker-compose解析的版本</span></span>
<span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3"</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">pure-nginx</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>latest</span>
<span class="line">    <span class="token comment"># 指定容器名</span></span>
<span class="line">    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> pure<span class="token punctuation">-</span>nginx</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token comment"># 指定持久卷，格式为 宿主机目录路径:容器目录路径</span></span>
<span class="line">    <span class="token comment"># CD Workflow会通过密钥登录该服务器，然后把生成的制品放在/data/www里，在此之后直接访问宿主机的ip即可访问到项目页面</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> /data/www<span class="token punctuation">:</span>/usr/share/nginx/html</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>创建服务器的密钥对：用于提供给流水线通过 ssh 免密登录到服务器进行部署</strong></p>
<p>每个平台都有创建密钥的教程，例如我的机器是腾讯云的，因此参考<a href="https://cloud.tencent.com/document/product/1207/44573" title="https://cloud.tencent.com/document/product/1207/44573" target="_blank" rel="noopener noreferrer">这篇文章<ExternalLinkIcon/></a>去创建密钥，密钥分公钥和私钥。公钥存放在服务器上，私钥我们自己下载保存。在配置<code v-pre>CD Workflow</code>的免密登录机器的<strong>步骤 step</strong>之前，大家也可以参考这篇文章<a href="https://cloud.tencent.com/document/product/1207/44643" title="https://cloud.tencent.com/document/product/1207/44643" target="_blank" rel="noopener noreferrer">使用密钥登录<ExternalLinkIcon/></a>，使用<code v-pre>VSCode</code>中的<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh" title="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh" target="_blank" rel="noopener noreferrer">Remote - SSH<ExternalLinkIcon/></a>通过配置私钥尝试是否可以免密登录机器，如果成功后就可以放心交给流水线去登录。</p>
</li>
<li>
<p><strong>创建<code v-pre>Github</code>里的 Personal Access Token ：用于提供给流水线免密登录<code v-pre>github</code>账号进行发布制品的操作</strong></p>
<p>参考<code v-pre>Github</code>官方文档<a href="https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" title="https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank" rel="noopener noreferrer">Creating a personal access token<ExternalLinkIcon/></a>创建<strong>Personal Access Token</strong>。</p>
<p>在上述文档里的第 8 步 <strong>Select scopes</strong> 时直接点击<code v-pre>repo</code>即可，其余的可不选，如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64beb416e2ef41beb21ea45994ff9dcc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
</li>
<li>
<p><strong>把步骤 2 和步骤 3 及其他关于机器的信息都放在<code v-pre>github</code>仓库的 Secret 里</strong></p>
<p><strong>Secret</strong>是一些相对机密重要的信息，这些信息在 <strong>Workflow</strong> 里面需要用到，但又不能以明文的形式直接写在文件里以免泄露。此时我们可以放在<strong>Secret</strong>里，在 <strong>Workflow</strong> 运行时这些<strong>Secret</strong>会以环境变量的形式注入到<code v-pre>Runner</code>里，此时可以以<code v-pre>${{ secrets.xxx }}</code>的形式读取。</p>
<p>在如图所示的页面下点击右上角的<code v-pre>New repository secret</code>去创建<code v-pre>secret</code>，在接下来要创建的<code v-pre>CD Workflow</code>中需要用到如图红字标记所示的四个<strong>Secret</strong>。</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc7dfad31cd2485490a1170dd9548701~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
</li>
</ol>
<h4 id="配置cd-workflow" tabindex="-1"><a class="header-anchor" href="#配置cd-workflow"><span>配置<strong>CD Workflow</strong></span></a></h4>
<p>这里我们把执行<code v-pre>CD</code>的<strong>Workflow</strong>（下称<strong>CD Workflow</strong>）的<strong>Event</strong>定义为<code v-pre>master</code>分支的<code v-pre>push</code>事件，因为<strong>CD Workflow</strong>的执行是在<code v-pre>Merge pull request</code>完成后的，而合并行为会触发<strong>主干</strong>的<code v-pre>push</code>事件。</p>
<p>接下来在<code v-pre>.github/workflows</code>里新建<code v-pre>cd.yml</code>来定义<strong>CD Workflow</strong>，代码如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CD</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 以主干的push事件作为触发条件</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> main</span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">CD</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 拉取代码</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repository</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token comment"># 下载Node</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"16.x"</span></span>
<span class="line">      <span class="token comment"># 添加缓存，逻辑和CI Workflow里的一样</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>dependencies</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">            **/node_modules</span></span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>runner.OS<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span>hashFiles('<span class="token important">**/yarn.lock')</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment"># 安装依赖。命中缓存则跳过此步</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Installing Dependencies</span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.cache<span class="token punctuation">-</span>dependencies.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install</span>
<span class="line">      <span class="token comment"># 从package.json里获取version属性的值</span></span>
<span class="line">      <span class="token comment"># 在CD Workflow中会给每个生成的制品打上标签，而标签取值于version值</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Read Version</span>
<span class="line">        <span class="token comment"># 读取出来的值会放在steps.[id].outputs.value供其他步骤step读取</span></span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> version</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> ashley<span class="token punctuation">-</span>taylor/read<span class="token punctuation">-</span>json<span class="token punctuation">-</span>property<span class="token punctuation">-</span>action@v1.0</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> ./package.json</span>
<span class="line">          <span class="token key atrule">property</span><span class="token punctuation">:</span> version</span>
<span class="line">      <span class="token comment"># 打包生成制品，且把制品压缩到assets.zip压缩包里</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Building</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          yarn build</span>
<span class="line">          zip -r assets ./dist/**</span></span>
<span class="line">      <span class="token comment"># 基于当前commit进行版本发布(Create a release)，tag_name是v前缀加上package.json的version值</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create GitHub Release</span>
<span class="line">        <span class="token comment"># 此步骤中，版本发布后会返回对应的url，以供下面上传制品的步骤中读取使用</span></span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> create_release</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/create<span class="token punctuation">-</span>release@v1</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># GITHUB_TOKEN是准备工作步骤三申请的Personal Access Token</span></span>
<span class="line">          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.PROJECT_ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">tag_name</span><span class="token punctuation">:</span> v$<span class="token punctuation">{</span><span class="token punctuation">{</span>steps.version.outputs.value<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">release_name</span><span class="token punctuation">:</span> v$<span class="token punctuation">{</span><span class="token punctuation">{</span>steps.version.outputs.value<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">draft</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">          <span class="token key atrule">prerelease</span><span class="token punctuation">:</span> <span class="token boolean important">false</span></span>
<span class="line">      <span class="token comment"># 把assets.zip上传到仓库对应的发布版本Release上</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Update Release Asset</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> upload<span class="token punctuation">-</span>release<span class="token punctuation">-</span>asset</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>release<span class="token punctuation">-</span>asset@v1</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.PROJECT_ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">upload_url</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.create_release.outputs.upload_url <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">asset_path</span><span class="token punctuation">:</span> ./assets.zip</span>
<span class="line">          <span class="token key atrule">asset_name</span><span class="token punctuation">:</span> assets.zip</span>
<span class="line">          <span class="token key atrule">asset_content_type</span><span class="token punctuation">:</span> application/zip</span>
<span class="line">      <span class="token comment"># 把制品上传到部署机器</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload to Deploy Server</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> easingthemes/ssh<span class="token punctuation">-</span>deploy@v2.0.7</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token comment"># SSH_PRIVATE_KEY为准备工作步骤三中生成密钥对里的私钥</span></span>
<span class="line">          <span class="token key atrule">SSH_PRIVATE_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DEPLOY_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token comment"># 指定当前目录中要上传的内容</span></span>
<span class="line">          <span class="token key atrule">SOURCE</span><span class="token punctuation">:</span> <span class="token string">"dist/"</span></span>
<span class="line">          <span class="token comment"># 指定上传到部署机器的哪个目录下</span></span>
<span class="line">          <span class="token key atrule">TARGET</span><span class="token punctuation">:</span> <span class="token string">"/data/www"</span></span>
<span class="line">          <span class="token comment"># 上传前指令，此处用于清空TARGET下的文件</span></span>
<span class="line">          <span class="token key atrule">ARGS</span><span class="token punctuation">:</span> <span class="token string">"-avzr --delete"</span></span>
<span class="line">          <span class="token comment"># REMOTE_HOST为机器的公网IP</span></span>
<span class="line">          <span class="token key atrule">REMOTE_HOST</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.REMOTE_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token comment"># REMOTE_USER为登录机器时用到账号名</span></span>
<span class="line">          <span class="token key atrule">REMOTE_USER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.REMOTE_USER<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样子就完成了<strong>CD Workflow</strong>的流程了，运行效果如下所示：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9aa0c1c9e3b48fba193017b9de0898f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>在<strong>CD Workflow</strong>运行完成后，可以输入自己机器的公网 IP 查看部署的项目。<strong>注意：每次提 pr 时要确保 package.json 中的 version 值有变化，不然 CD Workflow 会在 Create GitHub Release 的步骤里报已存在 Tag 的错误。</strong></p>
<p><strong>关于 CD Workflow 细节补充：</strong></p>
<ol>
<li>
<p><em>为什么要获取<code v-pre>package.json</code>中<code v-pre>version</code>值，有什么作用?</em></p>
<p><code v-pre>version</code>值在<strong>CD Workflow</strong>主要用于版本发布，此过程需要填写指定的<code v-pre>tag_name</code>。发布的版本如下所示：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b2f57ce89f64881be4635e41ce2a9f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>点进去后可以看到当前项目的所有版本，如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62b357bd98724867946a81b3a45ab151~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>我们也可以在通过<a href="https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph" title="https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph" target="_blank" rel="noopener noreferrer">VSCode GitGraph 插件<ExternalLinkIcon/></a>来看到自己发布的版本标签（commit 写的有点随便，不要介意），如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97aa18a6e64045ed9d1246bf5798db92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>在每次<strong>主干</strong>更新后进行版本发布不仅符合开源项目的更新流程，而且利于我们之后部署特定<strong>发布版本</strong>的制品（可看下面<strong>深入章节的回滚流程</strong>）。</p>
</li>
<li>
<p>为什么要有 <strong>Update Release Asset</strong> 这个步骤？</p>
<p>首先，把制品放在对应的<strong>发布版本</strong>上是很常见的开源行为，读者也可以把制品下载下来放到<code v-pre>nginx</code>直接查看页面效果。其次也是很重要的，是为了<strong>回滚（下面深入篇会写回滚机制的实现）<strong>的实现，回滚需要快速获取前一个</strong>发布版本</strong>的制品覆盖到部署机器上。因此需要我们把每个制品都存放在对应的<strong>发布版本</strong>以实现持久化。</p>
</li>
<li>
<p><em>为什么 <strong>Update Release Asset(上传制品)</strong> 阶段不使用<a href="https://github.com/actions/upload-artifact" title="https://github.com/actions/upload-artifact" target="_blank" rel="noopener noreferrer"><code v-pre>actions/upload-artifact</code><ExternalLinkIcon/></a>：</em></p>
<p>首先在<strong>Release</strong>中上传制品是很多开源项目中常见的操作，其次<code v-pre>actions/upload-artifact</code>中存在两个缺点：</p>
<ol>
<li>
<p>上传的制品只能供同一个<code v-pre>Workflow</code>的不同<code v-pre>Job</code>中使用。换言之，不同<code v-pre>Workflow</code>是不能使用这个制品的，这样子我们就不利于我们在不同的流程去调用这个制品。例如<strong>回滚（下面深入篇会写回滚机制的实现）</strong>，在当前部署机器上的项目存在问题时，我们可以通过回滚迅速把前一个稳定的版本的制品覆盖到部署机器上。</p>
</li>
<li>
<p>上传的制品最多只存在 90 天，不能做到持久化。</p>
</li>
</ol>
<p>因此这里没选择<code v-pre>actions/upload-artifact</code>。</p>
</li>
</ol>
<h2 id="添加状态徽章" tabindex="-1"><a class="header-anchor" href="#添加状态徽章"><span>添加状态徽章</span></a></h2>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c002a4f5f8946d7a77a2eac0721475f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>我们可以在项目的<code v-pre>README.md</code>中加了<code v-pre>CI</code>和<code v-pre>CD</code>两个状态徽章来代表这个项目已成功实现了<code v-pre>CI</code>和<code v-pre>CD</code>的流程，如上图所示。这两个状态徽章是根据你指定的<strong>Workflow</strong>的名称和最近一次运行的结果动态变化的。如果对应的流水线并没有运行记录，则效果如图上的<code v-pre>E2E-Test</code>状态徽章所示。</p>
<p>徽章可以直接以下面的格式来插入到自己的<code v-pre>README.md</code>上：</p>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre class="language-markdown"><code><span class="line"><span class="token url"><span class="token operator">!</span>[<span class="token content">example workflow</span>](<span class="token url">https://github.com/&lt;OWNER>/&lt;REPOSITORY>/actions/workflows/&lt;WORKFLOW_FILE>/badge.svg</span>)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>例如我的<code v-pre>CI</code>和<code v-pre>CD</code>徽章分别如下所示：</p>
<div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre v-pre class="language-markdown"><code><span class="line"><span class="token url"><span class="token operator">!</span>[<span class="token content">CI</span>](<span class="token url">https://github.com/Hitotsubashi/cicd-study/actions/workflows/ci.yml/badge.svg</span>)</span></span>
<span class="line"></span>
<span class="line"><span class="token url"><span class="token operator">!</span>[<span class="token content">CD</span>](<span class="token url">https://github.com/Hitotsubashi/cicd-study/actions/workflows/cd.yml/badge.svg</span>)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于更多有关工作流程状态徽章的可看官方文档<a href="https://docs.github.com/cn/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge" title="https://docs.github.com/cn/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge" target="_blank" rel="noopener noreferrer">添加工作流程状态徽章<ExternalLinkIcon/></a></p>
<h1 id="深入篇-完善流程" tabindex="-1"><a class="header-anchor" href="#深入篇-完善流程"><span>深入篇：完善流程</span></a></h1>
<h2 id="设置邮件通知" tabindex="-1"><a class="header-anchor" href="#设置邮件通知"><span>设置邮件通知</span></a></h2>
<p>如果想要流水线在运行结束后把运行结果发送通知到邮件上，不必在流水线里修改，直接点击自己的头像，依次进入 <strong>Settings &gt; Notifications</strong> 页面，如下所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baf0a9218a6e46a18e553dd8d620263e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>此页面滚到下面有<code v-pre>Actions</code>通知设置，此处如果勾选，则只会在 <strong>Workflow</strong> 运行失败后发送通知到邮箱，取消勾选则在是 <strong>Workflow</strong> 在运行结束后无论成功失败都会发送通知到邮箱：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d04dba7972de4d1eb774aab0c03caf22~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>发送的邮箱是当前绑定你登录的<code v-pre>github</code>账号的邮箱，当然也可以自己在 <strong>Settings &gt; Notifications</strong>添加新的邮箱如图所示：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8854460597774f80aa738d9c8945af87~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h2 id="添加回滚机制" tabindex="-1"><a class="header-anchor" href="#添加回滚机制"><span>添加回滚机制</span></a></h2>
<p>在项目发布后，如果发现当前项目存在重大<strong>bug</strong>时，一般操作就是手动回滚到上一个版本。因此需要新增一个用于<strong>回滚</strong>的<strong>workflow</strong>(下称<strong>Rollback Workflow</strong>)。</p>
<p>首先还是要确定<strong>Rollback Workflow</strong>的触发条件<strong>Event</strong>。这里我们选择<a href="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch" title="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch" target="_blank" rel="noopener noreferrer"><code v-pre>workflow_dispatch</code><ExternalLinkIcon/></a>。<code v-pre>workflow_dispatch</code>事件还能支持手动输入信息，然后把这个信息当作环境变量供整个<strong>Workflow</strong>读取。</p>
<p>为了先了解<code v-pre>workflow_dispatch</code>事件类型的效果，下面我截取<strong>Rollback Workflow</strong>的<code v-pre>on</code>部分的代码如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># inputs下面可以指定要手动输入的信息</span></span>
<span class="line">    <span class="token key atrule">inputs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 例如这里我指定了手动输入version信息</span></span>
<span class="line">      <span class="token key atrule">version</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 这是对该信息的描述</span></span>
<span class="line">        <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"choose a version to deploy"</span></span>
<span class="line">        <span class="token comment"># 指定必须填写</span></span>
<span class="line">        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在<code v-pre>Github</code>对应的<strong>Rollback Workflow</strong>页面中，点击<strong>Run workflow</strong>按钮后填写<code v-pre>version</code>后点击<strong>Run workflow</strong>就可以触发该流水线的执行：</p>
<p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a4fb27e8b5742129f43670142c6fd2e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>下面来看看整个<strong>Rollback Workflow</strong>的代码：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Rollback</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">inputs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 这里的version指的是我们要部署的哪个发布版本的制品</span></span>
<span class="line">      <span class="token comment"># 这里输入的信息会作为github.event.inputs.version供此Workflow下的job读取</span></span>
<span class="line">      <span class="token key atrule">version</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"choose a version to deploy"</span></span>
<span class="line">        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">Rollback</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 输出我们输入的version值</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Echo Version</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">VERSION</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.event.inputs.version <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          echo "Version: $VERSION"</span></span>
<span class="line">      <span class="token comment"># 获取对应发布版本的制品</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Download Artifact</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> dsaltares/fetch<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>release<span class="token punctuation">-</span>asset@master</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"tags/${{ github.event.inputs.version }}"</span></span>
<span class="line">          <span class="token comment"># 指定存放制品的压缩包</span></span>
<span class="line">          <span class="token key atrule">file</span><span class="token punctuation">:</span> <span class="token string">"assets.zip"</span></span>
<span class="line">          <span class="token comment"># 这里需要CD Workflow中准备工作里的Github Personal Access Token</span></span>
<span class="line">          <span class="token key atrule">token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment"># 下载压缩包后解压</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Unzip</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">          unzip assets.zip</span>
<span class="line">          ls -a ./dist</span></span>
<span class="line">      <span class="token comment"># 把制品放到部署机器上</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload to Deploy Server</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> easingthemes/ssh<span class="token punctuation">-</span>deploy@v2.0.7</span>
<span class="line">        <span class="token key atrule">env</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">SSH_PRIVATE_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DEPLOY_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">ARGS</span><span class="token punctuation">:</span> <span class="token string">"-avzr --delete"</span></span>
<span class="line">          <span class="token key atrule">SOURCE</span><span class="token punctuation">:</span> <span class="token string">"dist/"</span></span>
<span class="line">          <span class="token key atrule">REMOTE_HOST</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.REMOTE_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">REMOTE_USER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.REMOTE_USER<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">TARGET</span><span class="token punctuation">:</span> <span class="token string">"/data/www"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在触发<strong>Rollback Workflow</strong>后运行效果如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33e619c777ef46319934353298bd12ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>由于这里的项目比较小，因此整个<strong>回滚</strong>过程只需要 7 秒。</p>
<h2 id="添加端对端测试" tabindex="-1"><a class="header-anchor" href="#添加端对端测试"><span>添加端对端测试</span></a></h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h3>
<p><strong>端对端测试(E2E Test)<strong>指对部署在测试环境或正式环境的项目进行模拟真实用户操作的测试。一般会用如<code v-pre>puppeteer</code>这类能通过</strong>Devtools 协议</strong>控制浏览器的测试框架来实现。</p>
<p>我们在写前端测试的理想占比应如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03354a783dd645b1aae3397fc2db4aae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>因为<strong>端对端测试</strong>本质注定其需要投入的工作量比较多，因此，主要用于覆盖应用的核心特性。对于其余次要特性我们可以用<strong>集成测试</strong>和<strong>单元测试</strong>去覆盖。</p>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现"><span>代码实现</span></a></h3>
<p>下面我就通过<code v-pre>puppeteer</code>和<code v-pre>jest</code>结合去简单写一个针对<code v-pre>App.tsx</code>的端对端测试，首先新建一个用于<strong>端对端测试</strong>的<code v-pre>jest</code>配置文件<strong>jest.config.e2e.js</strong>，代码如下所示：</p>
<p><strong>jest.config.e2e.js</strong></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">preset</span><span class="token operator">:</span> <span class="token string">"jest-puppeteer"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">setupFilesAfterEnv</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"expect-puppeteer"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">testTimeout</span><span class="token operator">:</span> <span class="token number">100000</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">testMatch</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"&lt;rootDir>/src/e2e/**/*.{spec,test}.{js,jsx,ts,tsx}"</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">"ts-jest"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">tsConfig</span><span class="token operator">:</span> <span class="token string">"&lt;rootDir>/tsconfig.json"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后开始编写针对<code v-pre>App.tsx</code>的端对端测试代码：</p>
<p><strong>src/e2e/App.test.tsx</strong></p>
<div class="language-tsx line-numbers-mode" data-highlighter="prismjs" data-ext="tsx" data-title="tsx"><pre v-pre class="language-tsx"><code><span class="line"><span class="token keyword">const</span> <span class="token constant">DEFAULT_URL</span> <span class="token operator">=</span> <span class="token string">"http://localhost:3000/"</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">"Check Page"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// beforeAll函数会在所有测试用例运行前先运行</span></span>
<span class="line">  <span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 此处会设计了一个根据命令行参数来指定测试网址的逻辑</span></span>
<span class="line">    <span class="token comment">// 可通过npm run test:e2e -- --URL=*** 或 yarn test:e2e --URL=*** 来指定测试网址</span></span>
<span class="line">    <span class="token comment">// 否则默认测试网址为 DEFAULT_URL</span></span>
<span class="line">    <span class="token keyword">let</span> dynamicUrl <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span></span>
<span class="line">    process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">const</span> matches <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\-\-URL\=(.*)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>matches<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        dynamicUrl <span class="token operator">=</span> matches<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">goto</span><span class="token punctuation">(</span>dynamicUrl <span class="token operator">||</span> <span class="token constant">DEFAULT_URL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 测试点击按钮是否有效，一般端对端测试是用快照来对比判断是否成功的，这里为了方便直接获取DOM元素的content值来判断</span></span>
<span class="line">  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">"click button"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token string">'[role="button"]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token keyword">await</span> page<span class="token punctuation">.</span><span class="token function">$eval</span><span class="token punctuation">(</span><span class="token string">'[role="button"]'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">=></span> el<span class="token punctuation">.</span>textContent<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">await</span> <span class="token function">expect</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token string">"count is: 1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code v-pre>package.json</code>的<code v-pre>scripts</code>添加命令行：<code v-pre>&quot;test:e2e&quot;: &quot;jest --config=jest.config.e2e.js&quot;</code>后运行，控制台输出如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6439a9a1bad94b97bc8ee38cfc532472~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>关于<code v-pre>puppeteer</code>的更多用法请看<a href="https://pptr.dev/" title="https://pptr.dev/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。</p>
<p><strong>注意：运行前请确保测试网址上的应用可正常访问</strong></p>
<h3 id="添加流水线" tabindex="-1"><a class="header-anchor" href="#添加流水线"><span>添加流水线</span></a></h3>
<h4 id="实现端对端测试流水线" tabindex="-1"><a class="header-anchor" href="#实现端对端测试流水线"><span>实现端对端测试流水线</span></a></h4>
<p><strong>端对端测试</strong>是一项比较消耗资源的操作，因为每一个测试用例都需要开启一个<strong>无头浏览器（non-headless）<strong>来执行。所以一般会用一个单独的 <strong>Job</strong> 或者单独的 <strong>Workflow</strong> 来执行(这样可以开启一个单独的</strong>Runner</strong>，即进程来执行)。</p>
<p>首先要确定<strong>端对端测试</strong>的_运行时机_：</p>
<ol>
<li>在<strong>CD 部署</strong>或者<strong>回滚</strong>后都可能调用<strong>端对端测试</strong>来测试刚部署的项目的稳定性</li>
<li>有时候也要手动触发<strong>端对端测试</strong>的运行，而由于<strong>端对端测试</strong>是对部署在测试环境或生产环境的项目上进行测试的，因此前端、后端、数据库同样会影响<strong>端对端测试</strong>的运行结果，因此在<strong>后端迭代发布</strong>或者<strong>数据库变更</strong>后，也要手动触发运行<strong>端对端测试</strong>以保证项目的稳定性。</li>
</ol>
<p>针对此，我们把<strong>端对端测试</strong>设计为单独的流水线<strong>E2E Test Workflow</strong>，其触发条件<strong>Event</strong>设计为两个：</p>
<ul>
<li>
<p><code v-pre>workflow_call</code>：<a href="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_call" title="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_call" target="_blank" rel="noopener noreferrer"><code v-pre>workflow_call</code><ExternalLinkIcon/></a>可以使<strong>E2E Test Workflow</strong>成为可被调用的流水线，因此我们可以在<strong>CD Workflow</strong>和<strong>Rollback Workflow</strong>里调用用到。对应上面_运行时机的第 1 点_。</p>
</li>
<li>
<p><code v-pre>workflow_dispatch</code>：<a href="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch" title="https://docs.github.com/cn/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch" target="_blank" rel="noopener noreferrer"><code v-pre>workflow_dispatch</code><ExternalLinkIcon/></a>可以让我们随时手动触发<strong>E2E Test Workflow</strong>运行，对应_运行时机的第 2 点_。</p>
</li>
</ul>
<p>接下新建<code v-pre>e2e-test.yml</code>来编写<strong>E2E Test Workflow</strong>，代码如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> E2E<span class="token punctuation">-</span>Test</span>
<span class="line"><span class="token comment"># on设计为数组的模式，指定workflow_call 和 workflow_dispatch两种触发机制</span></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>workflow_call<span class="token punctuation">,</span> workflow_dispatch<span class="token punctuation">]</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">E2E-Test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 拉取代码</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repository</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2</span>
<span class="line">      <span class="token comment"># 下载Node</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">"16.x"</span></span>
<span class="line">      <span class="token comment"># 添加缓存</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache</span>
<span class="line">        <span class="token key atrule">id</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>dependencies</span>
<span class="line">        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string"></span>
<span class="line">            **/node_modules</span></span>
<span class="line">          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>runner.OS<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span>hashFiles('<span class="token important">**/yarn.lock')</span><span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment"># 安装依赖</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Installing Dependencies</span>
<span class="line">        <span class="token comment"># 在 if 条件下使用表达式时，可以省略表达式语法 (${{ }})，因为 GitHub 会自动将 if 条件作为表达式求值。</span></span>
<span class="line">        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.cache<span class="token punctuation">-</span>dependencies.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn install</span>
<span class="line">      <span class="token comment"># 运行端对端测试，指定测试网址为部署机器的公网IP</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Running E2E Test</span>
<span class="line">        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn test<span class="token punctuation">:</span>e2e <span class="token punctuation">-</span><span class="token punctuation">-</span>URL=http<span class="token punctuation">:</span>//$<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.REMOTE_HOST <span class="token punctuation">}</span><span class="token punctuation">}</span>/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动运行起来效果和<code v-pre>Rollback Workflow</code>的差不多，这里就不再重复展示了。</p>
<h4 id="在cd中调用端对端测试" tabindex="-1"><a class="header-anchor" href="#在cd中调用端对端测试"><span>在<code v-pre>CD</code>中调用端对端测试</span></a></h4>
<p>我们要在<strong>CD Workflow</strong>里调用<strong>E2E Test Workflow</strong>，因此需要在<strong>CD Workflow</strong>对应的配置文件<code v-pre>cd.yml</code>里添加代码，如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> CD</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token comment">#...代码没变，省略</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">CD</span><span class="token punctuation">:</span> <span class="token comment"># ...代码没变，省略</span></span>
<span class="line">  <span class="token comment"># 添加名为E2E-Test的Job</span></span>
<span class="line">  <span class="token key atrule">E2E-Test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 指明要调用的流水线所在的路径</span></span>
<span class="line">    <span class="token key atrule">uses</span><span class="token punctuation">:</span> ./.github/workflows/e2e<span class="token punctuation">-</span>test.yml</span>
<span class="line">    <span class="token comment"># 指定该Job在Job CD 执行完后执行，不然Job会并行执行</span></span>
<span class="line">    <span class="token key atrule">needs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>CD<span class="token punctuation">]</span></span>
<span class="line">    <span class="token comment"># 指定调用的流水线集成当前流水线的secret</span></span>
<span class="line">    <span class="token key atrule">secrets</span><span class="token punctuation">:</span> inherit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在触发<strong>CD Workflow</strong>后运行如下效果所示：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e099366efc148b6ae4723a1586dd19c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>同样的也可以点进去看每个步骤的控制台输出：</p>
<p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9656e63dfce4e07a8fff8c43954b1e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h4 id="在回滚中选择性调用端对端测试" tabindex="-1"><a class="header-anchor" href="#在回滚中选择性调用端对端测试"><span>在回滚中选择性调用端对端测试</span></a></h4>
<p><strong>回滚</strong>后可以根据需要选择是否进行<strong>端对端测试</strong>，因此我们在原有的手动输入基础上加一个勾选框决定是否运行<strong>端对端测试</strong>即可，其余的逻辑与<strong>CD Workflow</strong>的<strong>E2E-Test Job</strong>类似。我们对<strong>Rollback Workflow</strong>对应的配置文件<code v-pre>rollback.yml</code>如下所示：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre v-pre class="language-yaml"><code><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Rollback</span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">inputs</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token comment"># ...代码没变，省略</span></span>
<span class="line">      <span class="token comment"># 新增勾选框决定是否执行端对端测试</span></span>
<span class="line">      <span class="token key atrule">E2ETest</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"enable torun e2e test"</span></span>
<span class="line">        <span class="token comment"># 类型为boolean时，控件会以勾选框的形式呈现</span></span>
<span class="line">        <span class="token key atrule">type</span><span class="token punctuation">:</span> boolean</span>
<span class="line">        <span class="token comment"># 默认值设为true，代表默认勾选</span></span>
<span class="line">        <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">Rollback</span><span class="token punctuation">:</span> <span class="token comment"># ...代码没变，省略</span></span>
<span class="line">  <span class="token key atrule">E2E-Test</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">uses</span><span class="token punctuation">:</span> ./.github/workflows/e2e<span class="token punctuation">-</span>test.yml</span>
<span class="line">    <span class="token key atrule">needs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Rollback<span class="token punctuation">]</span></span>
<span class="line">    <span class="token comment"># 条件判断 E2ETest勾选框 是否被勾选，勾选则执行，没勾选则跳过</span></span>
<span class="line">    <span class="token key atrule">if</span><span class="token punctuation">:</span> github.event.inputs.E2ETest == true</span>
<span class="line">    <span class="token comment"># 指定调用的流水线集成当前流水线的secret</span></span>
<span class="line">    <span class="token key atrule">secrets</span><span class="token punctuation">:</span> inherit</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动执行时效果如下所示：</p>
<p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2308a4a1d04c1d8666255ad94a5529~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<p>如果把<code v-pre>E2E-Test</code>勾选框取消勾选后运行，效果如下所示：</p>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17b8a7e934fd470795b2713776947f2f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png"></p>
<h2 id="思考-完整的-cd-玩法-待补充" tabindex="-1"><a class="header-anchor" href="#思考-完整的-cd-玩法-待补充"><span>思考：完整的 CD 玩法（待补充）？</span></a></h2>
<p>前面的<strong>CD 章节</strong>中，考虑到入门以及大多数读者只有一台服务器，因此在设计步骤中跳过了测试环境的部署与测试，使其有点瑕疵。在之后我会继续更新这篇文章来补充这部分的章节。</p>
<h1 id="后记" tabindex="-1"><a class="header-anchor" href="#后记"><span>后记</span></a></h1>
<p>这篇文章写到这里就结束了，如果觉得有用可以点赞收藏，如果有疑问可以直接在评论留言，欢迎交流 👏👏👏 。</p>
</div></template>


