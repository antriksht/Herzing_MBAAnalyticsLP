import { Clock, GraduationCap, Calendar, DollarSign } from "lucide-react";

export default function ProgramHighlights() {
  const highlights = [
    {
      icon: Clock,
      title: "16 Months",
      description: "Graduate faster with an accelerated timeline (varies by program)",
    },
    {
      icon: GraduationCap,
      title: "36 Credits",
      description: "Comprehensive, career‑focused curriculum",
    },
    {
      icon: Calendar,
      title: "September 3rd",
      description: "Next start date",
    },
    {
      icon: DollarSign,
      title: "$625",
      description: "Per credit hour tuition",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">
            Program Highlights
          </h2>
          <p className="text-xl text-[#111111]">
            Fast‑track your degree with Herzing University’s flexible programs for F‑1 transfer students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#FECE00] rounded-full flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="text-[#012F64] text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-[#003865] mb-2">
                {highlight.title}
              </h3>
              <p className="text-[#111111]">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#003865] to-[#001a33] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">STEM Designated Program</h3>
          <p className="text-lg text-white/90">
            Eligible programs qualify for up to 36‑month OPT extension to maximize your U.S. career opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
