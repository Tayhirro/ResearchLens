# ResearchLens：GPT 网页版生图提示词

以下用于你在 GPT 网页版生成替换素材。当前页面已经提供手工排版的 [PNG 横幅](../assets/banner.png)和[可编辑 SVG](../assets/banner.svg)，可以直接使用。

视觉方向：暖白纸张、深墨绿、少量陶土色；研究手册与编辑设计风格。主体是材料、机制、证据与迁移的关系。图片文字短而清晰，长文放在 README 中。

## 1. GitHub README 横幅

建议横向比例约 8:3，目标尺寸 1600 × 600 或等比例高分辨率。将下面整段复制给 GPT：

```text
请为开源研究分析 skill「ResearchLens」设计一张精致的 GitHub README 横幅。

宽横构图，比例约 8:3，目标 1600×600。采用研究手册 / 学术编辑设计风格：暖白纸张背景 #F4F1E9，深墨绿 #173E38，少量陶土橙 #C1734D；有极轻的纸纹、细线和充足留白，沉静、清晰、可信。

左侧约 48% 为文字区：
主标题：ResearchLens
副标题：Understand mechanisms.
第二行：Check evidence. Transfer principles.
底部小字：PAPERS / SYSTEMS / TECHNICAL IDEAS

右侧约 45% 为精致概念插图：
几张带简洁符号的研究材料，经过一枚抽象研究透镜，显露出结构清晰的机制节点与关联；这些关系带着必要的条件标签，迁移到另一种系统结构。体现「理解材料 → 拆解机制 → 核对依据 → 携带条件迁移原理」。用细线、几何关系、少量色块和轻微手绘质感表现。

标题使用优雅但清楚的衬线字体；小字使用简洁的等宽或无衬线字体。左右分区协调，所有文字准确可读，边缘留足安全空间。缩小到 GitHub README 宽度仍能识别。

不要机器人、大脑、宇宙、霓虹、紫色科技渐变、繁杂仪表盘、夸张 3D、论文截图拼贴、伪造图表或成绩徽章。不要添加 MIT、官方合作 logo、准确率、star 数或其他未提供的声明。不要擅自增加文字。
```

如果生成的文字需要修正：

```text
保留这张图的构图、配色、插图和留白，只修正文案：
ResearchLens
Understand mechanisms.
Check evidence. Transfer principles.
PAPERS / SYSTEMS / TECHNICAL IDEAS
保持英文拼写准确，避免增加其他文字。
```

## 2. 解释本质特色的横向概念图

这张图适合放在 README 的价值说明后。它表达分析过程，不承担真实案例或评测结果的展示。

```text
请为 ResearchLens 设计一张横向编辑风格概念图，约 5:2，高分辨率，暖白 #F4F1E9、深墨绿 #173E38、陶土橙 #C1734D，与精致研究手册一致。

整张图由五个清楚的阶段组成，用细线自然连接：
QUESTION → MECHANISM → EVIDENCE → BOUNDARIES → TRANSFER

QUESTION：一张带简短问号标记的研究问题卡。
MECHANISM：展开成前提、关键节点、因果关联的简洁结构。
EVIDENCE：两种不同来源的材料与一条反例线索，共同对应到某个结论。避免把每项结论都画成已证明。
BOUNDARIES：一个清晰的条件框，表明机制在某些条件内成立。
TRANSFER：保留核心关系与条件，将其映射到另一种结构；不是复制原对象的外形。

图形应让人直观看到：理解机制需要证据，迁移原理需要带上成立条件。
只使用这五个英文阶段名，无长段文字、无精确数值、无真假难辨的论文引用、无机器人、无霓虹或紫色渐变。排版清楚，留白足够，线条精致，在 900px 宽度仍能阅读。
```

## 3. GitHub 分享封面

目标尺寸 1280 × 640，比例 2:1。用于社交分享预览，与 README 横幅保持一致。

```text
请基于 ResearchLens 的研究手册视觉风格，设计一张 1280×640、2:1 的开源项目分享封面。

暖白纸张 #F4F1E9，深墨绿 #173E38，少量陶土橙 #C1734D。主体构图用「研究材料 → 透镜下的机制 → 带条件的原理迁移」表现项目本质，细线、几何结构、克制的纸纹和宽松留白。

文字只包含：
ResearchLens
Understand mechanisms.
Check evidence. Transfer principles.

主标题醒目且优雅，副标题清楚，所有内容位于画面中心 80% 安全区域。右侧或右下角安排概念插图，整体像一本精致的研究方法手册封面。不要伪造数据、logo、合作方、许可证、排名或成果声明。
```

## 替换方式

生成 README 横幅后，保存为 `assets/banner.png`，即可替换当前图片。若使用 JPEG / WebP，请同步修改中英文 README 的图片路径与格式。

概念图可以保存为 `assets/method.png`，放在首页价值说明之后，保留准确的文字说明。分享封面单独保存为 `assets/social-preview.png`，上传到 GitHub 仓库设置中的 Social preview。

横幅的 SVG 是当前手工设计源码。替换 PNG 后，SVG 不会自动同步；请在说明中区分两份素材。

[返回 README](../README.md)
