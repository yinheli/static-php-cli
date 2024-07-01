import{_ as t,c as e,o,a1 as a}from"./chunks/framework.CszIUXhs.js";const b=JSON.parse('{"title":"Action 构建","description":"","frontmatter":{},"headers":[],"relativePath":"zh/guide/action-build.md","filePath":"zh/guide/action-build.md"}'),i={name:"zh/guide/action-build.md"},c=a('<h1 id="action-构建" tabindex="-1">Action 构建 <a class="header-anchor" href="#action-构建" aria-label="Permalink to &quot;Action 构建&quot;">​</a></h1><p>Action 构建指的是直接使用 GitHub Action 进行编译。</p><p>如果你不想自行编译，可以从本项目现有的 Action 下载 Artifact，也可以从自托管的服务器下载：<a href="https://dl.static-php.dev/static-php-cli/common/" target="_blank" rel="noreferrer">进入</a></p><blockquote><p>自托管的二进制也是由 Action 构建而来，<a href="https://github.com/static-php/static-php-cli-hosted" target="_blank" rel="noreferrer">项目仓库地址</a>。</p></blockquote><h2 id="构建方法" tabindex="-1">构建方法 <a class="header-anchor" href="#构建方法" aria-label="Permalink to &quot;构建方法&quot;">​</a></h2><p>使用 GitHub Action 可以方便地构建一个静态编译的 PHP 和 phpmicro，同时可以自行定义要编译的扩展。</p><ol><li>Fork 本项目。</li><li>进入项目的 Actions，选择 CI 开头的 Workflow（根据你需要的操作系统选择）。</li><li>选择 <code>Run workflow</code>，填入你要编译的 PHP 版本、目标类型、扩展列表。（扩展列表使用英文逗号分割，例如 <code>bcmath,curl,mbstring</code>）</li><li>等待大约一段时间后，进入对应的任务中，获取 <code>Artifacts</code>。</li></ol><p>如果你选择了 <code>debug</code>，则会在构建时输出所有日志，包括编译的日志，以供排查错误。</p><blockquote><p>如果你需要在其他环境构建，可以使用 <a href="./manual-build.html">手动构建</a>。</p></blockquote><h2 id="扩展选择" tabindex="-1">扩展选择 <a class="header-anchor" href="#扩展选择" aria-label="Permalink to &quot;扩展选择&quot;">​</a></h2><p>你可以到 <a href="./extensions.html">扩展列表</a> 中查看目前你需要的扩展是否均支持， 然后到 <a href="./cli-generator.html">在线命令生成</a> 中选择你需要编译的扩展，复制扩展字符串到 Action 的 <code>extensions</code> 中，编译即可。</p>',11),r=[c];function n(l,d,h,s,p,u){return o(),e("div",null,r)}const f=t(i,[["render",n]]);export{b as __pageData,f as default};
