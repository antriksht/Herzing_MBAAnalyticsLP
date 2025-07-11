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
import { GraduationCap } from "lucide-react";
import FAQSection from "@/components/faq-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top announcement bar */}
        <div className="bg-[#003865] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium">
              NEXT START <span className="text-[#FECE00] font-bold underline">September 3rd</span> - Waived Enrollment Fee
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://www.herzing.edu/themes/hu/assets/img/navbar-logo.png" 
                alt="Herzing University" 
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#benefits" className="text-sm text-[#111111] hover:text-[#003865] transition-colors">
                Why Transfer
              </a>
              <a href="#program" className="text-sm text-[#111111] hover:text-[#003865] transition-colors">
                Program
              </a>
              <a href="#curriculum" className="text-sm text-[#111111] hover:text-[#003865] transition-colors">
                Curriculum
              </a>
              <a href="#form" className="bg-[#65DBA5] text-[#012F64] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#5bc396] transition-colors">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section id="form">
          <HeroSection />
        </section>
        
        {/* Mobile Form Section - Only visible on mobile */}
        <section id="mobile-form" className="lg:hidden bg-gray-50 py-12">
          <div className="max-w-md mx-auto px-4">
            <LeadForm />
          </div>
        </section>
        
        <section id="benefits">
          <BenefitsSection />
        </section>
        <section id="program">
          <ProgramHighlights />
        </section>
        <StudentSupport />
        <section id="curriculum">
          <CurriculumSection />
        </section>
        <CertificationsSection />
        <AccreditationSection />
        <FAQSection />
        <FinalCTA />
      </main>

      {/* Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#65DBA5] p-4 shadow-lg z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#003865]">Ready to get started?</p>
            <p className="text-xs text-[#111111]">Get your info packet today</p>
          </div>
          <a href="#mobile-form" className="bg-[#65DBA5] text-[#012F64] font-bold py-2 px-4 rounded-lg hover:bg-[#5bc396] transition-colors">
            Get Info
          </a>
        </div>
      </div>

      {/* Scroll to Top Widget */}
      <ScrollToTop />
    </div>
  );
}
