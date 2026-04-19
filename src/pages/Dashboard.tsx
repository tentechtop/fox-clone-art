import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Key, 
  BarChart3, 
  DollarSign, 
  FileText, 
  CreditCard, 
  Gift, 
  Store, 
  BookOpen,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("openai");

  const menuItems = [
    { icon: LayoutDashboard, label: "概览", active: true },
    { icon: Key, label: "API Keys" },
    { icon: BarChart3, label: "用量" },
    { icon: DollarSign, label: "费用" },
    { icon: FileText, label: "请求明细" },
    { icon: CreditCard, label: "我的钱包" },
    { icon: Gift, label: "推荐计划", active: true, highlight: true },
    { icon: Store, label: "模型广场" },
    { icon: BookOpen, label: "开发文档" },
  ];

  const stats = [
    { label: "请求总数", value: "0", icon: "#" },
    { label: "总 Tokens", value: "0", icon: "🗪" },
    { label: "缓存读取", value: "0", icon: "🫙" },
    { label: "总费用", value: "$0", icon: "$", currency: "USD" },
    { label: "平均延迟", value: "0", icon: "🕐", unit: "ms" },
    { label: "平均吞吐量", value: "0", icon: "〰️", unit: "tps" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("https://api.ofox.ai/v1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* 侧边栏 */}
      <aside 
        className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 flex flex-col border-r border-border bg-white`}
      >
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
            RT
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="font-semibold text-sm">redstar's Team</p>
              <p className="text-xs text-muted-foreground">1062467713-ebyxup</p>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <ChevronRight className="h-4 w-4 rotate-180" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active 
                    ? 'bg-neutral-100 text-foreground font-medium' 
                    : 'text-muted-foreground hover:bg-neutral-50 hover:text-foreground'
                } ${item.highlight ? 'bg-red-50/50 text-red-700' : ''}`}
              >
                <item.icon className={`h-5 w-5 ${item.highlight ? 'text-red-600' : ''}`} />
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && item.label === "模型广场" && (
                  <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
                )}
                {sidebarOpen && item.label === "开发文档" && (
                  <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        {sidebarOpen && (
          <div className="p-4">
            <p className="text-xs text-muted-foreground text-center">v1.0.56-20260415.2125</p>
          </div>
        )}

        {sidebarOpen && (
          <div className="p-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-neutral-900 to-emerald-600 text-white relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-50">✨</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-lg">🪐</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">GPT 返赠 25%</p>
                  <p className="text-xs opacity-80">返 $250 • 限时 11 天</p>
                </div>
                <Button 
                  size="icon" 
                  className="h-8 w-8 bg-white/20 hover:bg-white/30"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex justify-center gap-1">
                <div className="w-6 h-1 bg-white rounded-full" />
                <div className="w-6 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        )}

        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-50">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-pink-200 to-blue-200">
                    🌟
                  </AvatarFallback>
                </Avatar>
                {sidebarOpen && (
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">redstar</p>
                    <p className="text-xs text-muted-foreground">1062467713@qq.com</p>
                  </div>
                )}
                {sidebarOpen && <ChevronRight className="h-4 w-4 opacity-50" />}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => signOut()}>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* 主内容 */}
      <main className="flex-1 flex flex-col">
        {/* 顶部导航 */}
        <header className="h-16 border-b border-border bg-white/50 backdrop-blur-sm flex items-center px-6 gap-4">
          <Button variant="ghost" size="icon">
            <div className="h-4 w-4 border-l-2 border-t-2 border-foreground" />
          </Button>
          <div className="flex items-center gap-4">
            <a href="#" className="text-emerald-600 font-medium text-sm hover:underline flex items-center gap-1">
              <span className="text-lg">⚡</span>
              GPT 四月活动
            </a>
            <a href="#" className="text-orange-600 font-medium text-sm hover:underline flex items-center gap-1">
              <span className="text-lg">🔌</span>
              立即接入
            </a>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-sm">
              <span className="mr-1">✒️</span>
              博客
            </Button>
            <Button variant="ghost" size="sm" className="text-sm">
              CN
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 问候 */}
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">晚上好，redstar</h1>
              <p className="text-muted-foreground">2026年4月19日星期日 · 你的团队本周表现不错</p>
            </div>

            {/* GPT 活动横幅 */}
            <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-teal-600" />
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-900 to-emerald-700 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🪐</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-700 font-medium">GPT × OFOX.AI</span>
                      <span className="text-sm text-neutral-600">GPT 四月</span>
                    </div>
                    <p className="text-lg font-semibold text-neutral-900 mt-1">
                      用 GPT 加速，奖励实在
                      <span className="ml-2 inline-block bg-neutral-900 text-white text-xs px-2 py-0.5 rounded">
                        GPT 全系列返赠最高 $250
                      </span>
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      GPT 消耗 25% 返赠，消耗越多返得越多 · 限时 11 天
                    </p>
                  </div>
                  <Button className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full">
                    查看活动详情
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">已消耗</span>
                    <span className="font-semibold text-emerald-700">$0.00</span>
                    <span className="text-muted-foreground ml-auto">下一档: $20 (还差 $20.00)</span>
                  </div>
                  <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                    <div className="absolute inset-0 flex justify-between items-center px-1">
                      {[0, 20, 50, 100, 200, 500, 1000].map((v, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>$0</span>
                    <span>$20</span>
                    <span>$50</span>
                    <span>$100</span>
                    <span>$200</span>
                    <span>$500</span>
                    <span>$1000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 本周概览 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">本周概览</CardTitle>
                <Button variant="ghost" size="sm" className="text-sm">
                  查看详情
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {stats.map((stat, idx) => (
                    <Card key={idx} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <span>{stat.icon}</span>
                          <span>{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {stat.value}
                          {stat.currency && <span className="text-sm font-normal ml-1">{stat.currency}</span>}
                          {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快捷卡片 */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                      <span className="text-xl">💳</span>
                    </div>
                    <div>
                      <p className="font-medium">钱包</p>
                      <p className="text-sm text-muted-foreground">余额查看与充值</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                      <span className="text-xl">🔑</span>
                    </div>
                    <div>
                      <p className="font-medium">创建 API Key</p>
                      <p className="text-sm text-muted-foreground">获取密钥，调用 100+ 模型</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快速接入 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-xl">快速接入</CardTitle>
                  <p className="text-sm text-muted-foreground">选择协议，复制代码，开始调用</p>
                </div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap justify-center gap-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-neutral-100">
                      <TabsTrigger value="openai" className="data-[state=active]:bg-white">
                        <span className="mr-1.5">🪐</span>
                        OpenAI
                      </TabsTrigger>
                      <TabsTrigger value="anthropic" className="data-[state=active]:bg-white">
                        <span className="mr-1.5">🔘</span>
                        Anthropic
                      </TabsTrigger>
                      <TabsTrigger value="gemini" className="data-[state=active]:bg-white">
                        <span className="mr-1.5">🔵</span>
                        Gemini
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center gap-4 px-6 py-3 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-sm font-medium text-muted-foreground">BASE URL</span>
                    <code className="font-mono text-sm">https://api.ofox.ai/v1</code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleCopy}
                      className="hover:bg-red-100"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" className="bg-neutral-100">Python</Button>
                  <Button variant="ghost">Node.js</Button>
                  <Button variant="ghost">cURL</Button>
                  <Button variant="ghost" className="ml-auto" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-neutral-950 rounded-xl p-4 font-mono text-sm text-white overflow-x-auto">
                  <div className="text-red-400">from openai import OpenAI</div>
                  <div className="mt-2">client = OpenAI(</div>
                  <div className="pl-4 text-blue-300">api_key="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",</div>
                  <div className="pl-4 text-blue-300">base_url="https://api.ofox.ai/v1"</div>
                  <div>)</div>
                  <div className="mt-4">response = client.chat.completions.create(</div>
                  <div className="pl-4 text-blue-300">model="gpt-4o",</div>
                  <div className="pl-4">messages=[</div>
                  <div className="pl-8">{"{"}</div>
                  <div className="pl-12 text-green-400">"role": "user",</div>
                  <div className="pl-12 text-green-400">"content": "写一个 Python 爬虫"</div>
                  <div className="pl-8">{"}"}</div>
                  <div className="pl-4">]</div>
                  <div>)</div>
                  <div className="mt-2">print(response.choices[0].message.content)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Dashboard;
