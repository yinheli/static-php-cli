import{_ as e,c as i,o as t,a1 as o}from"./chunks/framework.CszIUXhs.js";const f=JSON.parse('{"title":"Modifications to PHP source code","description":"","frontmatter":{},"headers":[],"relativePath":"en/develop/php-src-changes.md","filePath":"en/develop/php-src-changes.md"}'),a={name:"en/develop/php-src-changes.md"},s=o('<h1 id="modifications-to-php-source-code" tabindex="-1">Modifications to PHP source code <a class="header-anchor" href="#modifications-to-php-source-code" aria-label="Permalink to &quot;Modifications to PHP source code&quot;">​</a></h1><p>During the static compilation process, static-php-cli made some modifications to the PHP source code in order to achieve good compatibility, performance, and security. The following is a description of the current modifications to the PHP source code.</p><h2 id="micro-related-patches" tabindex="-1">Micro related patches <a class="header-anchor" href="#micro-related-patches" aria-label="Permalink to &quot;Micro related patches&quot;">​</a></h2><p>Based on the patches provided by the phpmicro project, static-php-cli has made some modifications to the PHP source code to meet the needs of static compilation. The patches currently used by static-php-cli during compilation in the <a href="https://github.com/easysoft/phpmicro/tree/master/patches" target="_blank" rel="noreferrer">patch list</a> are:</p><ul><li>static_opcache</li><li>static_extensions_win32</li><li>cli_checks</li><li>disable_huge_page</li><li>vcruntime140</li><li>win32</li><li>zend_stream</li><li>cli_static</li><li>macos_iconv</li><li>phar</li></ul><h2 id="php-8-1-libxml-patch" tabindex="-1">PHP &lt;= 8.1 libxml patch <a class="header-anchor" href="#php-8-1-libxml-patch" aria-label="Permalink to &quot;PHP &lt;= 8.1 libxml patch&quot;">​</a></h2><p>Because PHP only provides security updates for 8.1 and stops updating older versions, static-php-cli applies the libxml compilation patch that has been applied in newer versions of PHP to PHP 8.1 and below.</p><h2 id="gd-extension-windows-patch" tabindex="-1">gd extension Windows patch <a class="header-anchor" href="#gd-extension-windows-patch" aria-label="Permalink to &quot;gd extension Windows patch&quot;">​</a></h2><p>Compiling the gd extension under Windows requires major changes to the <code>config.w32</code> file. static-php-cli has made some changes to the gd extension to make it easier to compile under Windows.</p><h2 id="yaml-extension-windows-patch" tabindex="-1">YAML extension Windows patch <a class="header-anchor" href="#yaml-extension-windows-patch" aria-label="Permalink to &quot;YAML extension Windows patch&quot;">​</a></h2><p>YAML extension needs to modify the <code>config.w32</code> file to compile under Windows. static-php-cli has made some modifications to the YAML extension to make it easier to compile under Windows.</p><h2 id="static-php-cli-version-information-insertion" tabindex="-1">static-php-cli version information insertion <a class="header-anchor" href="#static-php-cli-version-information-insertion" aria-label="Permalink to &quot;static-php-cli version information insertion&quot;">​</a></h2><p>When compiling, static-php-cli will insert the static-php-cli version information into the PHP version information for easy identification.</p><h2 id="add-option-to-hardcode-ini" tabindex="-1">Add option to hardcode INI <a class="header-anchor" href="#add-option-to-hardcode-ini" aria-label="Permalink to &quot;Add option to hardcode INI&quot;">​</a></h2><p>When using the <code>-I</code> parameter to hardcode INI into static PHP functionality, static-php-cli will modify the PHP source code to insert the hardcoded content.</p><h2 id="linux-system-repair-patch" tabindex="-1">Linux system repair patch <a class="header-anchor" href="#linux-system-repair-patch" aria-label="Permalink to &quot;Linux system repair patch&quot;">​</a></h2><p>Some compilation environments may lack some system header files or libraries. static-php-cli will automatically fix these problems during compilation, such as:</p><ul><li>HAVE_STRLCAT missing problem</li><li>HAVE_STRLCPY missing problem</li></ul><h2 id="fiber-issue-fix-patch-for-windows" tabindex="-1">Fiber issue fix patch for Windows <a class="header-anchor" href="#fiber-issue-fix-patch-for-windows" aria-label="Permalink to &quot;Fiber issue fix patch for Windows&quot;">​</a></h2><p>When compiling PHP on Windows, there will be some issues with the Fiber extension. static-php-cli will automatically fix these issues during compilation (modify <code>config.w32</code> in php-src).</p>',20),n=[s];function c(r,h,l,p,d,m){return t(),i("div",null,n)}const P=e(a,[["render",c]]);export{f as __pageData,P as default};
