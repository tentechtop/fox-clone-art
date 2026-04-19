import { Sparkles } from "lucide-react";

export const AnnouncementBar = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] w-full border-b py-2.5 px-4"
      style={{
        backgroundColor: "hsl(var(--announce-bg))",
        borderBottomColor: "hsl(var(--announce) / 0.4)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <span
          className="truncate text-[11px] font-medium sm:text-sm"
          style={{ color: "hsl(var(--announce))" }}
        >
          🎁 GPT 系列消耗返赠 25%
          <Sparkles className="mx-1 inline-block h-3 w-3 align-middle" />
          最高 $250，限时 11 天！
        </span>
        <a
          href="#"
          className="flex flex-shrink-0 items-center gap-1 font-semibold transition-opacity hover:opacity-80"
          style={{ color: "hsl(var(--announce))" }}
        >
          <span className="hidden text-sm underline underline-offset-2 sm:inline">
            查看详情 →
          </span>
        </a>
      </div>
    </div>
  );
};
