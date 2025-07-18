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
              <div className="w-16 h-16 bg-[#FECE00] rounded-full flex items-center justify-center mx-auto mb-4">
                <cert.icon className="text-[#012F64] text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-[#003865] mb-2">{cert.title}</h3>
              <p className="text-[#111111]">{cert.description}</p>

            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-[#111111] max-w-4xl mx-auto leading-relaxed">
            * Complete the requisite coursework and <span className="font-bold">we will reimburse the application fees for up to three industry certifications</span>
          </p>
        </div>
      </div>
    </section>
  );
}
