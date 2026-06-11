# 文件重命名工具

一个简单实用的 Web 工具，可以将上传的任意文件后缀名重命名为 `.jpg`。

## 功能特点

- 支持拖拽上传文件
- 支持点击选择文件
- 自动将文件后缀重命名为 `.jpg`
- 一键下载重命名后的文件
- 响应式设计，支持移动端和桌面端

## 技术栈

- Next.js 14
- React 18
- Vercel 部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 http://localhost:3000 即可访问。

## 部署到 Vercel

### 方法一：通过 Vercel CLI 部署

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 登录 Vercel
```bash
vercel login
```

3. 部署
```bash
cd vercel
vercel --prod
```

### 方法二：通过 GitHub 部署

1. 将 `vercel` 文件夹内的文件推送到 GitHub 仓库
2. 在 Vercel 官网 (https://vercel.com) 导入该仓库
3. 点击 Deploy 即可自动部署

## 注意事项

- 此工具仅修改文件后缀名，不会转换文件格式
- 文件在服务器端不存储，处理完成后直接返回
- 支持最大 10MB 的文件上传
