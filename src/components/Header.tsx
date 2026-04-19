import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "模型", href: "#models" },
  { label: "定价", href: "#pricing" },
  { label: "文档", href: "#docs" },
  { label: "博客", href: "#blog" },
  { label: "关于", href: "#about" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed left-0 right-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
      style={{ top: "var(--announcement-bar-height, 45px)" }}
    >
      <div className="container-tight flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="font-bold">O</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">ofox.ai</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            登录
          </a>
          <a href="#" className="btn-primary !px-4 !py-2 text-sm">
            注册
          </a>
        </div>

        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container-tight flex flex-col gap-4 py-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-base font-medium">
                {l.label}
              </a>
            ))}
            <a href="#" className="btn-primary mt-2 text-sm">
              注册
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
