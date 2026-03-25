# IT-Tools 静态网站构建分析报告

## 项目概览

**项目名称**: IT-Tools  
**版本**: 2024.10.22-7ca5933  
**描述**: 为开发者提供的实用在线工具集合  
**仓库**: https://github.com/CorentinTh/it-tools  

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3.3.4 |
| 构建工具 | Vite 4.4.9 |
| 包管理器 | PNPM 9.11.0 |
| Node 版本 | 18.18.2 (LTS) |
| UI 库 | Naive UI |
| 路由 | Vue Router 4 (History 模式) |
| 状态管理 | Pinia |
| 国际化 | Vue I18n |
| CSS | UnoCSS |
| 类型系统 | TypeScript 5.2 |

## 项目结构

```
it-tools/
├── src/
│   ├── tools/           # 89 个独立工具 (每个工具一个目录)
│   ├── pages/           # 页面组件
│   ├── components/      # 公共组件
│   ├── layouts/         # 布局组件
│   ├── router.ts        # 路由配置 (SPA)
│   └── config.ts        # 应用配置
├── locales/             # 国际化文件
├── public/              # 静态资源
├── vite.config.ts       # Vite 配置
├── package.json         # 项目依赖
└── .nvmrc               # Node 版本要求
```

## 静态网站构建方案

### 方案一：标准 Vite 构建 (推荐)

**优点**:
- 官方支持，配置已就绪
- 开箱即用
- 支持 PWA

**步骤**:

```bash
# 1. 进入项目目录
cd it-tools

# 2. 安装 Node.js (使用 nvm)
nvm install 18.18.2
nvm use 18.18.2

# 3. 安装 PNPM
corepack enable
corepack prepare pnpm@9.11.0 --activate

# 4. 安装依赖
pnpm install

# 5. 构建静态网站
pnpm build

# 6. 构建产物位置
# 输出目录: it-tools/dist/
```

**构建命令详解** (`pnpm build`):
```bash
vue-tsc --noEmit && NODE_OPTIONS=--max_old_space_size=4096 vite build
```
- `vue-tsc --noEmit`: TypeScript 类型检查
- `NODE_OPTIONS=--max_old_space_size=4096`: 分配 4GB 内存
- `vite build`: 执行生产构建

### 方案二：使用 BASE_URL 环境变量

适用于部署到子路径 (如 `/tools/`):

```bash
BASE_URL=/tools/ pnpm build
```

### 方案三：Docker 构建

项目已提供 Dockerfile:

```bash
docker build -t it-tools .
docker run -p 8080:80 it-tools
```

## 部署配置

### Nginx 配置

项目提供了 `nginx.conf`，关键配置:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

这是因为使用了 Vue Router 的 History 模式，所有路由都需要 fallback 到 `index.html`。

### 静态托管平台配置

**Vercel** (`vercel.json`):
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## PWA 支持

项目集成了 `vite-plugin-pwa`，构建时会自动生成:
- `manifest.webmanifest` - PWA 清单
- Service Worker 文件 - 离线缓存支持
- 各种尺寸的图标

**PWA 特性**:
- 自动更新
- 离线访问
- 可安装到桌面

## 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `BASE_URL` | `/` | 应用基础路径 |
| `VITE_VERCEL_ENV` | `development` | 运行环境 |
| `VITE_TRACKER_ENABLED` | `false` | Plausible 分析追踪 |
| `VITE_PLAUSIBLE_DOMAIN` | - | 分析域名 |
| `VITE_SHOW_BANNER` | `false` | 显示横幅 |
| `VITE_SHOW_SPONSOR_BANNER` | `false` | 显示赞助横幅 |

## 构建产物

构建完成后，`dist/` 目录结构:

```
dist/
├── index.html              # 入口 HTML
├── assets/                 # JS/CSS 打包文件
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon-*.png           # 图标
├── manifest.webmanifest    # PWA 清单
└── sw.js                   # Service Worker
```

## 快速构建脚本

创建 `build.sh`:

```bash
#!/bin/bash
set -e

echo "🔧 Setting up environment..."

# 检查 Node 版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node 18+"
    exit 1
fi

cd it-tools

# 安装依赖
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# 构建
echo "🏗️ Building static site..."
pnpm build

echo "✅ Build complete! Output: it-tools/dist/"
```

## 注意事项

1. **内存要求**: 构建需要至少 4GB 内存 (通过 `NODE_OPTIONS` 配置)
2. **Node 版本**: 必须使用 Node 18.x LTS
3. **路由模式**: SPA 应用需要服务器配置 URL fallback
4. **包管理器**: 项目锁定使用 PNPM，不建议使用 npm/yarn
5. **构建时间**: 首次构建可能需要 2-5 分钟 (依赖安装 + 编译)

## 总结

IT-Tools 是一个成熟的 Vue 3 SPA 应用，构建流程非常标准:

- ✅ 使用 `pnpm build` 即可构建静态网站
- ✅ 构建产物在 `dist/` 目录
- ✅ 支持任意静态服务器/CDN 部署
- ✅ 已内置 PWA、Nginx、Vercel、Netlify 配置
- ✅ 支持自定义 BASE_URL 部署到子路径
