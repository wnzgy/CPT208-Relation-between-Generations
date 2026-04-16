# Week 8 任务分配 | 4人小组

> 📅 截止时间：Week 8 Demo Day
> 🎯 目标：Final Poster + Alpha System + 初始测试数据

---

## 👥 角色分配

| 角色 | 人数 | 主要职责 |
|------|------|---------|
| **前端开发** | 1人 | UI实现、交互功能 |
| **3D/硬件** | 1人 | 3D优化、硬件Demo准备 |
| **设计/文档** | 1人 | Portfolio、Personas、Journey Map |
| **测试/Poster** | 1人 | 用户测试、Poster制作、视频素材 |

---

## 📋 详细任务清单

### 🎨 组员A：前端开发工程师

**主要职责**：UI重构 + 功能完善

| 任务 | 说明 | 优先级 |
|------|------|--------|
| UI重构评估 | 检查当前UI，决定是否重构 | P0 |
| 移动端适配优化 | 确保10:19.5比例在各种手机正常显示 | P0 |
| 动画效果增强 | 页面切换、按钮交互动画 | P1 |
| 二维码扫描功能 | 添加真实二维码扫描（可用库） | P1 |
| Bug修复 | 根据测试反馈修复问题 | P2 |

**技术建议**：
- 如果觉得UI不好，可重构。推荐参考：Apple Design、Notion 简洁风
- 二维码扫描库：`html5-qrcode`

---

### 🎲 组员B：3D/硬件负责人

**主要职责**：3D体验 + 硬件演示准备

| 任务 | 说明 | 优先级 |
|------|------|--------|
| 3D模型优化 | 优化性能，加载速度 | P0 |
| Tangible Demo准备 | **准备实体道具**：老怀表/照片+打印二维码贴纸 | P0 |
| 扫描体验优化 | 添加震动反馈、扫描音效 | P1 |
| AR原型调研 | 调研WebAR可行性（可选） | P2 |
| 演示脚本 | 写硬件演示的讲解词 | P1 |

**硬件Demo方案**（重点）：
```
准备材料：
□ 一个实体老物件（或道具）
□ 打印二维码贴纸（贴在物件上）
□ 一部手机运行TimeLens

演示流程：
1. 展示实体物件
2. 用手机扫描二维码
3. 屏幕显示解锁记忆
4. 展示3D模型和留言功能
```

---

### 📝 组员C：设计/文档负责人

**主要职责**：Process Portfolio + 设计文档

| 任务 | 说明 | 优先级 |
|------|------|--------|
| GitHub Pages搭建 | 创建Portfolio网站框架 | P0 |
| Persona x2 | 祖辈(65岁+) + 孙辈(12岁) | P0 |
| User Journey Map | 现状痛点→解决方案流程图 | P0 |
| Design Alternatives | 3种设计方案对比及选择理由 | P0 |
| Crazy 8s草图 | 8张快速手绘草图拍照上传 | P1 |
| Low-Fi原型 | Figma简单线框图 | P1 |

**Portfolio网站结构**：
```
portfolio/
├── index.html          # 首页/项目简介
├── research.html       # 用户调研
├── design.html         # 设计过程
├── system.html         # 系统架构
└── assets/             # 图片资源
```

**Persona模板**：
```
姓名：
年龄：
身份：祖父/祖母/孙子/孙女
技术熟练度：
目标：
痛点：
使用场景：
```

---

### 🧪 组员D：测试/Poster负责人

**主要职责**：用户测试 + Week 8 Poster

| 任务 | 说明 | 优先级 |
|------|------|--------|
| 用户测试x3 | 找3组用户试用并记录 | P0 |
| 测试报告 | 记录反馈、问题、改进建议 | P0 |
| Week 8 Poster | 按模板制作Poster | P0 |
| 视频素材录制 | 录制系统使用片段备用 | P1 |
| 演示排练 | 准备Demo Day讲解 | P1 |

**用户测试方案**：
```
目标用户：
□ 祖父母 1-2位（60岁+）
□ 孙辈 1-2位（10-15岁）

测试任务：
1. 扫描解锁一个记忆
2. 查看3D模型
3. 发送一条留言
4. 创建一个新记忆

记录内容：
- 完成任务时间
- 遇到的困难
- 主观反馈（1-5分）
- 改进建议
```

**Poster要求内容**（A1尺寸）：
```
□ 项目名称 + 组员
□ 项目背景/动机（1段）
□ 目标用户（Persona照片）
□ 设计过程（Crazy 8s + Design Alternatives）
□ 系统截图/二维码
□ 初始测试结果（图表）
□ 下一步计划
```

---

## 📅 时间线

### Week 7（本周）
- [ ] 组员A：完成UI评估，确定是否重构
- [ ] 组员B：准备硬件Demo道具
- [x] 组员C：搭建Portfolio框架，完成Persona初稿
- [ ] 组员D：联系测试用户，安排测试时间

### Week 8上半周
- [ ] 组员A：功能完善，Bug修复
- [ ] 组员B：3D优化，Demo脚本
- [x] 组员C：完成Journey Map + Design Alternatives
- [ ] 组员D：完成用户测试，整理数据

### Week 8 Demo前
- [ ] 全员：整合所有内容到Portfolio
- [ ] 组员D：完成Poster，打印
- [ ] 全员：Demo排练

---

## 🔄 协作流程

### GitHub协作
```bash
# 每人自己的工作分支
git checkout -b memberA-ui
git checkout -b memberB-3d
git checkout -b memberC-docs
git checkout -b memberD-test

# 完成后合并到main
git checkout main
git merge memberA-ui
```

### 同步会议
- 建议每2天15分钟站会同步进度
- 共享文档：Notion/腾讯文档记录进度

---

## ✅ Week 8 验收清单

提交前确认以下完成：

| 检查项 | 负责人 | 状态 |
|--------|--------|------|
| Alpha System可运行 | 全员 | ☐ |
| LocalStorage数据持久化 | 组员A | ✅ |
| 3D展示正常 | 组员B | ✅ |
| 硬件Demo道具准备 | 组员B | ☐ |
| GitHub Pages Portfolio | 组员C | ✅ |
| 2个Personas | 组员C | ✅ |
| User Journey Map | 组员C | ✅ |
| Design Alternatives文档 | 组员C | ✅ |
| 用户测试报告 | 组员D | ☐ |
| Week 8 Poster | 组员D | ☐ |

---

## 💡 提示

1. **UI重构是可选的**：当前UI可用，但如果有人想改进，Week 7是最后机会
2. **硬件Demo是亮点**：B4强调Tangible，现场展示实物扫描会很加分
3. **Portfolio可以简单**：用GitHub Pages + Markdown也可以，关键是内容完整
4. **有问题及时沟通**：不要等到Week 8才发现做不完

---

> 一起加油！Week 8见 💪
