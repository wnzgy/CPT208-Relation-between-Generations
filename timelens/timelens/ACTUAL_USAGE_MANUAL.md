# TimeLens 实际使用说明书

这份说明书给不负责前端实现的组员使用。

它的用途是让负责海报、课堂展示、视频录制的同学快速明白：

- 系统整体在做什么
- 每个模块分别负责什么
- 演示时应该怎么操作
- `NFC` 方案在这个项目里到底是什么

说明：

- **网页前端显示文字现在是英文**
- **这份说明书保留中文，方便组内沟通**
- **你们最终选择的 tangible 方案是 NFC，不再是二维码主方案**

## 1. 项目一句话说明

TimeLens 是一个把真实家庭物件变成数字记忆入口的移动端原型。

用户先接触到一个真实 keepsake，例如怀表、老照片、针线盒，再通过 **NFC tap** 进入对应记忆页面，看到故事、视觉化展示和跨代留言，最后把这些记忆沉淀成一个可回访的家庭记忆集合。

一句话概括：

**TimeLens 用真实物件和 NFC 触发数字记忆，让祖辈与晚辈通过移动端继续展开对话。**

## 2. 核心体验流程

完整流程如下：

1. 看到真实家庭物件
2. 用手机靠近或点击对应的 NFC 标签
3. 打开该物件背后的记忆
4. 查看视觉化展示与故事内容
5. 留下一句回应
6. 在 `Map` 页面查看已解锁记忆
7. 在 `Record` 页面继续新增家庭故事

海报和演示里可以把它总结成：

`Object -> NFC Tap -> Reveal -> Reply -> Collect`

## 3. 如何运行

项目目录：

`C:\Users\87341\Desktop\ics group cw\cpt208\timelens\timelens`

运行命令：

```bash
npm install
npm run dev
```

浏览器打开：

`http://localhost:5173/`

## 4. 模块说明

下面按“模块作用 / 如何操作 / 展示效果 / 演示时怎么讲”来说明。

### 4.1 `Tap` 首页

打开：

`http://localhost:5173/?demo=scan`

这个模块在做什么：

- 这是系统的主入口
- 它强调用户是从“真实物件”出发，而不是从普通档案库出发
- 它把系统的第一步设计成现实世界中的 keepsake interaction

如何操作：

1. 在页面下方选择一个物件
2. 点击中间的主触发按钮
3. 页面进入短暂过渡
4. 打开对应记忆页面

展示效果：

- 观众会理解这个系统的入口是一个家庭物件
- 中间按钮提供一个清晰、好演示的触发动作
- 上方卡片展示当前物件标题、年份和故事预览

演示时可以怎么讲：

- “这个页面模拟用户先接触到一个真实家庭物件，再决定去探索它背后的记忆。”
- “我们希望入口不是菜单，而是 keepsake 本身。”

### 4.2 `NFC Tools` 模块

打开方式：

- 在首页点击 `NFC Tools`
- 或直接访问 `http://localhost:5173/?demo=scan&panel=nfc`

这个模块在做什么：

- 这是你们最终 tangible 方案的核心模块
- 它负责 **读取 NFC 标签** 和 **写入 NFC 标签**
- 它把真实物件、NFC sticker/tag 和手机里的数字记忆连接起来

如何操作：

1. 打开 `NFC Tools`
2. 如果设备支持 Web NFC，可以点击 `Start NFC scan`
3. 用手机贴近已经写好的 NFC 标签
4. 成功后会打开对应记忆页面
5. 也可以点击 `Write NFC tag`，把指定记忆写进空白 NFC 标签

展示效果：

- 这部分能证明你们的 tangible 方案不是“二维码替代品”，而是真正的 NFC 触发思路
- 它体现了项目里的 `Mobile XR / Tangible / Hybrid`
- 它也让物理物件与数字故事之间的连接更自然

演示时可以怎么讲：

- “我们最终选择 NFC 作为 tangible trigger。用户只需要把手机贴近物件上的 NFC tag，就能打开这段家庭记忆。”

现实限制：

- Web NFC 主要适合在支持的移动浏览器中演示
- 如果课堂设备不支持 Web NFC，也可以使用页面里的 fallback 按钮继续演示流程

### 4.3 `Memory` 记忆展示页

示例：

`http://localhost:5173/?demo=memory&memory=watch_1985`

这个模块在做什么：

- 展示某个物件背后的核心故事
- 把一个家庭物件转化成可视化、可理解的记忆体验
- 这是系统里最强的情感展示页面

如何操作：

1. 从 NFC tap 流程进入该页
2. 观看中央 3D 视觉对象
3. 阅读故事卡片
4. 决定是否继续打开留言面板

展示效果：

- 3D 物体提供“记忆被打开”的感觉
- 故事卡片提供标题、年份和叙事内容
- 这是系统里最容易形成 “wow moment” 的页面

演示时可以怎么讲：

- “我们不希望家庭故事只是普通文字，所以这里让记忆以视觉化 reveal 的方式出现，让它更像被重新发现。”

### 4.4 `Messages` 留言模块

示例：

`http://localhost:5173/?demo=messages&memory=watch_1985`

这个模块在做什么：

- 支持祖辈和晚辈之间的短消息交流
- 让记忆不是单向存档，而是能继续延伸成对话
- 这是项目“代际关系”主题最直接的体现

如何操作：

1. 在记忆页点击 `View messages`
2. 查看已有留言
3. 选择快捷回复或手动输入
4. 发送后即时显示在对话区

展示效果：

- 强化 `Relation between Generations`
- 说明系统不是只保存旧故事，而是支持跨代互动

演示时可以怎么讲：

- “TimeLens 不只是保存祖辈的故事，也让下一代可以提问、回应和延续这段记忆。”

### 4.5 `Map` 家庭记忆集合页

打开：

`http://localhost:5173/?demo=map&unlock=all`

这个模块在做什么：

- 汇总所有已解锁的家庭物件记忆
- 把一次次 NFC 触发沉淀成一个持续增长的 memory collection
- 让系统看起来更完整、更像一个可长期使用的产品

如何操作：

1. 打开 `Map`
2. 查看已经解锁的所有物件
3. 点击 `View memory` 返回故事页
4. 点击 `Open dialogue` 直接进入留言区

展示效果：

- 表明系统不是单个页面，而是可以累积内容的整体体验
- 体现“家庭记忆收藏”这个概念

演示时可以怎么讲：

- “随着更多物件被触发，这些记忆会逐渐沉淀成一个可以回访的家庭记忆集合。”

### 4.6 `Record` 新增记忆模块

打开：

`http://localhost:5173/?demo=create`

这个模块在做什么：

- 允许用户录入新的物件与故事
- 说明系统不是静态展示，而是可以继续增长
- 让原型具备可扩展性

如何操作：

1. 输入物件名称
2. 输入年份
3. 输入故事
4. 点击 `Save memory`
5. 新记忆会立刻保存并进入系统

展示效果：

- 说明 TimeLens 支持新增内容，而不只是浏览已有内容
- 让系统更像一个可持续扩展的家庭记忆产品

演示时可以怎么讲：

- “这个系统可以不断加入新的家庭物件，让家族记忆随着使用继续扩充。”

### 4.7 `Video Demo Mode` 视频录制模式

打开：

`http://localhost:5173/?demo=video`

这个模块在做什么：

- 这是为了最终演示视频准备的录制模式
- 它内置分镜、字幕和场景切换
- 方便非前端同学稳定录制每个关键页面

可直接进入的场景有：

- `cover`
- `hook`
- `concept`
- `scan`
- `reveal`
- `dialogue`
- `map`
- `create`
- `impact`
- `credits`

展示效果：

- 让录屏更稳定、更结构化
- 减少临场找页面、来回切换的麻烦

演示时可以怎么讲：

- “这个模式是给最终 coursework video 准备的，能快速切换到每个需要录制的场景。”

## 5. 你们项目里的 NFC tangible 到底是什么

你们现在选的 tangible 方案不是二维码，而是 NFC。

这意味着：

- 每个家庭物件对应一个 **NFC sticker / NFC tag**
- 用户不是“扫描码”，而是把手机贴近标签
- 标签被触发后，系统打开对应记忆页面

所以 NFC 在这个项目里的意义是：

- 让交互从现实世界开始
- 让故事和真实物件建立更强的联系
- 让“物件 -> 触发 -> 故事”这个过程更自然

目前已经完成的 NFC 相关内容：

- 前端已经改成 `NFC-first` 口径
- App 内有 `NFC Tools` 模块
- 支持在支持的设备上读取 NFC tag
- 支持写入 NFC tag
- 也保留了 fallback 演示入口，保证课堂展示稳定

你们线下还需要自己准备的部分：

- 购买或准备可写入的 NFC sticker / NFC card
- 准备 1 到 2 个真实物件或模拟道具
- 把 NFC tag 贴在物件或物件说明卡上
- 可以直接打印 `public/tangible/nfc-tag-sheet.svg` 作为展示说明卡

真实写入和读取步骤见：

- `NFC_SETUP_GUIDE.md`

## 6. 推荐的现场演示顺序

课堂展示建议按下面顺序：

1. 先拿出真实物件，例如怀表或老照片
2. 说明这个物件旁边贴了 NFC tag
3. 打开 `/?demo=scan`
4. 点击 `NFC Tools`
5. 演示手机贴近 NFC tag
6. 打开 `/?demo=memory&memory=watch_1985`
7. 打开留言面板，展示跨代对话
8. 打开 `/?demo=map&unlock=all`
9. 最后展示 `/?demo=create`

这套逻辑很清楚：

`物件 -> NFC tap -> 记忆打开 -> 对话 -> 收藏 -> 扩展`

## 7. 海报里如何描述 NFC 模块

如果做海报的同学不知道怎么写，可以直接参考下面这些英文句子。

### NFC Trigger

“A family keepsake is augmented with an NFC tag, allowing users to unlock its story through a simple phone tap.”

### Memory Reveal

“The system transforms a family object into a visual memory reveal, making intergenerational stories easier to discover and more emotionally engaging.”

### Dialogue

“TimeLens supports short reciprocal messages between grandparents and children, turning archived memories into ongoing conversation.”

### Collection

“Unlocked objects accumulate into a growing family memory collection rather than remaining isolated one-off interactions.”

### Tangible Hybrid

“The design combines physical keepsakes, NFC tags, and a mobile interface to connect tangible interaction with digital storytelling.”

## 8. 这套原型最适合证明什么

目前这版原型最适合证明这几件事：

- 你们不是只有概念，而是已经把核心交互做出来了
- NFC tangible 方案已经有最低可行实现
- 代际关系主题已经通过记忆页和留言模块体现出来
- 原型既能展示，也支持后续扩展

## 9. 给组员的一句话总结

如果组里有人只想记一句话，就记这个：

**TimeLens 用真实家庭物件和 NFC trigger 作为入口，让用户打开祖辈记忆，并通过留言和收藏机制把代际故事继续延伸下去。**
