import { Tag, X, Laptop, ArrowRightLeft, Award, CalendarCheck } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Tag,
      title: "STEM Advantage",
      description: "Extend your stay in the U.S. with 36-month OPT eligibility through our STEM-designated program"
    },
    {
      icon: X,
      title: "No GMAT/GRE",
      description: "Your ambition matters more than test scores. Skip the entrance exams and start your journey"
    },
    {
      icon: Laptop,
      title: "100% Online or Hybrid",
      description: "Learn your way with full flexibility. Study online or join our Atlanta campus for hybrid learning"
    },
    {
      icon: ArrowRightLeft,
      title: "Transfer Credits",
      description: "Save time and money with up to 9 credits accepted from your previous studies"
    },
    {
      icon: Award,
      title: "Career Certifications",
      description: "Earn industry-recognized credentials with fee reimbursement included in your program"
    },
    {
      icon: CalendarCheck,
      title: "Rolling Admissions",
      description: "Start anytime with our rolling admissions and waived enrollment fee for qualified students"
    }
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">Why Transfer to Herzing?</h2>
          <p className="text-xl text-[#111111] max-w-3xl mx-auto">
            Designed specifically for international students, our program offers unmatched flexibility and support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#65DBA5] rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="text-[#012F64] text-xl" />
              </div>
              <h3 className="text-xl font-bold text-[#003865] mb-2">{benefit.title}</h3>
              <p className="text-[#111111]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
