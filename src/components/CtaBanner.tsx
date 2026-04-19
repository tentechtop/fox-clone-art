import { ArrowRight } from "lucide-react";

export const CtaBanner = () => {
  return (
    <section className="py-24">
      <div className="container-tight">
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, hsl(var(--primary) / 0.18), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              准备好接入<span className="text-primary">世界模型</span>了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              注册即送体验额度，3 分钟完成集成。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="btn-primary group">
                免费开始
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#" className="btn-ghost">
                阅读文档
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
