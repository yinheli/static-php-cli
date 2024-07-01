import{_ as s,c as i,o as a,a1 as l}from"./chunks/framework.CszIUXhs.js";const g=JSON.parse('{"title":"系统编译工具","description":"","frontmatter":{},"headers":[],"relativePath":"zh/develop/system-build-tools.md","filePath":"zh/develop/system-build-tools.md"}'),n={name:"zh/develop/system-build-tools.md"},p=l(`<h1 id="系统编译工具" tabindex="-1">系统编译工具 <a class="header-anchor" href="#系统编译工具" aria-label="Permalink to &quot;系统编译工具&quot;">​</a></h1><p>static-php-cli 在构建静态 PHP 时使用了许多系统编译工具，这些工具主要包括：</p><ul><li><code>autoconf</code>: 用于生成 <code>configure</code> 脚本。</li><li><code>make</code>: 用于执行 <code>Makefile</code>。</li><li><code>cmake</code>: 用于执行 <code>CMakeLists.txt</code>。</li><li><code>pkg-config</code>: 用于查找依赖库的安装路径。</li><li><code>gcc</code>: 用于在 Linux 下编译 C/C++ 语言代码。</li><li><code>clang</code>: 用于在 macOS 下编译 C/C++ 语言代码。</li></ul><p>对于 Linux 和 macOS 操作系统，这些工具通常可以通过包管理安装，这部分在 doctor 模块中编写了。 理论上我们也可以通过编译和手动下载这些工具，但这样会增加编译的复杂度，所以我们不推荐这样做。</p><h2 id="linux-环境编译工具" tabindex="-1">Linux 环境编译工具 <a class="header-anchor" href="#linux-环境编译工具" aria-label="Permalink to &quot;Linux 环境编译工具&quot;">​</a></h2><p>对于 Linux 系统来说，不同发行版的编译工具安装方式不同。而且对于静态编译来说，某些发行版的包管理无法安装用于纯静态编译的库和工具， 所以对于 Linux 平台及其不同发行版，我们目前提供了多种编译环境的部署措施。</p><h3 id="glibc-环境" tabindex="-1">glibc 环境 <a class="header-anchor" href="#glibc-环境" aria-label="Permalink to &quot;glibc 环境&quot;">​</a></h3><p>glibc 环境指的是系统底层的 <code>libc</code> 库（即所有 C 语言编写的程序动态链接的 C 标准库）使用的是 <code>glibc</code>，这是大多数发行版的默认环境。 例如：Ubuntu、Debian、CentOS、RHEL、openSUSE、Arch Linux 等。</p><p>而 glibc 环境下，我们使用的包管理、编译器都是默认指向 glibc 的，glibc 不能被良好地静态链接。它不能被静态链接的原因之一是它的网络库 <code>nss</code> 无法静态编译。</p><p>对于 glibc 环境，在 2.0 RC8 及以后的 static-php-cli 及 spc 中，你可以选择两种方式来构建静态 PHP：</p><ol><li>使用 Docker 构建，这是最简单的方式，你可以使用 <code>bin/spc-alpine-docker</code> 来构建，它会在 Alpine Linux 环境下构建。</li><li>使用 <code>bin/spc doctor</code> 安装 musl-wrapper 和 musl-cross-make 套件，然后直接正常构建。（<a href="https://github.com/crazywhalecc/static-php-cli/blob/main/src/SPC/doctor/item/LinuxMuslCheck.php" target="_blank" rel="noreferrer">相关源码</a>）</li></ol><p>一般来说，这两种构建方式的构建结果是一致的，你可以根据实际需求选择。</p><p>在 doctor 模块中，static-php-cli 会先检测当前的 Linux 发行版。如果当前发行版是 glibc 环境，会提示需要安装 musl-wrapper 和 musl-cross-make 套件。</p><p>在 glibc 环境下安装 musl-wrapper 的过程如下：</p><ol><li>从 musl 官网下载特定版本的 <a href="https://musl.libc.org/releases/" target="_blank" rel="noreferrer">musl-wrapper 源码</a>。</li><li>使用从包管理安装的 <code>gcc</code> 编译 musl-wrapper 源码，生成 <code>musl-libc</code> 等库：<code>./configure --disable-gcc-wrapper &amp;&amp; make -j &amp;&amp; sudo make install</code>。</li><li>musl-wrapper 相关库将被安装在 <code>/usr/local/musl</code> 目录。</li></ol><p>在 glibc 环境下安装 musl-cross-make 的过程如下：</p><ol><li>从 dl.static-php.dev 下载预编译好的 <a href="https://dl.static-php.dev/static-php-cli/deps/musl-toolchain/" target="_blank" rel="noreferrer">musl-cross-make</a> 压缩包。</li><li>解压到 <code>/usr/local/musl</code> 目录。</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在 glibc 环境下，静态编译可以通过直接安装 musl-wrapper 来实现，但是 musl-wrapper 仅包含了 <code>musl-gcc</code>，而没有 <code>musl-g++</code>，这也就意味着无法编译 C++ 代码。 所以我们需要 musl-cross-make 来提供 <code>musl-g++</code>。</p><p>而 musl-cross-make 套件无法在本地直接编译的原因是它的编译环境要求比较高（需要 36GB 以上内存，Alpine Linux 下编译），所以我们提供了预编译好的二进制包，可用于所有 Linux 发行版。</p><p>同时，部分发行版的包管理提供了 musl-wrapper，但 musl-cross-make 需要匹配对应的 musl-wrapper 版本，所以我们不使用包管理安装 musl-wrapper。</p><p>对于如何编译 musl-cross-make，将在本章节内的 <strong>编译 musl-cross-make</strong> 小节中介绍。</p></div><h3 id="musl-环境" tabindex="-1">musl 环境 <a class="header-anchor" href="#musl-环境" aria-label="Permalink to &quot;musl 环境&quot;">​</a></h3><p>musl 环境指的是系统底层的 <code>libc</code> 库使用的是 <code>musl</code>，这是一种轻量级的 C 标准库，它的特点是可以被良好地静态链接。</p><p>对于目前流行的 Linux 发行版，Alpine Linux 使用的就是 musl 环境，所以 static-php-cli 在 Alpine Linux 下可以直接构建静态 PHP，仅需直接从包管理安装基础编译工具（如 gcc、cmake 等）即可。</p><p>对于其他发行版，如果你的发行版使用的是 musl 环境，那么你也可以在安装必要的编译工具后直接使用 static-php-cli 构建静态 PHP。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在 musl 环境下，static-php-cli 会自动跳过 musl-wrapper 和 musl-cross-make 的安装。</p></div><h3 id="docker-环境" tabindex="-1">Docker 环境 <a class="header-anchor" href="#docker-环境" aria-label="Permalink to &quot;Docker 环境&quot;">​</a></h3><p>Docker 环境指的是使用 Docker 容器来构建静态 PHP，你可以使用 <code>bin/spc-alpine-docker</code> 来构建。 执行这个命令前需要先安装 Docker，然后在项目根目录执行 <code>bin/spc-alpine-docker</code> 即可。</p><p>在执行 <code>bin/spc-alpine-docker</code> 后，static-php-cli 会自动下载 Alpine Linux 镜像，然后构建一个 <code>cwcc-spc-x86_64</code> 或 <code>cwcc-spc-aarch64</code> 的镜像。 然后一切的构建都在这个镜像内进行，相当于在 Alpine Linux 内编译。总的来说，Docker 环境就是 musl 环境。</p><h2 id="musl-cross-make-工具链编译" tabindex="-1">musl-cross-make 工具链编译 <a class="header-anchor" href="#musl-cross-make-工具链编译" aria-label="Permalink to &quot;musl-cross-make 工具链编译&quot;">​</a></h2><p>在 Linux 中，尽管你不需要手动编译 musl-cross-make 工具，但是如果你想了解它的编译过程，可以参考这里。 还有一个重要的原因就是，这个可能无法使用 CI、Actions 等自动化工具编译，因为现有的 CI 服务编译环境不满足 musl-cross-make 的编译要求，满足要求的配置价格太高。</p><p>musl-cross-make 的编译过程如下：</p><p>准备一个 Alpine Linux 环境（直接安装或使用 Docker 均可），编译的过程需要 36GB 以上内存，所以你需要在内存较大的机器上编译。如果没有这么多内存，可能会导致编译失败。</p><p>然后将以下内容写入 <code>config.mak</code> 文件内：</p><div class="language-makefile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT = -static --static</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FLAG = -g0 -Os -Wno-error</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ifneq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NATIVE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">COMMON_CONFIG += CC=&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HOST</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-gcc </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot; CXX=&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HOST</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-g++ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">COMMON_CONFIG += CC=&quot;gcc </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot; CXX=&quot;g++ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">endif</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">COMMON_CONFIG += CFLAGS=&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FLAG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot; CXXFLAGS=&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FLAG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot; LDFLAGS=&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">STAT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BINUTILS_CONFIG += --enable-gold=yes --enable-gprofng=no</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">GCC_CONFIG += --enable-static-pie --disable-cet --enable-default-pie  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#--enable-default-pie</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CONFIG_SUB_REV = 888c8e3d5f7b</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">GCC_VER = 13.2.0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BINUTILS_VER = 2.40</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MUSL_VER = 1.2.4</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">GMP_VER = 6.2.1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MPC_VER = 1.2.1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MPFR_VER = 4.2.0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">LINUX_VER = 6.1.36</span></span></code></pre></div><p>同时，你需要新建一个 <code>gcc-13.2.0.tar.xz.sha1</code> 文件，文件内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>5f95b6d042fb37d45c6cbebfc91decfbc4fb493c  gcc-13.2.0.tar.xz</span></span></code></pre></div><p>如果你使用的是 Docker 构建，新建一个 <code>Dockerfile</code> 文件，写入以下内容：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> alpine:edge</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> apk add --no-cache \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gcc g++ git make curl perl \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">rsync patch wget libtool \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">texinfo autoconf automake \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bison tar xz bzip2 zlib \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file binutils flex \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linux-headers libintl \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gettext gettext-dev icu-libs pkgconf \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pkgconfig icu-dev bash \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ccache libarchive-tools zip</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /opt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git clone https://git.zv.io/toolchains/musl-cross-make.git</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /opt/musl-cross-make</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config.mak /opt/musl-cross-make</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gcc-13.2.0.tar.xz.sha1 /opt/musl-cross-make/hashes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> make TARGET=x86_64-linux-musl -j || :</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sed -i </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;s/poison calloc/poison/g&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ./gcc-13.2.0/gcc/system.h</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> make TARGET=x86_64-linux-musl -j</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> make TARGET=x86_64-linux-musl install -j</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tar cvzf x86_64-musl-toolchain.tgz output/*</span></span></code></pre></div><p>如果你使用的是非 Docker 环境的 Alpine Linux，可以直接执行 Dockerfile 中的命令，例如：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-cache</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gcc </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">g++</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> perl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">rsync </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">patch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libtool</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">texinfo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">autoconf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> automake</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bison </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bzip2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">binutils</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linux-headers </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">libintl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gettext </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">gettext-dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> icu-libs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pkgconf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pkgconfig </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">icu-dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ccache </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">libarchive-tools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zip</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://git.zv.io/toolchains/musl-cross-make.git</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 将 config.mak 拷贝到 musl-cross-make 的工作目录内，你需要将 /path/to/config.mak 替换为你的 config.mak 文件路径</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/config.mak</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> musl-cross-make/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /path/to/gcc-13.2.0.tar.xz.sha1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> musl-cross-make/hashes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TARGET=x86_64-linux-musl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;s/poison calloc/poison/g&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./gcc-13.2.0/gcc/system.h</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TARGET=x86_64-linux-musl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> TARGET=x86_64-linux-musl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cvzf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> x86_64-musl-toolchain.tgz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> output/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>以上所有脚本都适用于 x86_64 架构的 Linux。如果你需要构建 ARM 环境的 musl-cross-make，只需要将上方所有 <code>x86_64</code> 替换为 <code>aarch64</code> 即可。</p></div><p>这个编译过程可能会因为内存不足、网络问题等原因导致编译失败，你可以多尝试几次，或者使用更大内存的机器来编译。 如果遇到了问题，或者你有更好的改进方案，可以在 <a href="https://github.com/crazywhalecc/static-php-cli-hosted/issues/1" target="_blank" rel="noreferrer">讨论</a> 中提出。</p><h2 id="macos-环境编译工具" tabindex="-1">macOS 环境编译工具 <a class="header-anchor" href="#macos-环境编译工具" aria-label="Permalink to &quot;macOS 环境编译工具&quot;">​</a></h2><p>对于 macOS 系统来说，我们使用的编译工具主要是 <code>clang</code>，它是 macOS 系统默认的编译器，同时也是 Xcode 的编译器。</p><p>在 macOS 下编译，主要依赖于 Xcode 或 Xcode Command Line Tools，你可以在 App Store 下载 Xcode，或者在终端执行 <code>xcode-select --install</code> 来安装 Xcode Command Line Tools。</p><p>此外，在 <code>doctor</code> 环境检查模块中，static-php-cli 会检查 macOS 系统是否安装了 Homebrew、编译工具等，如果没有，会提示你安装，这里不再赘述。</p><h2 id="freebsd-环境编译工具" tabindex="-1">FreeBSD 环境编译工具 <a class="header-anchor" href="#freebsd-环境编译工具" aria-label="Permalink to &quot;FreeBSD 环境编译工具&quot;">​</a></h2><p>FreeBSD 也是 Unix 系统，它的编译工具和 macOS 类似，你可以直接使用包管理 <code>pkg</code> 安装 <code>clang</code> 等编译工具，通过 <code>doctor</code> 命令。</p><h2 id="pkg-config-编译" tabindex="-1">pkg-config 编译 <a class="header-anchor" href="#pkg-config-编译" aria-label="Permalink to &quot;pkg-config 编译&quot;">​</a></h2><p>如果你在使用 static-php-cli 构建静态 PHP 时仔细观察编译的日志，你会发现无论编译什么，都会先编译 <code>pkg-config</code>，这是因为 <code>pkg-config</code> 是一个用于查找依赖库的工具。 在早期的 static-php-cli 版本中，我们直接使用了包管理安装的 <code>pkg-config</code> 工具，但是这样会导致一些问题，例如：</p><ul><li>即使指定了 <code>PKG_CONFIG_PATH</code>，<code>pkg-config</code> 也会尝试从系统路径中查找依赖包。</li><li>由于 <code>pkg-config</code> 会从系统路径中查找依赖包，所以如果系统中存在同名的依赖包，可能会导致编译失败。</li></ul><p>为了避免以上问题，我们将 <code>pkg-config</code> 编译到用户态的 <code>buildroot/bin</code> 内并使用，使用了 <code>--without-sysroot</code> 等参数来避免从系统路径中查找依赖包。</p>`,50),e=[p];function h(t,k,c,d,o,r){return a(),i("div",null,e)}const F=s(n,[["render",h]]);export{g as __pageData,F as default};
