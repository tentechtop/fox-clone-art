import { useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";

const samples = {
  OpenAI: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.ofox.ai/v1",
    api_key="<OFOXAI_API_KEY>"
)

response = client.chat.completions.create(
    model="openai/gpt-5.4",
    messages=[{"role": "user", "content": "Hello!"}]
)`,
  Anthropic: `from anthropic import Anthropic

client = Anthropic(
    base_url="https://api.ofox.ai/anthropic",
    api_key="<OFOXAI_API_KEY>"
)

message = client.messages.create(
    model="claude-3-7-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)`,
  Gemini: `from google import genai

client = genai.Client(
    api_key="<OFOXAI_API_KEY>",
    http_options={"base_url": "https://api.ofox.ai/gemini"}
)

response = client.models.generate_content(
    model="gemini-2.5-pro",
    contents="Hello!"
)`,
} as const;

type Tab = keyof typeof samples;

const tokenize = (line: string) => {
  // very small syntax highlighter
  const parts: Array<{ t: string; c?: string }> = [];
  const regex = /("[^"]*"|#[^\n]*|\b(from|import|def|class|return|for|in|if|else|None|True|False)\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(line)) !== null) {
    if (m.index > last) parts.push({ t: line.slice(last, m.index) });
    const tok = m[0];
    let cls = "";
    if (tok.startsWith('"')) cls = "text-[hsl(var(--code-string))]";
    else if (tok.startsWith("#")) cls = "text-[hsl(var(--code-comment))] italic";
    else cls = "text-[hsl(var(--code-keyword))] font-medium";
    parts.push({ t: tok, c: cls });
    last = m.index + tok.length;
  }
  if (last < line.length) parts.push({ t: line.slice(last) });
  return parts;
};

export const Hero = () => {
  const [tab, setTab] = useState<Tab>("OpenAI");
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(samples[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="container-tight relative">
        <h1 className="text-balance text-center text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          3 分钟，接入{" "}
          <span className="relative inline-block text-primary">
            世界模型
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded bg-primary/70" />
          </span>
        </h1>

        <p className="mt-6 text-center text-lg text-muted-foreground sm:text-xl">
          <span className="font-medium text-primary">官方渠道</span>
          <span className="mx-2 text-muted-foreground/50">·</span>
          稳定高速不限量
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#" className="btn-primary group">
            获取 API Key
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#models" className="btn-ghost">
            探索模型
          </a>
        </div>

        {/* Code preview card */}
        <div
          className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-border bg-[hsl(var(--code-bg))]"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between border-b border-border/70 bg-background/50 px-3 py-2">
            <div className="flex items-center gap-1">
              {(Object.keys(samples) as Tab[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    tab === k
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
              )}
            </button>
          </div>

          <pre className="overflow-x-auto px-5 py-5 text-left text-[13px] leading-relaxed text-[hsl(var(--code-fg))]">
            <code>
              {samples[tab].split("\n").map((line, i) => (
                <div key={i}>
                  {tokenize(line).map((p, j) =>
                    p.c ? (
                      <span key={j} className={p.c}>
                        {p.t}
                      </span>
                    ) : (
                      <span key={j}>{p.t}</span>
                    )
                  )}
                  {line === "" && "\u00A0"}
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6 text-center">
          {[
            { v: "100+", l: "顶级模型" },
            { v: "99.9%", l: "可用性" },
            { v: "~300ms", l: "延迟" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
