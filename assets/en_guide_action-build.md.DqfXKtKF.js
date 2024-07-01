import{_ as e,c as t,o,a1 as i}from"./chunks/framework.CszIUXhs.js";const b=JSON.parse('{"title":"GitHub Action Build","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/action-build.md","filePath":"en/guide/action-build.md"}'),n={name:"en/guide/action-build.md"},a=i('<h1 id="github-action-build" tabindex="-1">GitHub Action Build <a class="header-anchor" href="#github-action-build" aria-label="Permalink to &quot;GitHub Action Build&quot;">​</a></h1><p>Action Build refers to compiling directly using GitHub Action.</p><p>If you don&#39;t want to compile it yourself, you can download the artifact from the existing Action in this project, or you can download it from a self-hosted server：<a href="https://dl.static-php.dev/static-php-cli/common/" target="_blank" rel="noreferrer">Enter</a>.</p><blockquote><p>Self-hosted binaries are also built from Actions: <a href="https://github.com/static-php/static-php-cli-hosted" target="_blank" rel="noreferrer">repo</a>. The extensions included are: bcmath,bz2,calendar,ctype,curl,dom,exif,fileinfo,filter,ftp,gd,gmp,iconv,xml,mbstring,mbregex,mysqlnd,openssl, pcntl,pdo,pdo_mysql,pdo_sqlite,phar,posix,redis,session,simplexml,soap,sockets,sqlite3,tokenizer,xmlwriter,xmlreader,zlib,zip</p></blockquote><h2 id="build-guide" tabindex="-1">Build Guide <a class="header-anchor" href="#build-guide" aria-label="Permalink to &quot;Build Guide&quot;">​</a></h2><p>Using GitHub Action makes it easy to build a statically compiled PHP and phpmicro, while also defining the extensions to compile.</p><ol><li>Fork project.</li><li>Go to the Actions of the project and select <code>CI</code>.</li><li>Select <code>Run workflow</code>, fill in the PHP version you want to compile, the target type, and the list of extensions. (extensions comma separated, e.g. <code>bcmath,curl,mbstring</code>)</li><li>After waiting for about a period of time, enter the corresponding task and get <code>Artifacts</code>.</li></ol><p>If you enable <code>debug</code>, all logs will be output at build time, including compiled logs, for troubleshooting.</p><blockquote><p>If you need to build in other environments, you can use <a href="./manual-build.html">manual build</a>.</p></blockquote><h2 id="extensions" tabindex="-1">Extensions <a class="header-anchor" href="#extensions" aria-label="Permalink to &quot;Extensions&quot;">​</a></h2><p>You can go to <a href="./extensions.html">extensions</a> check here to see if all the extensions you need currently support. and then go to <a href="./cli-generator.html">command generator</a> select the extension you need to compile, copy the extensions string to <code>extensions</code> option.</p>',11),l=[a];function s(r,c,d,u,p,h){return o(),t("div",null,l)}const f=e(n,[["render",s]]);export{b as __pageData,f as default};
