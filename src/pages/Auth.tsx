import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";

const authSchema = z.object({
  email: z.string().trim().email({ message: "请输入有效的邮箱地址" }).max(255),
  password: z.string().min(6, { message: "密码至少需要 6 位" }).max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate("/dashboard", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = authSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: "输入有误", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast({ title: "注册成功", description: "请查收邮箱验证链接（或直接登录）。" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast({ title: "登录成功", description: "欢迎回到 ofox.ai" });
          navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      const msg = err?.message ?? "请稍后再试";
      const friendly =
        msg.includes("Invalid login") ? "邮箱或密码不正确" :
        msg.includes("already registered") ? "该邮箱已注册，请直接登录" :
        msg;
      toast({ title: tab === "signup" ? "注册失败" : "登录失败", description: friendly, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24" style={{ paddingTop: "calc(45px + 6rem)" }}>
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">欢迎使用 ofox.ai</h1>
            <p className="mt-2 text-sm text-muted-foreground">登录或创建账户以开始使用</p>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">登录</TabsTrigger>
              <TabsTrigger value="signup">注册</TabsTrigger>
            </TabsList>

            <TabsContent value={tab} className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={tab === "signup" ? "new-password" : "current-password"}
                    placeholder="至少 6 位"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "处理中…" : tab === "signup" ? "创建账户" : "登录"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            返回{" "}
            <Link to="/" className="font-medium text-foreground hover:underline">
              首页
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
