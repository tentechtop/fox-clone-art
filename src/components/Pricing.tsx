import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    note: "注册即送试用额度",
    features: [
      "全模型访问",
      "标准速率限制",
      "社区支持",
      "用量仪表盘",
    ],
    cta: "立即注册",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "按量计费",
    note: "官方价 + 极低加价",
    features: [
      "100+ 顶级模型",
      "更高速率限制",
      "优先技术支持",
      "团队协作 & 多 Key",
      "详细调用日志",
    ],
    cta: "获取 API Key",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "定制",
    note: "专属通道与 SLA",
    features: [
      "私有化部署选项",
      "企业级 SLA 99.99%",
      "专属客户经理",
      "发票与合同支持",
    ],
    cta: "联系销售",
    highlighted: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="border-t border-border/60 py-24">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            定价
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            透明定价，按用量付费
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            零月费、零预付，随时升级，随时停止。
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border p-7 transition-all ${
                t.highlighted
                  ? "border-primary bg-card"
                  : "border-border bg-card"
              }`}
              style={{
                boxShadow: t.highlighted
                  ? "var(--shadow-card)"
                  : "var(--shadow-soft)",
              }}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  推荐
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {t.price}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>

              <a
                href="#"
                className={
                  t.highlighted
                    ? "btn-primary mt-6 w-full"
                    : "btn-ghost mt-6 w-full"
                }
              >
                {t.cta}
              </a>

              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
