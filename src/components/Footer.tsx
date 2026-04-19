const cols = [
  {
    title: "产品",
    links: ["模型", "API 文档", "Playground", "状态页", "更新日志"],
  },
  {
    title: "热门模型",
    links: ["GPT-4o", "Claude 3.7 Sonnet", "Gemini 2.5 Pro", "DeepSeek-V3", "Qwen-Max"],
  },
  {
    title: "模型厂商",
    links: ["OpenAI", "Anthropic", "Google", "DeepSeek", "Mistral"],
  },
  {
    title: "资源",
    links: ["博客", "帮助中心", "社区", "联系我们", "服务条款"],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-tight py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="/" className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <span className="font-bold">O</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                ofox.ai
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              3 分钟接入世界模型。官方渠道，稳定高速不限量。
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ofox.ai · All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">隐私政策</a>
            <a href="#" className="hover:text-foreground">服务条款</a>
            <a href="#" className="hover:text-foreground">EN / 中文</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
