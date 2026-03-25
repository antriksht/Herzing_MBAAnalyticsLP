import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquareText, Layout, Rocket, GraduationCap } from "lucide-react";

export default function IndexPage() {
  const versions = [
    {
      title: "Version 1: Traditional",
      description: "Standard high-conversion landing page with modal-based AI assistant. Optimized for established trust.",
      href: "/v1-traditional",
      icon: <Layout className="w-8 h-8 text-[#003865]" />,
      color: "bg-blue-50",
      tag: "Traditional"
    },
    {
      title: "Version 2: Chatbot focused",
      description: "Modern experience with a persistent AI widget in the corner. Great for engagement.",
      href: "/v2-chatbot",
      icon: <MessageSquareText className="w-8 h-8 text-[#65DBA5]" />,
      color: "bg-emerald-50",
      tag: "Interactive"
    },
    {
      title: "Version 3: AI Landing",
      description: "Hyper-focused minimalist experience. Lead form and AI agent are the main stars.",
      href: "/v3-ai-landing",
      icon: <Rocket className="w-8 h-8 text-[#FECE00]" />,
      color: "bg-amber-50",
      tag: "Experimental"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#65DBA5]/30">
      <header className="bg-white border-b border-slate-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#003865] rounded-2xl flex items-center justify-center mb-6 shadow-xl transform -rotate-3">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#003865] mb-2">Herzing MBA Analytics</h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            Choose a version to explore the AI-Powered F-1 Transfer Landing Page prototypes.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {versions.map((v) => (
            <Link key={v.href} href={v.href}>
              <a className="group">
                <Card className="h-full border-2 border-transparent hover:border-[#003865]/10 hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                  <div className={`h-2 w-full ${v.color.replace('50', '500')}`} />
                  <CardHeader className="pt-8">
                    <div className={`${v.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {v.icon}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#003865]/40">{v.tag}</span>
                    </div>
                    <CardTitle className="text-2xl font-black text-[#003865] group-hover:text-[#65DBA5] transition-colors">{v.title}</CardTitle>
                    <CardDescription className="text-slate-500 font-medium leading-relaxed pt-2">
                      {v.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <div className="flex items-center text-[#003865] font-bold text-sm group-hover:translate-x-2 transition-transform">
                      View Version
                      <Rocket className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 font-medium text-sm">
        <p>&copy; 2026 Herzing University • MBA Analytics Landing Page Project</p>
      </footer>
    </div>
  );
}
