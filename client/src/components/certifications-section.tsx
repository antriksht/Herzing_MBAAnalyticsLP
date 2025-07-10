import { Network, CheckSquare, Trophy, PieChart } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    {
      icon: Network,
      title: "CAPM",
      description: "Certified Associate in Project Management"
    },
    {
      icon: CheckSquare,
      title: "CBAP",
      description: "Certified Business Analysis Professional"
    },
    {
      icon: Trophy,
      title: "PMP",
      description: "Project Management Professional"
    },
    {
      icon: PieChart,
      title: "IIBA-CBDA",
      description: "Certification in Business Data Analytics"
    }
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">Industry Certifications Included</h2>
          <p className="text-xl text-[#111111]">Boost your career with industry-recognized credentials</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#65DBA5] rounded-full flex items-center justify-center mx-auto mb-4">
                <cert.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-[#003865] mb-2">{cert.title}</h3>
              <p className="text-[#111111]">{cert.description}</p>
              <div className="mt-4 text-sm text-[#65DBA5] font-semibold">Fee Reimbursement Included</div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-[#DA291C] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🎯 Certification Guarantee</h3>
          <p className="text-lg text-white/90">We're so confident in your success that we offer full fee reimbursement for all certification exams included in your program.</p>
        </div>
      </div>
    </section>
  );
}
