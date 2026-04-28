# 部署指南

本项目可以部署到多个平台。以下是具体步骤。

## 1. 推送到 GitHub

### 首次推送
```bash
# 在 GitHub 创建新仓库（不初始化任何文件）

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/caichong-web.git

# 重命名分支为 main（可选）
git branch -M main

# 推送到 GitHub
git push -u origin master  # 或 main
```

### 后续推送
```bash
git push
```

## 2. 部署到 Vercel（推荐）

最简单的方式 - 自动构建和部署。

### 步骤
1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账户登录
3. 点击 "New Project"
4. 选择你的 `caichong-web` 仓库
5. Vercel 会自动检测 React + Vite 项目
6. 点击 "Deploy"
7. 完成！访问 `https://your-project.vercel.app`

### 自动部署
- 每次推送到 GitHub 的 `master`/`main` 分支时，Vercel 会自动构建和部署

## 3. 部署到 GitHub Pages

### 步骤

#### 3.1 修改 vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/caichong-web/',  // 替换为你的仓库名
})
```

#### 3.2 修改 package.json
添加部署脚本：
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

#### 3.3 安装 gh-pages
```bash
npm install --save-dev gh-pages
```

#### 3.4 部署
```bash
npm run deploy
```

#### 3.5 配置 GitHub Pages
1. 进入仓库的 Settings → Pages
2. 选择 "Deploy from a branch"
3. 选择 `gh-pages` 分支
4. 点击 Save
5. 访问 `https://YOUR_USERNAME.github.io/caichong-web`

## 4. 部署到 Netlify

### 步骤
1. 访问 [netlify.com](https://netlify.com)
2. 用 GitHub 登录
3. 点击 "New site from Git"
4. 选择 `caichong-web` 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"
7. 完成！获得免费域名

## 5. 本地构建测试

在部署前测试构建：

```bash
npm run build
npm run preview
# 访问 http://localhost:4173/
```

## 环境变量

目前项目无需环境变量。如需添加：

### 创建 .env 文件
```
VITE_API_URL=http://localhost:3000
```

### 在代码中使用
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 性能优化建议

### 1. 启用 SWG（Service Worker）
```bash
npm install -D workbox-window
```

### 2. 图片优化
使用 WebP 格式和响应式图片

### 3. 代码分割
React Router 已支持自动代码分割

### 4. 构建分析
```bash
npm install -D vite-plugin-visualizer
```

## 故障排除

### 路由问题
如果 SPA 路由在生产环境不工作，配置服务器重定向所有请求到 index.html：

**Vercel 自动处理**

**GitHub Pages 需要 404.html**：
```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <script>
      var segments = window.location.pathname.split('/');
      sessionStorage.redirect = segments.slice(0, segments.length - 1).join('/');
    </script>
  </head>
  <body></body>
</html>
```

### 样式未加载
检查 `vite.config.ts` 中的 `base` 配置是否正确

## 监控和分析

推荐添加：

- [Vercel Analytics](https://vercel.com/analytics) - 自动集成
- [Sentry](https://sentry.io) - 错误追踪
- [Google Analytics](https://analytics.google.com) - 流量分析

## 持续集成 (CI/CD)

### GitHub Actions 示例
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
```

## 常见问题

**Q: 选择哪个部署平台？**
A: Vercel 最简单且免费，推荐首选。

**Q: 如何配置自定义域名？**
A: 在平台的 Domain 设置中添加自定义域名，然后配置 DNS 记录。

**Q: 如何更新已部署的网站？**
A: 推送新代码到 GitHub，平台会自动重新构建和部署。
