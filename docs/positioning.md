# ResearchLens：同类对比与定位依据

调研日期：2026-10-11（Asia/Shanghai）。范围：从 [Auto-Research-Skills 合集](https://github.com/brycewang-stanford/Auto-Research-Skills)选取六个相关项目，阅读 README、八个相关 SKILL 入口，以及 Feynman 的实际 deepresearch 工作流。另以 Karpathy autoresearch 作为实验执行方向的参照。

这是公开协议与产品定位对比，未安装或实跑同类工具，也未评测研究效果。合集中的项目说明用于发现对象，结论以各项目自身文件为依据。分析覆盖的是所列版本与文件。

## 推荐定位

**把别人的设计，变成自己的研究启发。**

ResearchLens 围绕已有论文、系统或技术方案，追问设计动机与底层假设，解释核心创新的因果机制，查证学术依据，并把可借鉴的原理、条件和未解决问题带回用户的工作。最值得展示的是：

1. **问题牵引。** 先确定要回答的命题、机制或设计决策，按对象和问题选择分析框架。
2. **逐项深析。** 将核心创新或设计决策作为独立分析单元，研究前提、替代方案、因果路径、证据和边界。
3. **有依据的迁移。** 把机制与已有概念建立对应，明确文献支持或综合推断，以及映射限制和适用条件。
4. **可回查的调研过程。** 主 agent 维护问题与状态，子 agent 返回证据和候选，只对影响判断的缺口继续投入。

这些是对当前 [SKILL.md](../SKILL.md)、[论文配置](../config-paper.md)、[系统配置](../config-system.md)、[技术配置](../config-tech.md)和 [tasks/](../tasks/) 的归纳。它们是设计定位，实际价值应由具体案例展示和任务评测验证。

## 六个相关项目

### 1. Nature Skills：nature-paper-xray / nature-reader

这是最接近的论文理解方向。Paper X-Ray 追溯设计动机，区分关键设计与装饰性选择，以数值微例子解释公式，并检查证据的支持范围。它明确把文献搜索、引用验证和审稿分配给相邻 skills。Reader 则负责与来源对齐的双语阅读材料。

因此，深读、机制解释和证据边界已有直接近邻。ResearchLens 更适合强调：论文、系统和技术方案的共同分析框架；围绕问题推进外部查证；从已有对象提炼有条件的迁移原则。

来源：[Paper X-Ray 协议](https://github.com/Yuan1z0825/nature-skills/blob/163c4971ae9e8ff374e667a25146a1e3a572e5c7/skills/nature-paper-xray/SKILL.md)、[Reader 入口](https://github.com/Yuan1z0825/nature-skills/blob/163c4971ae9e8ff374e667a25146a1e3a572e5c7/skills/nature-reader/SKILL.md)。最值得借鉴的是具体的读者承诺、实际数值案例和清楚的任务边界。

### 2. Academic Research Skills：deep-research

它覆盖研究问题、文献检索、来源验证、跨来源综合、报告、评审和多种研究模式。其中的 WHY/HOW/WHAT 模式已经支持论文比较；其反方角色也要求挑战假设、寻找替代解释和冲突证据。

ResearchLens 可以强调围绕具体机制和设计决策形成可复用理解，避免把完整学术流水线当作自己的主要承诺。证据检查、分阶段和多 agent 都是共享能力，不能作为单独的独有卖点。

来源：[Deep Research 协议](https://github.com/Imbad0202/academic-research-skills/blob/ebc21bf2429643fe4c2495aa99e1bbacd926772b/deep-research/SKILL.md)、[项目 README](https://github.com/Imbad0202/academic-research-skills/blob/ebc21bf2429643fe4c2495aa99e1bbacd926772b/README.md)。可借鉴真实产物展示、任务模式和明确的验证范围。

### 3. Feynman：deep-research / research-review

Feynman 的 skill 入口调用实际命令工作流。deepresearch 包含规划、按规模选择直接检索或研究子任务、草稿、引用验证、审查、交付及 provenance 文件。README 提供多个研究命令与具体产物。

它已经具有问题拆分、按规模调度、主 agent 综合和可追溯来源。ResearchLens 的特色应落在机制分析与迁移判断的具体内容，以及对象配置如何帮助分析不同材料。Feynman 的 CLI 和来源连接能力也不能由本仓库的提示词等价替代。

来源：[工作流](https://github.com/companion-inc/feynman/blob/383af20af4b0ba93568f354c0318ea6b564eb92b/prompts/deepresearch.md)、[入口](https://github.com/companion-inc/feynman/blob/383af20af4b0ba93568f354c0318ea6b564eb92b/skills/deep-research/SKILL.md)、[审查入口](https://github.com/companion-inc/feynman/blob/383af20af4b0ba93568f354c0318ea6b564eb92b/skills/research-review/SKILL.md)、[README](https://github.com/companion-inc/feynman/blob/383af20af4b0ba93568f354c0318ea6b564eb92b/README.md)。可借鉴简洁的命令示例和明确的最终产物。

### 4. Research Companion：research-companion

它从研究者的兴趣和约束出发，经过发散、评价、深入、表达和决策阶段，产出方向与推进判断。跨领域连接和挑战假设已经是其明确重点。

ResearchLens 更适合已有对象：读一篇论文或分析一个系统后，把机制、证据和限制组织清楚，再判断能否迁移。它可以为构思提供理解材料，但当前主流程的承诺应围绕分析对象。

来源：[Skill 协议](https://github.com/andrehuang/research-companion/blob/733e9e8e1ae798e2752b1fc7b829fa8f0904b885/skills/research-companion/SKILL.md)、[README](https://github.com/andrehuang/research-companion/blob/733e9e8e1ae798e2752b1fc7b829fa8f0904b885/README.md)。可借鉴从用户痛点切入、用具体决策说明价值的表达方式。

### 5. ARIS：research-review

ARIS 的研究互审通过外部 reviewer 后端执行，并保留多轮对话和研究上下文，强调可行动的反馈与改善。README 还覆盖构思、实验和研究流水线。

ResearchLens 规定子任务独立查证和主 agent 调度，但这不自动构成跨模型审查。宣传可以陈述任务分工、证据回查和范围控制，不应把不同上下文包装成已经证明有效的独立判断。

来源：[Review 协议](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/blob/26b95cfa0d8747078e9e43b42e20952709e561b8/skills/research-review/SKILL.md)、[README](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep/blob/26b95cfa0d8747078e9e43b42e20952709e561b8/README.md)。可借鉴真实研究产物与连续改进过程的展示。

### 6. Academic Skills：paper-reading

它通过固定叙事角色、生活类比、章节导览、公式图表解读与专家点评帮助用户建立直观理解。它的辨识度来自鲜明的教学表达，而不仅是研究步骤。

ResearchLens 可以保持严谨的研究笔记风格，重点展示关键单元的分析链、依据强度和有边界的迁移判断。两者服务的阅读体验与使用目的不同。

来源：[Paper Reading 协议](https://github.com/voidful/academic-skills/blob/71e9c42c60636602e87985f4306d134a3b63809e/paper-reading/SKILL.md)、[README](https://github.com/voidful/academic-skills/blob/71e9c42c60636602e87985f4306d134a3b63809e/README.md)。可借鉴让产物风格和目标用户一眼可辨的方式。

## 与自动实验工具的关系

[Karpathy autoresearch](https://github.com/karpathy/autoresearch) 使用固定预算训练、评测与保留/丢弃循环来优化指标。ResearchLens 的主要反馈是证据是否支持某项判断，其交付物是理解和分析笔记。

可以把 ResearchLens 定位为实验前假设澄清、实验后结果解释的配套工具。这是适用场景判断；当前仓库没有把笔记自动交给某个实验执行器的集成。

## 名称与页面表达

推荐名称 **ResearchLens**。Lens 表达透过材料看清设计背后的原理；主文案强调用户收获，具体特色用设计动机、创新机制、学术查证和原理迁移支撑。

### 可直接使用的宣传文案

**一句话介绍**

ResearchLens：把别人的设计，变成自己的研究启发。

**项目介绍**

ResearchLens 是一个面向论文、开源系统与技术方案的深度研究分析 skill。它从基本假设和替代方案追问设计动机，逐项拆解核心创新的因果机制，查证文献与反例，再把有依据的跨领域联系和迁移条件整理成研究笔记，帮助你继续思考自己的问题。

**分享文案**

读完一篇论文，我常常还想继续追问：为什么偏偏这样设计？某个改动到底通过什么机制起作用？如果换一个研究场景，哪些思路仍然成立？ResearchLens 围绕这些问题组织分析：理解原对象、拆解核心机制、查证学术依据，再提炼能带进自己工作的原理和待验证假设。适合想把阅读收获用于研究和系统设计的人。

**英文短介绍**

ResearchLens turns papers and system designs into research insights through design reasoning, causal analysis, evidence checks, and transferable principles.

首页优先展示用户会得到的分析、一个可回查示例和首次使用路径。多轮、状态字段、任务目录和内部术语放在方法说明与折叠区。

当前首页以深墨绿、浅绿与暖铜色的动态透镜表现“从材料到可迁移原理”。README 使用同一实时场景导出的 GIF，点击可进入交互页面，设计与维护说明见 [animation-design.md](animation-design.md)。另保留 GPT 网页版静态素材的[提示词](image-prompts.md)。

## 本次修正的说明

原 README 的“只有三轮”与当前协议中后续深化的规定不一致；新版按研究动作描述过程，以实际协议为准。安装说明改为保留核心文件、配置与任务目录。原 README 提到的独立 evidence ledger / stop-challenge 文件，在当前入口中缺少对应的完整规定，新版使用实际存在的状态跟踪与核查规则描述能力。

示例为人工整理的规则讲解，明确标注未实跑。后续最有价值的宣传材料，是在同一问题、材料和预算下，公开一个完整实际案例：输入、关键分析单元、证据、最终笔记，以及仍未解决的部分。

[返回首页](../README.md)
