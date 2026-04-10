# TimeLens Demo Guide

## 1. 本地运行

```bash
npm install
npm run dev
```

## 2. 固定截图 / 演示状态

系统支持通过 query 参数直接进入指定演示画面。

### 首页
`/?demo=scan`

### 过渡页
`/?demo=scanning`

### 3D 记忆展示
`/?demo=memory&memory=watch_1985`

### 留言面板展开
`/?demo=messages&memory=watch_1985`

### 地图界面
`/?demo=map&unlock=all`

### 创建记忆界面
`/?demo=create`

### NFC 工具面板
`/?demo=scan&panel=nfc`

### 视频演示模式
`/?demo=video`

### 视频演示指定场景
- `/?demo=video&scene=cover`
- `/?demo=video&scene=hook`
- `/?demo=video&scene=concept`
- `/?demo=video&scene=scan`
- `/?demo=video&scene=reveal`
- `/?demo=video&scene=dialogue`
- `/?demo=video&scene=map`
- `/?demo=video&scene=create`
- `/?demo=video&scene=impact`
- `/?demo=video&scene=credits`

详细录制顺序见 `VIDEO_DEMO_GUIDE.md`

真实 NFC 接入步骤见 `NFC_SETUP_GUIDE.md`

## 3. Tangible 方案

你们当前选择的 tangible 方案是 **NFC**。

### 目前已经完成的部分
- App 内 `NFC Tools` 面板
- 在支持的设备上读取 NFC tag
- 在支持的设备上写入 NFC tag
- 可打印说明卡：`public/tangible/nfc-tag-sheet.svg`
- 系统截图模式
- 物件到手机界面的演示路径

### 你们线下还要准备的部分
- 可写入的 NFC sticker / NFC card
- 1 到 2 个真实物件或模拟道具
- 把 NFC tag 贴在物件或说明卡上
- 演示时先展示物件，再展示手机界面

### 现在可用的落地交互
- 首页可选择不同物件
- `NFC Tools` 可启动 NFC 读取
- `Write NFC tag` 可把指定记忆写入 NFC 标签
- `Open memory now` 可在不支持 NFC 的设备上作为演示 fallback
- NFC tag 被触发后会进入对应记忆页

## 4. 课堂展示建议顺序

1. 展示实体物件
2. 说明物件上贴有 NFC tag
3. 打开 `/?demo=scan`
4. 打开 `/?demo=scan&panel=nfc`
5. 演示 NFC tap 或 fallback
6. 切换到 `/?demo=memory&memory=watch_1985`
7. 切换到 `/?demo=messages&memory=watch_1985`
8. 最后展示 `/?demo=map&unlock=all`

## 5. 注意

- 现在的 tangible 方案已经改成 `NFC-first`
- 如果课堂设备不支持 Web NFC，建议使用 Android Chrome 或直接走 fallback 按钮完成演示
- 最终汇报口径里不要再把主方案讲成二维码
