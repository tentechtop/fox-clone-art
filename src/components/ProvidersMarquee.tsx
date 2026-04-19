const providers = [
  { name: "OpenAI", emoji: "🟢" },
  { name: "Claude", emoji: "🟠" },
  { name: "Gemini", emoji: "🔷" },
  { name: "DeepSeek", emoji: "🐳" },
  { name: "Qwen", emoji: "🟣" },
  { name: "Kimi", emoji: "🌙" },
  { name: "Doubao", emoji: "🎵" },
  { name: "GLM", emoji: "🧠" },
  { name: "Mistral", emoji: "🟥" },
  { name: "Llama", emoji: "🦙" },
];

export const ProvidersMarquee = () => {
  const list = [...providers, ...providers];
  return (
    <section className="border-y border-border/60 bg-background/40 py-14">
      <p className="container-tight text-center text-sm text-muted-foreground sm:text-base">
        全球主流云厂商官方授权服务商，
        <span className="font-medium text-foreground">100+</span> 大模型一站接入
      </p>
      <div className="marquee mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {list.map((p, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-5 py-2.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="text-xl">{p.emoji}</span>
              <span className="text-base font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
