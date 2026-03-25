import { useState, useEffect } from "react";
import AITransferAssistant from "@/components/ai-transfer-assistant";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function V3AILanding() {
  // Always open on this version
  const [isOpen, setIsOpen] = useState(true);

  // We want to force it to be open and handle the "close" by going back
  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#002F65] overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background elements for V3 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#65DBA5]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#FECE00]/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Assistant is now the primary hero element */}

        {/* We render the assistant. The assistant itself has a backdrop if we use fullscreen.
            Maybe for V3 we want it to feel like it's PART of the page.
        */}
        <AITransferAssistant 
          isOpen={isOpen} 
          onClose={handleClose} 
          layout="fullpage" 
        />

      </div>
    </div>
  );
}
