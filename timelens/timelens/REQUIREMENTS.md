# 环境要求与安装指南

如何快速跑起这个项目

---

## 📋 环境要求

| 项目 | 最低版本 | 检查命令 |
|------|---------|---------|
| Node.js | 18.x | `node -v` |
| npm | 9.x | `npm -v` |

### 检查是否已安装
```bash
node -v    # 应该显示 v18.x.x 或更高
npm -v     # 应该显示 9.x.x 或更高
```

### 如果未安装
去官网下载安装：https://nodejs.org/ （建议下载 LTS 版本）

---

## 🚀 安装步骤

### 1. 克隆/下载项目
```bash
cd timelens
```

### 2. 安装依赖
```bash
npm install
```

> 这个命令会读取 `package.json`，自动下载所有需要的库（React、Three.js、Tailwind 等）
> 
> 第一次运行可能需要 1-2 分钟

### 3. 启动开发服务器
```bash
npm run dev
```

看到以下输出表示成功：
```
VITE v8.0.1  ready in 85 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. 浏览器访问
打开 http://localhost:5173 即可看到应用

---

## 📦 主要依赖说明

本项目用到以下核心库（安装时自动下载）：

```
react ^19.2.4          # React 框架
three ^0.183.2         # 3D 渲染引擎
@react-three/fiber     # React 的 Three.js 封装
@react-three/drei      # Three.js 辅助组件
tailwindcss ^4.2.2     # CSS 样式框架
lucide-react           # 图标库
vite ^8.0.1            # 构建工具
```

---

## ⚠️ 常见问题

### 1. 端口被占用
如果看到 `Port 5173 is already in use`，说明端口被占用：
```bash
# 方法1：杀掉占用端口的进程
npx kill-port 5173
npm run dev

# 方法2：使用其他端口
npm run dev -- --port 3000
```

### 2. npm install 很慢
使用淘宝镜像加速：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### 3. 安装报错 node_modules 冲突
```bash
# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### 4. 浏览器白屏
- 检查是否使用了 Chrome/Edge/Firefox 现代浏览器
- 按 F12 打开控制台查看报错
- 尝试强制刷新：Ctrl + Shift + R

---

## 🛠️ 可用命令

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动开发服务器（常用） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 检查代码规范 |

---

## 💡 提示

- 开发时保存文件，浏览器会自动刷新（热更新）
- 所有代码在 `src/` 文件夹里
- 页面样式使用 Tailwind CSS，可以直接在 className 里写样式
