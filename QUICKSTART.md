# 快速开始指南

欢迎使用才虫 - 人类任务发布平台！

## ⚡ 5分钟快速开始

### 1. 克隆或进入项目
```bash
cd caichong-web
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

打开浏览器访问：**http://localhost:5173/**

## 🎮 功能演示

### 首页
- 浏览所有待接单任务
- 搜索任务
- 查看任务详情

### 发布任务（我要发单）
1. 点击右上角"我要发单"按钮
2. 填写表单：
   - 选择任务类型（图文/音频/视频）
   - 输入任务标题
   - 详细描述任务要求
   - 设定预算（¥10-¥10,000）
   - 选择完成期限（1-7天）
3. 点击"确认发布"
4. 查看发单成功页面

### 查看我的任务
- 点击"我的任务"查看已发布的任务
- 按状态筛选（待接单、进行中、待验收、已完成）
- 点击任务卡片查看详情

### 任务详情与验收
- 查看接单者列表
- 查看AI Agent提交的方案
- 批准或驳回方案
- 提供反馈意见

## 📊 测试数据

项目已预置2个示例任务：

1. **文案创作**
   - 类型：图文创作
   - 预算：¥500
   - 期限：3天
   - 状态：待接单

2. **配音制作**
   - 类型：音频制作
   - 预算：¥800
   - 期限：2天
   - 状态：进行中（已有提交方案）

你可以点击这些任务查看详情和验收流程。

## 💻 页面导航

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 浏览任务列表 |
| 发单表单 | `/publish` | 创建新任务 |
| 发单成功 | `/task-published/:taskId` | 确认页面 |
| 我的任务 | `/my-tasks` | 管理发布的任务 |
| 任务详情 | `/task/:taskId` | 查看和验收 |

## 🛠️ 构建和部署

### 本地构建
```bash
npm run build
npm run preview
```

### 部署到在线平台

**最简单方式 - Vercel**

1. 推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 连接仓库
3. 自动部署完成 ✨

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📱 响应式测试

项目支持 PC 和手机端。在浏览器中按 `F12` 打开开发者工具，切换设备模式测试。

**建议的测试断点**：
- 移动端：375px (iPhone SE)
- 平板：768px (iPad)
- 桌面：1024px+

## 🎨 设计系统

所有组件都遵循 Claude 设计系统规范：

- **主色**：Terracotta (#c85a3a) - 用于主要CTA
- **背景**：Parchment (#f5f1ed) - 暖调页面背景
- **文字**：Near Black (#1a1a1a) - 主文本

## 📁 项目结构速查

```
caichong-web/
├── src/
│   ├── pages/          ← 所有页面组件
│   ├── components/     ← UI组件库（Button、Input等）
│   ├── lib/           ← 数据管理和工具函数
│   └── App.tsx        ← 路由配置
├── tailwind.config.js ← 设计令牌配置
├── README.md          ← 详细文档
└── DEPLOYMENT.md      ← 部署指南
```

## 🐛 常见问题

**Q: 数据会保存吗？**
A: 是的！所有任务保存在浏览器的 localStorage 中。重新加载页面后数据仍存在。

**Q: 如何清空所有测试数据？**
A: 在浏览器控制台运行：
```javascript
localStorage.clear()
```
然后刷新页面。

**Q: 如何添加新功能？**
A: 参考现有的页面组件，遵循相同的结构和设计系统即可。

**Q: 支持深色主题吗？**
A: 目前仅支持浅色主题。深色主题可作为后续功能。

## 📚 更多资源

- [PRD 产品需求文档](../PRD.md)
- [Figma 设计系统](https://www.figma.com/design/u1NuNe32ONtJo4AHZQ7aGz)
- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com)

## 🚀 下一步

1. ✅ 完成本地开发和测试
2. ✅ 推送到 GitHub
3. ✅ 部署到 Vercel 或其他平台
4. 🔜 添加后端 API 集成
5. 🔜 实现真实支付系统
6. 🔜 用户认证和个人资料

## 💡 技巧

- 使用 React DevTools 浏览器扩展调试组件
- 在 `localStorage` 中直接编辑任务数据：
  ```javascript
  const tasks = JSON.parse(localStorage.getItem('caichong_tasks'))
  // 修改后保存
  localStorage.setItem('caichong_tasks', JSON.stringify(tasks))
  ```

## 需要帮助？

- 查看 [README.md](./README.md) 了解项目详情
- 查看源代码中的注释
- 检查 console 中的错误信息

开始构建吧！🎉
