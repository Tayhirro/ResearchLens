# ResearchLens 动态横幅与交互页面

README 中的 [GIF 横幅](../assets/banner.gif)与[交互页面](https://tayhirro.github.io/ResearchLens/)来自同一套实时 WebGL 场景。动画表达研究方法，不是 skill 的实跑录像或质量评测。

## 设计方向

采用 [oil-ui](https://github.com/oil-oil/oil-ui/blob/24975a1899da15e9c0ca744a74a6d6d485289a4c/SKILL.md) 的单组件设计路径：以动态宣传横幅为范围，只深化一个方向；独立页面用于展示完整交互。

**北极星：让观看者看见，研究材料如何被理解成机制，再带着条件进入新场景。**

| 设计决定 | 具体实现与理由 |
|---|---|
| 品类与主动作 | 开源研究分析 skill 的宣传横幅；先识别用途，再点击进入交互演示或仓库 |
| 视觉来源 | 使用 ResearchLens 名称中的透镜，以及论文材料、机制图和结构迁移；图形各自承担分析链中的一个角色 |
| 配色 | 深墨绿 `#101816`、暖白 `#F2EFE4`、浅绿 `#B9D9A4`、暖铜 `#CB9B76`；铜色用于证据焦点，浅绿用于机制与迁移关系 |
| 构图 | 文案与图形共用一张画布，透镜承担动态主角；手机把文字与图形上下组织，保留完整标题 |
| 字体 | Georgia 展示名称，系统中文字体写产品说明；等宽小标签只承担坐标与阶段索引 |
| 记忆点 | 透镜有真实空间旋转，材料粒子在透镜附近收束，随后进入不同拓扑的结构 |
| 动效反馈 | 主图循环、鼠标视角响应、阶段选中线移动、暂停与播放、首次进入的短出场 |
| 减法 | 去掉标题上方的重复眉标，缩减重复说明，不使用卡片堆叠、虚构指标、模型 logo 或成绩徽章 |

参考实际查看了 Oil UI 画廊和 marimo 首屏：采用它们明确的文字层级与主角分配，不复制图库卡片、笔记本界面或产品指标。与旧静态横幅相比，保留“材料—机制—迁移”的关系，把运动和空间层次集中到透镜上。

## 两种展示方式

- **README：** GitHub 过滤脚本，不能直接运行 React 或 WebGL。页面内使用导出的 GIF，点击进入交互演示。[GitHub Markup 说明](https://github.com/github/markup)
- **交互页面：** 原生 WebGL 绘制三维位置、空间旋转与粒子；无需前端构建或运行时依赖。代码位于 [index.html](index.html)、[research-lens.css](research-lens.css)和 [research-lens.js](research-lens.js)。

GitHub Pages 从 `main` 分支的 `/docs` 发布。页面所有运行资源都在该目录中，不依赖外部字体、CDN 或接口。

## 动画与可访问性

动画一轮 10 秒，按问题、机制、证据与迁移四段组织；相关区域的亮度逐渐变化，材料粒子贯穿全程。

交互支持鼠标视角、阶段按钮、键盘选择、暂停与播放。开启“减少动态效果”时默认暂停，阶段仍可切换。页面隐藏或主图离开视口时停止连续绘制；WebGL 不可用时显示同一场景的静态图 [lens-poster.png](lens-poster.png)。

## 重新导出

在已有 Python Playwright、Pillow、Microsoft Edge 与 ffmpeg 的环境中运行：

```powershell
python scripts/export-banner.py
```

[导出脚本](../scripts/export-banner.py)启动只监听本机的临时服务器，使用独立浏览器，不读取用户浏览器配置。每个时间点确定性渲染，输出 `assets/banner.gif`、`assets/hero-poster.png` 和 `docs/lens-poster.png`。

当前 GIF 为 1280 × 560、120 帧、10 秒、无限循环，约 2.38 MiB。导出中间帧和清单位于忽略的 `outputs/` 目录。最后文件的帧数、时长和循环标记由实际解码验证。

## 验收记录

2026-10-11：使用本机 Edge 的独立临时浏览器，实际查看了桌面、手机和 GIF 解码的四个阶段。Oil UI 自带截图工具要求 Node 22；本机版本不满足，按其工具说明使用已有 Python Playwright 取得同类证据。

连续三次检查均通过：播放、暂停、阶段切换、键盘选择、1280 / 768 / 640 / 390 / 320 五种宽度、减少动态效果和 WebGL 静态回退。未发现页面脚本错误。手机标题裁切已修正，正文与阶段操作字号已提高。

这是主 agent 自检，未进行独立视觉评审，未报告视觉评分或实际运行帧率。截图、GIF 解码对照和检查结果保存在本地 `outputs/animation-verification/`；参考画面在 `outputs/animation-first-look/`，两者均不发布到仓库。

[返回 README](../README.md)
