import { CheckCircle } from "lucide-react";
import LeadForm from "./lead-form";

export default function HeroSection() {
  return (
    <section 
      className="bg-cover bg-center text-white py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundImage: "url('/Hero_Extended.webp')" }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003865] to-[#001a33] opacity-85"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                Transfer Your F1 Visa & Earn a <span className="text-[#65DBA5]">STEM MBA</span> in Business Analytics
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-medium">
                Join Herzing University's accredited program with full support for international students
              </p>
            </div>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-[#65DBA5] text-xl" />
                <span className="font-medium text-white">STEM OPT Extension</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-[#65DBA5] text-xl" />
                <span className="font-medium text-white">No GMAT/GRE Required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-[#65DBA5] text-xl" />
                <span className="font-medium text-white">100% Online or Hybrid</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-[#65DBA5] text-xl" />
                <span className="font-medium text-white">Transfer Up to 9 Credits</span>
              </div>
            </div>

            {/* Mobile CTA - Show only on mobile */}
            <div className="lg:hidden space-y-4">
              <a href="#mobile-form" className="w-full bg-[#65DBA5] text-[#012F64] font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#5bc396] transition-colors block text-center">
                Request Information
              </a>
            </div>
          </div>

          {/* Right Form - Hidden on mobile */}
          <div className="hidden lg:block">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
