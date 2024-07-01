import{_ as e,c as t,o,a1 as i}from"./chunks/framework.CszIUXhs.js";const b=JSON.parse('{"title":"Guide","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/index.md","filePath":"en/guide/index.md"}'),n={name:"en/guide/index.md"},r=i('<h1 id="guide" tabindex="-1">Guide <a class="header-anchor" href="#guide" aria-label="Permalink to &quot;Guide&quot;">​</a></h1><p>Static php cli is a tool used to build statically compiled PHP binaries, currently supporting Linux and macOS systems.</p><p>In the guide section, you will learn how to use static php cli to build standalone PHP programs.</p><ul><li><a href="./action-build.html">GitHub Action Build</a></li><li><a href="./manual-build.html">Manual Build</a></li><li><a href="./extensions.html">Supported Extensions</a></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you are a native English speaker, some corrections to the documentation are welcome.</p></div><h2 id="compilation-environment" tabindex="-1">Compilation Environment <a class="header-anchor" href="#compilation-environment" aria-label="Permalink to &quot;Compilation Environment&quot;">​</a></h2><p>The following is the architecture support situation, where ⚙️ represents support for GitHub Action build, 💻 represents support for local manual build, and empty represents temporarily not supported.</p><table tabindex="0"><thead><tr><th></th><th>x86_64</th><th>aarch64</th></tr></thead><tbody><tr><td>macOS</td><td>⚙️ 💻</td><td>⚙️ 💻</td></tr><tr><td>Linux</td><td>⚙️ 💻</td><td>⚙️ 💻</td></tr><tr><td>Windows</td><td>⚙️ 💻</td><td></td></tr><tr><td>FreeBSD</td><td>💻</td><td>💻</td></tr></tbody></table><p>Among them, Linux is currently only tested on Ubuntu, Debian, and Alpine distributions, and other distributions have not been tested, which cannot guarantee successful compilation. For untested distributions, local compilation can be done using methods such as Docker to avoid environmental issues.</p><p>There are two architectures for macOS: <code>x86_64</code> and <code>Arm</code>, but binaries compiled on one architecture cannot be directly used on the other architecture. Rosetta 2 cannot guarantee that programs compiled with <code>Arm</code> architecture can fully run on <code>x86_64</code> environment.</p><p>Windows currently only supports the x86_64 architecture, and does not support 32-bit x86 or arm64 architecture.</p><h2 id="supported-php-version" tabindex="-1">Supported PHP Version <a class="header-anchor" href="#supported-php-version" aria-label="Permalink to &quot;Supported PHP Version&quot;">​</a></h2><p>Currently, static php cli supports PHP versions 8.0 to 8.3, and theoretically supports PHP 7.4 and earlier versions. Simply select the earlier version when downloading. However, due to some extensions and special components that have stopped supporting earlier versions of PHP, static-php-cli will not explicitly support earlier versions. We recommend that you compile the latest PHP version possible for a better experience.</p>',13),a=[r];function s(d,l,c,p,u,h){return o(),t("div",null,a)}const _=e(n,[["render",s]]);export{b as __pageData,_ as default};
