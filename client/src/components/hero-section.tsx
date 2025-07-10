import { CheckCircle } from "lucide-react";
import LeadForm from "./lead-form";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-blue to-blue-900 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Transfer Your F1 Visa & Earn a <span className="text-accent-green">STEM MBA</span> in Business Analytics
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 font-medium">
                Join Herzing University's accredited program with full support for international students
              </p>
            </div>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-accent-green text-xl" />
                <span className="font-medium">STEM OPT Extension</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-accent-green text-xl" />
                <span className="font-medium">No GMAT/GRE Required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-accent-green text-xl" />
                <span className="font-medium">100% Online or Hybrid</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-accent-green text-xl" />
                <span className="font-medium">Transfer Up to 9 Credits</span>
              </div>
            </div>

            {/* Mobile CTA - Show only on mobile */}
            <div className="lg:hidden space-y-4">
              <button className="w-full bg-accent-green text-primary-blue font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-400 transition-colors">
                Request Information
              </button>
              <button className="w-full bg-transparent border-2 border-accent-green text-accent-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-accent-green hover:text-primary-blue transition-colors">
                Apply Now
              </button>
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
