import { useState, useEffect } from "react";
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
  ArrowUpRight,
  Plus,
  RefreshCw,
  MoreVertical,
  Calendar,
  Search,
  Download,
  Trash2,
  Settings,
  Zap,
  Package,
  Table,
  Users
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type PageType = "overview" | "api-keys" | "usage" | "cost" | "requests" | "wallet" | "referral" | "models" | "docs";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("openai");
  const [currentPage, setCurrentPage] = useState<PageType>("overview");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  // 自动轮动
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "概览", id: "overview" as PageType },
    { icon: Key, label: "API Keys", id: "api-keys" as PageType },
    { icon: BarChart3, label: "用量", id: "usage" as PageType },
    { icon: DollarSign, label: "费用", id: "cost" as PageType },
    { icon: FileText, label: "请求明细", id: "requests" as PageType },
    { icon: CreditCard, label: "我的钱包", id: "wallet" as PageType },
    { icon: Gift, label: "推荐计划", id: "referral" as PageType, highlight: true },
    { icon: Store, label: "模型广场", id: "models" as PageType },
    { icon: BookOpen, label: "开发文档", id: "docs" as PageType },
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

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* 侧边栏 */}
      <aside
        className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 flex flex-col border-r border-border bg-white`}
      >
        <div className="p-4 flex items-center gap-3">
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                RT
              </div>
              {sidebarOpen && (
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">redstar's Team</p>
                  <p className="text-xs text-muted-foreground">1062467713-ebyxup</p>
                </div>
              )}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-2"
            >
              {sidebarOpen ? <ChevronRight className="h-4 w-4 rotate-180" /> : <Menu className="h-4 w-4" />}
            </Button>

            {/* 团队下拉菜单 */}
            {showTeamDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground px-3 py-2">团队</p>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
                      RT
                    </div>
                    <span className="text-sm font-medium">redstar's Team</span>
                    <div className="ml-auto text-green-500">
                      <Check className="h-4 w-4" />
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50">
                    <div className="w-8 h-8 rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold text-xs">
                      T
                    </div>
                    <span className="text-sm font-medium">tuan1</span>
                  </button>
                  <Separator className="my-2" />
                  <button
                    onClick={() => {
                      setShowTeamDropdown(false);
                      setShowTeamModal(true);
                    }}
                    className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 text-blue-600"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm font-medium">创建团队</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  currentPage === item.id
                    ? 'bg-neutral-100 text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-neutral-50 hover:text-foreground'
                } ${item.highlight && currentPage !== item.id ? 'bg-red-50/50 text-red-700 hover:bg-red-100' : ''}`}
              >
                <item.icon className={`h-5 w-5 ${item.highlight && currentPage !== item.id ? 'text-red-600' : ''}`} />
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && (item.label === "模型广场" || item.label === "开发文档") && (
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
                  {currentSlide === 0 ? (
                    <>
                      <p className="font-semibold text-sm">GPT 返赠 25%</p>
                      <p className="text-xs opacity-80">返 $250 • 限时 11 天</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-sm">新用户专享</p>
                      <p className="text-xs opacity-80">首充 $10 送 $5 • 限时活动</p>
                    </>
                  )}
                </div>
                <Button
                  size="icon"
                  className="h-8 w-8 bg-white/20 hover:bg-white/30"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex justify-center gap-1">
                <div
                  className={`w-6 h-1 rounded-full cursor-pointer transition-all ${currentSlide === 0 ? 'bg-white' : 'bg-white/30'}`}
                  onClick={() => setCurrentSlide(0)}
                />
                <div
                  className={`w-6 h-1 rounded-full cursor-pointer transition-all ${currentSlide === 1 ? 'bg-white' : 'bg-white/30'}`}
                  onClick={() => setCurrentSlide(1)}
                />
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
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* 概览页面 */}
            {currentPage === "overview" && (
              <>
                {/* 问候 */}
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">晚上好，redstar</h1>
                  <p className="text-muted-foreground">2026年4月19日星期日 · 你的团队本周表现不错</p>
                </div>

                {/* GPT 活动横幅 */}
                <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 overflow-hidden">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 cursor-pointer" onClick={() => setCurrentPage("wallet")}>
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                          <span className="text-xl">💳</span>
                        </div>
                        <div>
                          <p className="font-medium">钱包</p>
                          <p className="text-sm text-muted-foreground">余额查看与充值</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 cursor-pointer" onClick={() => setCurrentPage("api-keys")}>
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
              </>
            )}

            {/* API Keys 页面 */}
            {currentPage === "api-keys" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">API Keys</h1>
                  <p className="text-muted-foreground">管理 API Keys，通过网关访问 100+ 模型</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>1 个 API Key，归属于</span>
                    <span className="font-semibold">redstar's Team</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      刷新
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                      <Plus className="h-4 w-4 mr-2" />
                      创建 API Key
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">codex</span>
                            <span className="text-sm text-muted-foreground">由你</span>
                          </div>
                          <code className="text-sm font-mono text-muted-foreground">sk-of-QPoBop••••••••</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-orange-600">0 次调用</div>
                        <div className="text-sm text-muted-foreground">未使用</div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">已启用</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>复制</DropdownMenuItem>
                            <DropdownMenuItem>重新生成</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 用量页面 */}
            {currentPage === "usage" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">用量</h1>
                  <p className="text-muted-foreground">请求量、Token 消耗与缓存效率</p>
                </div>

                <div className="flex gap-4 mb-6">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    模型
                  </Button>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    API Key
                  </Button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline">天</Button>
                    <Button variant="outline" className="bg-white">小时</Button>
                    <Button variant="outline">近 24 小时</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 mb-6">
                  {["请求总量", "成功请求", "失败请求", "平均延迟", "吞吐量", "总 Tokens", "输入 Tokens", "缓存读取", "输出 Tokens", "联网搜索"].map((item, idx) => (
                    <Card key={idx} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          {idx === 0 && <span>#</span>}
                          {idx === 1 && <span className="text-green-500">✓</span>}
                          {idx === 2 && <span className="text-red-500">✕</span>}
                          {idx === 3 && <span>🕐</span>}
                          {idx === 4 && <span>〰️</span>}
                          {idx === 5 && <span className="text-purple-500">🗪</span>}
                          {idx === 6 && <span className="text-emerald-500">↙️</span>}
                          {idx === 7 && <span className="text-orange-500">🫙</span>}
                          {idx === 8 && <span className="text-amber-500">↗️</span>}
                          {idx === 9 && <span className="text-blue-500">🌐</span>}
                          <span>{item}</span>
                        </div>
                        <p className="text-4xl font-bold">0</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Tabs defaultValue="tokens">
                        <TabsList className="bg-neutral-100">
                          <TabsTrigger value="tokens" className="data-[state=active]:bg-white">Tokens</TabsTrigger>
                          <TabsTrigger value="requests" className="data-[state=active]:bg-white">请求量</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>模型排行</CardTitle>
                      <Tabs defaultValue="tokens">
                        <TabsList className="bg-neutral-100">
                          <TabsTrigger value="tokens" className="data-[state=active]:bg-white">Tokens</TabsTrigger>
                          <TabsTrigger value="requests" className="data-[state=active]:bg-white">请求量</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 费用页面 */}
            {currentPage === "cost" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">费用</h1>
                  <p className="text-muted-foreground">按模型和 API Key 查看费用明细</p>
                </div>

                <div className="flex gap-4 mb-6 flex-wrap">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    模型
                  </Button>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    API Key
                  </Button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline">天</Button>
                    <Button variant="outline" className="bg-white">小时</Button>
                    <Button variant="outline">近 24 小时</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  {[
                    { label: "总费用", value: "$0.00", currency: "USD", color: "text-orange-600" },
                    { label: "输入费用", value: "$0.00", currency: "USD", color: "text-emerald-600" },
                    { label: "输出费用", value: "$0.00", currency: "USD", color: "text-amber-600" },
                    { label: "搜索费用", value: "$0.00", currency: "USD", color: "text-blue-600" },
                    { label: "图片费用", value: "$0.00", currency: "USD", color: "text-purple-600" }
                  ].map((stat, idx) => (
                    <Card key={idx} className="border-border">
                      <CardContent className="p-4">
                        <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-1 ${stat.color}`}>
                          {idx === 0 && <span>$</span>}
                          {idx === 1 && <span>↙️</span>}
                          {idx === 2 && <span>↗️</span>}
                          {idx === 3 && <span>🌐</span>}
                          {idx === 4 && <span>🖼️</span>}
                          <span>{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}<span className="text-sm font-normal ml-1">{stat.currency}</span></p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>模型费用</CardTitle>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>模型费用 TOP 10</CardTitle>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 请求明细页面 */}
            {currentPage === "requests" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">请求记录</h1>
                  <p className="text-muted-foreground">查看 API 请求明细和费用明细</p>
                </div>

                <div className="flex gap-4 mb-6 flex-wrap">
                  <Tabs defaultValue="all">
                    <TabsList className="bg-neutral-100">
                      <TabsTrigger value="all" className="data-[state=active]:bg-white">全部</TabsTrigger>
                      <TabsTrigger value="success" className="data-[state=active]:bg-white">成功</TabsTrigger>
                      <TabsTrigger value="failed" className="data-[state=active]:bg-white">失败</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    模型
                  </Button>
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    API Key
                  </Button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <span>2026-04-06 - 2026-04-19</span>
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Table className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="border-b p-4 flex items-center text-sm text-muted-foreground gap-4 flex-wrap">
                      <div className="w-24 sm:w-32">时间</div>
                      <div className="w-32 sm:w-48">模型 | API 协议</div>
                      <div className="w-20 sm:w-24">输入</div>
                      <div className="w-20 sm:w-24">输出</div>
                      <div className="w-20 sm:w-24">缓存读取</div>
                      <div className="w-20 sm:w-24">缓存写入</div>
                      <div className="w-20 sm:w-24">搜索</div>
                      <div className="w-20 sm:w-24">总 Tokens</div>
                      <div className="w-20 sm:w-24 flex items-center gap-1">延迟 <ArrowUpRight className="h-3 w-3" /></div>
                      <div className="w-20 sm:w-24 flex items-center gap-1">总费用 <ArrowUpRight className="h-3 w-3" /></div>
                    </div>
                    <div className="p-8 flex items-center justify-center text-muted-foreground bg-neutral-50">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 我的钱包页面 */}
            {currentPage === "wallet" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">我的钱包</h1>
                  <p className="text-muted-foreground">余额充值、消费明细与支付方式管理</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">赠送金</p>
                      <p className="text-4xl font-bold text-indigo-700">$0.00</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">充值金</p>
                      <p className="text-4xl font-bold text-green-700">$0.00</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">账户总余额</p>
                      <p className="text-4xl font-bold text-blue-700">$0.00</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>快捷充值</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {[
                        { amount: "$10", price: "¥72", bonus: "" },
                        { amount: "$50", price: "¥360", bonus: "+ $3.00" },
                        { amount: "$100", price: "¥720", bonus: "+ $8.00" },
                        { amount: "$500", price: "¥3,600", bonus: "+ $60.00" }
                      ].map((item, idx) => (
                        <Button key={idx} variant="outline" className="h-auto py-4 flex-col">
                          <span className="text-lg font-bold">{item.amount}</span>
                          <span className="text-sm text-muted-foreground">{item.price}</span>
                          {item.bonus && <span className="text-xs text-green-600">{item.bonus}</span>}
                        </Button>
                      ))}
                    </div>
                    <div className="mb-4">
                      <div className="flex gap-2 mb-2">
                        <span>$</span>
                        <Input placeholder="输入金额" />
                      </div>
                      <p className="text-sm text-muted-foreground">预计支付 ¥0.00</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      充值
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>交易记录</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      导出
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 flex items-center justify-center text-muted-foreground bg-neutral-50 rounded-lg">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 推荐计划页面 */}
            {currentPage === "referral" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">邀请有礼</h1>
                  <p className="text-muted-foreground">分享给好友，赚免费额度</p>
                </div>

                <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-100 mb-6">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                          <Gift className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">邀请有礼</p>
                          <p className="text-sm text-muted-foreground">赠友 $3，返你 $5</p>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full">
                        去邀请
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-4xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground mt-2">成功邀请</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-4xl font-bold">$0.00</p>
                      <p className="text-sm text-muted-foreground mt-2">累计收益</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-4xl font-bold">$0.00</p>
                      <p className="text-sm text-muted-foreground mt-2">可提现金额</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>推荐码与短链接</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">推荐码</p>
                        <div className="flex items-center gap-2">
                          <Input value="REDCSTAR2026" readOnly className="flex-1" />
                          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText("REDCSTAR2026")}>
                            复制
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">短链接</p>
                        <div className="flex items-center gap-2">
                          <Input value="https://ofox.ai/r/redstar" readOnly className="flex-1" />
                          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText("https://ofox.ai/r/redstar")}>
                            复制
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>邀请记录</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 flex items-center justify-center text-muted-foreground bg-neutral-50 rounded-lg">
                      暂无数据
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* 模型广场页面 */}
            {currentPage === "models" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">模型广场</h1>
                  <p className="text-muted-foreground">探索和发现优质模型</p>
                </div>

                <div className="flex justify-center py-12">
                  <Button variant="outline" onClick={() => window.open("https://app.ofox.ai/models", "_blank")}>
                    访问模型广场
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}

            {/* 开发文档页面 */}
            {currentPage === "docs" && (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">开发文档</h1>
                  <p className="text-muted-foreground">快速上手，接入网关</p>
                </div>

                <div className="flex justify-center py-12">
                  <Button variant="outline" onClick={() => window.open("https://docs.ofox.ai", "_blank")}>
                    查看开发文档
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </main>

      {/* 创建团队模态框 */}
      <Dialog open={showTeamModal} onOpenChange={setShowTeamModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>创建团队</DialogTitle>
            <p className="text-sm text-muted-foreground">创建新团队，开始协作。</p>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">团队名称</label>
              <Input placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL 标识</label>
              <div className="flex">
                <span className="flex items-center px-3 py-2 bg-neutral-100 border border-r-0 rounded-l-md">
                  app.ofox.ai/
                </span>
                <Input placeholder="acme-inc" className="rounded-l-none" />
              </div>
              <p className="text-xs text-muted-foreground">用于团队的 URL 地址。</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTeamModal(false)}>
              取消
            </Button>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
