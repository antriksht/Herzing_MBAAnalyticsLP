import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import ProgramHighlights from "@/components/program-highlights";
import StudentSupport from "@/components/student-support";
import CurriculumSection from "@/components/curriculum-section";
import CertificationsSection from "@/components/certifications-section";
import FinalCTA from "@/components/final-cta";
import { GraduationCap, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="text-primary-blue text-2xl mr-2" />
              <span className="text-xl font-bold text-primary-blue">Herzing University</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Questions? Call: <span className="font-semibold text-primary-blue">1-800-596-0724</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProgramHighlights />
        <StudentSupport />
        <CurriculumSection />
        <CertificationsSection />
        <FinalCTA />
      </main>

      {/* Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-accent-green p-4 shadow-lg z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-primary-blue">Ready to get started?</p>
            <p className="text-xs text-gray-600">Get your info packet today</p>
          </div>
          <button className="bg-accent-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-colors">
            Get Info
          </button>
        </div>
      </div>
    </div>
  );
}
