import { useState, useEffect } from "react";
import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import ProgramHighlights from "@/components/program-highlights";
import StudentSupport from "@/components/student-support";
import CurriculumSection from "@/components/curriculum-section";
import CertificationsSection from "@/components/certifications-section";
import AccreditationSection from "@/components/accreditation-section";
import FinalCTA from "@/components/final-cta";
import ScrollToTop from "@/components/scroll-to-top";
import LeadForm from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquareText, ChevronRight, X } from "lucide-react";
import FAQSection from "@/components/faq-section";
import { useIsMobile } from "@/hooks/use-mobile";
import AITransferAssistant from "@/components/ai-transfer-assistant";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export default function V2Chatbot() {
  const isMobile = useIsMobile();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToForm = () => {
    trackEvent("CTA Middle Click", { label: "Step Up to Success" });
    const element = document.getElementById("form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#65DBA5]/30">
      <AITransferAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        layout="widget"
      />

      {/* Floating Chat Trigger for V2 */}
      <div className="fixed bottom-6 right-6 z-[60] group">
        <button
          onClick={() => {
            trackEvent("Floating Chat Click", { version: "V2" });
            setIsAssistantOpen(!isAssistantOpen);
          }}
          className={cn(
            "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95",
            isAssistantOpen ? "bg-red-500 rotate-90" : "bg-[#003865] hover:bg-[#002d50]"
          )}
        >
          {isAssistantOpen ? (
            <X className="text-white w-8 h-8" />
          ) : (
            <MessageSquareText className="text-white w-8 h-8" />
          )}
          
          {!isAssistantOpen && (
            <>
              <div className="absolute -top-12 right-0 whitespace-nowrap bg-[#65DBA5] text-[#003865] text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce tracking-widest uppercase">
                We are Live
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65DBA5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#65DBA5]"></span>
              </span>
            </>
          )}
        </button>
        
        {!isAssistantOpen && (
          <div className="absolute top-1/2 -translate-y-1/2 right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 whitespace-nowrap relative">
              <p className="text-[#003865] font-bold text-sm">Need help transferring?</p>
              {/* Tooltip arrow */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white border-t border-r border-slate-100 rotate-45"></div>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <header className={cn(
        "bg-white shadow-sm sticky top-0 z-50 transition-transform duration-300 w-full",
        headerVisible ? "translate-y-0" : "-translate-y-full"
      )}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center">
              <img
                src="https://www.herzing.edu/themes/hu/assets/img/navbar-logo.png"
                alt="Herzing University"
                className="h-8 md:h-10 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#benefits"
                onClick={() => trackEvent("Nav Click", { section: "Why Transfer" })}
                className="text-sm font-semibold text-[#111111] hover:text-[#003865] transition-all hover:scale-105"
              >
                Why Transfer
              </a>
              <a
                href="#program"
                onClick={() => trackEvent("Nav Click", { section: "Programs" })}
                className="text-sm font-semibold text-[#111111] hover:text-[#003865] transition-all hover:scale-105"
              >
                Programs
              </a>
              <a
                href="#curriculum"
                onClick={() => trackEvent("Nav Click", { section: "Curriculum" })}
                className="text-sm font-semibold text-[#111111] hover:text-[#003865] transition-all hover:scale-105"
              >
                Curriculum
              </a>
              <a
                href="#faq"
                onClick={() => trackEvent("Nav Click", { section: "FAQ" })}
                className="text-sm font-semibold text-[#111111] hover:text-[#003865] transition-all hover:scale-105"
              >
                FAQ
              </a>
              <button
                onClick={() => {
                  trackEvent("CTA Header Click", { label: "Talk to Advisor" });
                  setIsAssistantOpen(true);
                }}
                className="bg-[#003865] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#002d50] transition-all shadow-md hover:shadow-lg transform active:scale-95"
              >
                Talk to Advisor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pb-24">
        <section id="form" className="scroll-m-24">
          <HeroSection />
        </section>

        {/* Mobile Form Section - Only visible on mobile */}
        <section id="mobile-form" className="lg:hidden bg-gray-50 py-16 px-4">
          <div className="max-w-md mx-auto relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#65DBA5]/20 rounded-full blur-xl"></div>
            <LeadForm />
          </div>
        </section>

        <section id="benefits" className="scroll-m-24">
          <BenefitsSection />
        </section>

        <div className="bg-[#003865] py-16 lg:py-24 text-center px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <GraduationCap key={i} size={80} />)}
            </div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="text-[#65DBA5]">Move Up</span> to a Better Future?
            </h2>
            <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Don't let your potential settle. Transfer your F-1 visa to Herzing University and experience student-first education designed for your success.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-[#FECE00] text-[#003865] hover:bg-[#e6bb00] text-xl font-black py-8 px-12 rounded-full shadow-2xl transform transition-all hover:scale-105 active:scale-95 mb-4 group"
            >
              Step Up to Success
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/50 text-sm mt-4 font-medium italic">Classes start May 4th • Limited Seats Available</p>
          </div>
        </div>

        <section id="program" className="scroll-m-24">
          <ProgramHighlights />
        </section>

        <StudentSupport />

        <section id="curriculum" className="scroll-m-28">
          <CurriculumSection />
        </section>

        <CertificationsSection />
        <AccreditationSection />

        <FAQSection id="faq" />

        <FinalCTA />
      </main>

      {/* Mobile CTA Bar - REMOVED FOR V2 to use floating bubble instead */}
      {/* 
      <div className="lg:hidden fixed bottom-[15px] left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50">
        ...
      </div>
      */}

      {/* Desktop Sticky CTA - REMOVED FOR V2 */}
      {/* 
      <div className="hidden lg:flex fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-5 shadow-[0_-10px_25px_rgba(0,0,0,0.05)] z-40 items-center justify-center">
        ...
      </div>
      */}
      
      {/* Simple Desktop Footer Scroll to Top for V2 */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-50">
        <ScrollToTop />
      </div>
    </div>
  );
}
