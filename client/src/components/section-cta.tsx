import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function SectionCTA() {
  const scrollToForm = () => {
    const element = document.getElementById("form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center mt-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Button 
        onClick={scrollToForm}
        className="bg-[#003865] text-white hover:bg-[#002d50] text-lg font-black py-7 px-12 rounded-full shadow-[0_10px_25px_rgba(0,56,101,0.2)] transform transition-all hover:scale-105 active:scale-95 group border-2 border-white/10"
      >
        <span>Move Up to Success</span>
        <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform text-[#65DBA5]" />
      </Button>
    </div>
  );
}
