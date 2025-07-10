import { Users, FileText, Briefcase, CalendarCheck } from "lucide-react";

export default function StudentSupport() {
  const supports = [
    {
      icon: Users,
      title: "International Student Advisors",
      description: "Dedicated advisors who understand the unique challenges of international students and provide personalized guidance throughout your journey."
    },
    {
      icon: FileText,
      title: "Visa Transfer Guidance",
      description: "Expert assistance with F1 visa transfers, SEVIS records, and immigration compliance to ensure a smooth transition."
    },
    {
      icon: Briefcase,
      title: "Personalized Career Coaching",
      description: "One-on-one career coaching, resume building, interview preparation, and job search strategies tailored to your goals."
    },
    {
      icon: CalendarCheck,
      title: "Flexible Scheduling",
      description: "Rolling admissions mean you can start when you're ready. No need to wait for traditional semester start dates."
    }
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">Herzing Means Support</h2>
          <p className="text-xl text-[#111111]">We're with you every step of the way</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {supports.map((support, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#65DBA5] rounded-lg flex items-center justify-center flex-shrink-0">
                  <support.icon className="text-[#012F64] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#003865] mb-2">{support.title}</h3>
                  <p className="text-[#111111]">{support.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
