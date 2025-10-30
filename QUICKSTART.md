# 快速开始指南

## 🚀 5 分钟快速部署到 Vercel（推荐）

### 1. 准备工作

- 拥有 GitHub 账号
- 拥有 Vercel 账号（免费，使用 GitHub 登录）

### 2. 部署步骤

#### 方法 A: 通过 Vercel Dashboard（最简单）

1. **将项目推送到 GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **在 Vercel 上导入项目**

   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择您的 GitHub 仓库
   - Vercel 会自动检测到 `vercel.json` 配置
   - 点击 "Deploy"

3. **完成！**
   - 等待部署完成（通常 1-2 分钟）
   - 获得一个免费的 HTTPS 域名
   - 前端和后端都已自动部署

#### 方法 B: 通过 Vercel CLI

1. **安装 Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   vercel
   ```
4. **按照提示完成部署**

   - 选择项目名称
   - 选择团队（个人账号选择个人）
   - 确认配置

5. **生产环境部署**
   ```bash
   vercel --prod
   ```

## 💻 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm start
```

或使用开发模式（支持热重载）:

```bash
npm run dev
```

### 3. 访问应用

在浏览器中打开：

```
http://localhost:3000
```

## 🔧 配置说明

### 切换数据源

在 `index.html` 中找到以下配置：

```javascript
// 是否优先使用自己的后端
const USE_OWN_BACKEND = true; // true: 使用自己的后端, false: 使用第三方代理

// 自己的后端API地址
const BACKEND_API_URL = "/api/rss"; // 相对路径或绝对路径
```

**场景 1: 部署到 Vercel 等平台（推荐）**

```javascript
const USE_OWN_BACKEND = true;
const BACKEND_API_URL = "/api/rss"; // 使用相对路径
```

**场景 2: 只使用前端 + 第三方代理**

```javascript
const USE_OWN_BACKEND = false;
const BACKEND_API_URL = "/api/rss";
```

**场景 3: 前端和后端分开部署**

```javascript
const USE_OWN_BACKEND = true;
const BACKEND_API_URL = "https://your-backend.com/api/rss"; // 使用绝对路径
```

## 🌐 其他部署平台

### Railway

1. 访问 [railway.app](https://railway.app)
2. 连接 GitHub 仓库
3. 选择项目
4. Railway 会自动检测 Node.js 项目
5. 部署完成

### Render

1. 访问 [render.com](https://render.com)
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 设置：
   - Build Command: `npm install`
   - Start Command: `npm start`
5. 部署完成

## 📝 常见问题

### Q: 部署后前端无法获取数据？

A: 检查浏览器控制台，确认是否正确调用了 `/api/rss` 端点。如果使用相对路径，确保前端和后端在同一域名下。

### Q: 本地开发时提示端口占用？

A: 修改 `server.js` 中的 `PORT` 变量，或设置环境变量：

```bash
PORT=3001 npm start
```

### Q: 想只使用前端不部署后端？

A: 在 `index.html` 中设置 `USE_OWN_BACKEND = false`，应用会自动使用第三方代理。

### Q: Vercel 部署失败？

A: 确保：

1. `package.json` 包含所有必要的依赖
2. `vercel.json` 配置正确
3. Node.js 版本兼容（建议 >= 14.0.0）

## 🎉 部署成功后

1. 访问您的域名
2. 添加关键词
3. 点击"刷新帖子"
4. 享受稳定的 RSS 监控服务！

## 📚 更多信息

详细文档请查看 [README.md](./README.md)
