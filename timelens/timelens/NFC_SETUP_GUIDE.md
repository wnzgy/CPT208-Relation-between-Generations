# TimeLens NFC 接入说明

这份文档是给你们真正买了 NFC sticker / NFC card 之后使用的。

目标不是“概念说明”，而是告诉你们怎么把真实 NFC tag 接进现在这个原型。

## 1. 你们需要准备什么

线下需要准备：

- 可写入的 **NDEF-compatible NFC tag**
- 一台支持 NFC 的手机
- 最好使用支持 Web NFC 的移动端浏览器
- 1 到 2 个真实物件或展示用道具

额外注意：

- **真正使用 Web NFC 时，网页必须运行在 HTTPS 或 localhost 环境**
- 如果你用手机直接访问电脑局域网 IP，很多情况下不属于 secure context，Web NFC 可能无法工作

建议理解成：

- 物件本身负责 tangible
- NFC tag 负责触发
- 手机网页负责打开数字记忆

## 2. 现在代码里已经做好的部分

前端代码位置：

- [App.jsx](/C:/Users/87341/Desktop/ics%20group%20cw/cpt208/timelens/timelens/src/App.jsx)

里面已经有这些真实 NFC 相关能力：

- `isWebNfcSupported()`：检测当前环境是否支持 Web NFC
- `buildMemoryNfcWriteMessage(memoryId)`：生成写入 NFC tag 的内容
- `extractMemoryIdFromNdefMessage(message, memories)`：从 NFC 读取结果中提取 memory id
- `NfcToolsModal`：负责 NFC 读取、写入和 fallback 演示

也就是说，现在不是只有“演示按钮”，而是已经有：

- 真实 NFC 读取代码
- 真实 NFC 写入代码
- 页面级入口
- 设备不支持时的 fallback 演示逻辑

## 3. 真实 NFC 使用流程

### 方法 A：直接在系统里写入 NFC tag

适合支持 Web NFC 的手机环境。

步骤：

1. 运行项目
2. 在支持 Web NFC 的环境里打开 `/?demo=scan&panel=nfc`
3. 在 `NFC Tools` 面板里选一个 memory
4. 点击 `Write NFC tag`
5. 把空白 NFC tag 贴近手机
6. 写入成功后，把这个 tag 贴到对应物件旁边

写入完成后：

- `watch_1985` 对应 “Grandfather's Pocket Watch”
- `photo_1992` 对应 “Faded Family Photo”

### 方法 B：读取已经写好的 NFC tag

步骤：

1. 打开 `NFC Tools`
2. 点击 `Start NFC scan`
3. 用手机贴近已经写好的 NFC tag
4. 成功后系统会自动打开对应记忆页

## 4. NFC tag 实际写入了什么

代码中会写入两种信息：

1. `url record`
2. `text record`

示例内容大致是：

- `http://localhost:5173/?nfc=watch_1985`
- `watch_1985`

这样做的好处是：

- 页面可以通过 URL 直接知道该打开哪个记忆
- 即使读取方式不同，也仍然能通过 `memory id` 做 fallback 识别

## 4.5 最稳的真实演示环境

如果你们想把买来的 NFC tag 真正用起来，最稳的环境是：

1. 把项目部署到 HTTPS
2. 用支持 NFC 的 Android 手机打开部署后的网页
3. 在手机上进入 `NFC Tools`
4. 写入并读取 NFC tag

如果只是本机电脑跑 `npm run dev`，那么：

- 电脑浏览器一般没有可用 Web NFC
- 手机通过局域网 IP 访问也可能因为不是 secure context 而被拦住

## 5. 真实演示时推荐怎么做

你们真正演示时，推荐这样准备：

1. 选 1 个主物件作为重点演示
2. 给这个物件写入一个 NFC tag
3. 把 tag 贴在物件背面或旁边说明卡上
4. 演示时先展示物件
5. 再让手机贴近 NFC tag
6. 页面打开记忆
7. 再展示 message / map / record

推荐顺序：

`Object -> NFC tap -> Memory -> Messages -> Map`

## 6. 如果课堂设备不支持 Web NFC 怎么办

这也是为什么我保留了 fallback。

如果课堂上设备不支持 NFC：

1. 仍然打开 `NFC Tools`
2. 告诉老师你们最终 tangible 方案是 NFC
3. 点击 `Open memory now`
4. 继续正常展示后续页面

这样你们不会因为浏览器兼容问题导致整套 demo 卡死。

## 7. 你们要怎么向老师解释这部分

可以直接这么说：

“Our final tangible trigger is NFC. We prepared the prototype so that supported mobile devices can read and write NFC tags directly. For classroom reliability, we also kept a fallback demo path in case Web NFC is not available on the presentation device.”

## 8. 你们现在已经具备的交付能力

就 NFC 这一部分来说，现在已经可以做三件事：

- 做一版真实 NFC 触发演示
- 做一版稳定的课堂 fallback 演示
- 在海报和 portfolio 里把 tangible 明确写成 NFC，而不是 QR

## 9. 最后提醒

你们最终提交和汇报里，口径要统一成：

- tangible trigger = **NFC**
- mobile interface = **web-based prototype**
- fallback = **presentation backup only**

不要再把主方案讲成 QR code，不然前后会冲突。
