import { Zap, Shield, Globe2, Code2, BarChart3, Wallet } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "极速响应",
    desc: "全球边缘节点加速，平均延迟 ~300ms，比直连更快。",
  },
  {
    icon: Shield,
    title: "稳定可靠",
    desc: "99.9% SLA，多通道智能路由与自动故障转移。",
  },
  {
    icon: Globe2,
    title: "100+ 模型",
    desc: "OpenAI、Anthropic、Gemini、DeepSeek 等一键直连。",
  },
  {
    icon: Code2,
    title: "OpenAI 兼容",
    desc: "完全兼容 OpenAI SDK，更换 base_url 即可迁移。",
  },
  {
    icon: BarChart3,
    title: "用量监控",
    desc: "实时仪表盘、按 Key 维度统计、详细调用日志。",
  },
  {
    icon: Wallet,
    title: "按量计费",
    desc: "无月费、无预付，用多少付多少，随时查看明细。",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            为什么选择 ofox.ai
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            一个 API Key，接入整个 AI 世界
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            官方渠道、稳定高速、按量计费，专为开发者和团队设计。
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
