import{_ as e,c as a,o,a1 as i}from"./chunks/framework.CszIUXhs.js";const _=JSON.parse('{"title":"贡献指南","description":"","frontmatter":{},"headers":[],"relativePath":"zh/contributing/index.md","filePath":"zh/contributing/index.md"}'),l={name:"zh/contributing/index.md"},t=i('<h1 id="贡献指南" tabindex="-1">贡献指南 <a class="header-anchor" href="#贡献指南" aria-label="Permalink to &quot;贡献指南&quot;">​</a></h1><p>感谢你能够看到这里，本项目非常欢迎你的贡献！</p><h2 id="贡献方法" tabindex="-1">贡献方法 <a class="header-anchor" href="#贡献方法" aria-label="Permalink to &quot;贡献方法&quot;">​</a></h2><p>如果你有代码或文档想要贡献，需要先了解以下内容。</p><ol><li>你要贡献什么类型的代码？（新扩展、修复 Bug、安全问题、项目框架优化、文档）</li><li>如果你贡献了新文件或新片段，你的代码是否经过 <code>php-cs-fixer</code> 和 <code>phpstan</code> 的检查？</li><li>在贡献代码前是否充分阅读了 <a href="./../develop/">开发指南</a>？</li></ol><p>如果你可以回答以上问题，并已经对代码做出了修改，可以及时在项目 GitHub 仓库发起 Pull Request。待代码审查完毕后，可根据建议修改代码，或直接合并到主分支。</p><h2 id="贡献类型" tabindex="-1">贡献类型 <a class="header-anchor" href="#贡献类型" aria-label="Permalink to &quot;贡献类型&quot;">​</a></h2><p>本项目主要用途是编译静态链接的 PHP 二进制，基于 <code>symfony/console</code> 编写了命令行处理功能。在开发之前，如果你对它不够熟悉， 可以先查看 <a href="https://symfony.com/doc/current/components/console.html" target="_blank" rel="noreferrer">symfony/console 文档</a>。</p><h3 id="安全问题" tabindex="-1">安全问题 <a class="header-anchor" href="#安全问题" aria-label="Permalink to &quot;安全问题&quot;">​</a></h3><p>因为本项目基本上是属于本地运行的 PHP 项目，一般来说不会存在远程攻击行为。但如果你发现了此类问题，请<strong>不要</strong>在 GitHub 仓库提交 PR 或 Issue， 你需要通过 <a href="mailto:admin@zhamao.me" target="_blank" rel="noreferrer">邮件</a> 的方式联系项目维护者（crazywhalecc）。</p><h3 id="修复-bug" tabindex="-1">修复 Bug <a class="header-anchor" href="#修复-bug" aria-label="Permalink to &quot;修复 Bug&quot;">​</a></h3><p>修复 Bug 一般不涉及项目结构和框架的修改，所以如果你可以定位到错误代码并直接修复它，请直接提交 PR。</p><h3 id="新扩展" tabindex="-1">新扩展 <a class="header-anchor" href="#新扩展" aria-label="Permalink to &quot;新扩展&quot;">​</a></h3><p>对于添加一个新扩展来说，你需要先了解一些本项目的基本结构，以及如何根据现有的逻辑添加新扩展。在本页的下一章节将会详细介绍。 总的来说，你需要：</p><ol><li>评估扩展是否可以内联编译到 PHP 中。</li><li>评估扩展的依赖库（如果有）是否可以静态编译。</li><li>写出扩展的依赖库在不同平台编译命令。</li><li>验证扩展及其依赖库能否与现有扩展和依赖库兼容。</li><li>验证扩展在 <code>cli</code>、<code>micro</code>、<code>fpm</code>、<code>embed</code> 几种 SAPI 中均正常工作。</li><li>编写文档，加入你的扩展。</li></ol><h3 id="项目框架优化" tabindex="-1">项目框架优化 <a class="header-anchor" href="#项目框架优化" aria-label="Permalink to &quot;项目框架优化&quot;">​</a></h3><p>如果你已经熟悉 <code>symfony/console</code> 的工作原理，并同时要对项目的框架进行一些修改或优化，请先了解以下事情：</p><ol><li>加入扩展不属于项目框架优化，但如果你在加入新的扩展时发现不得不优化框架，则需先对框架本身进行修改，然后再加入扩展。</li><li>对于一些大规模逻辑修改（例如涉及 LibraryBase、Extension 对象等的修改）时，建议先提交 Issue 或 Draft PR 进行讨论方案。</li><li>项目早期为纯中文开发项目，代码中存在一部分中文的注释。国际化项目后你可以提交 PR 将这些注释翻译为英语。</li><li>请不要在代码中提交包含较多无用的代码片段，例如大量未被使用的变量、方法、类、重复写了很多次的代码。</li></ol>',18),r=[t];function n(c,d,s,h,p,u){return o(),a("div",null,r)}const f=e(l,[["render",n]]);export{_ as __pageData,f as default};
