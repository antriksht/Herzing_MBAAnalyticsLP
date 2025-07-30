import { TrendingUp, Database, Bot, BarChart3, Megaphone, Settings } from "lucide-react";

export default function CurriculumSection() {
  const courses = [
    {
      icon: TrendingUp,
      title: "Leadership & Management",
      description: "Build decision‑making, strategic planning, and leadership expertise"
    },
    {
      icon: Database,
      title: "Business & Data Analytics",
      description: "Master predictive analytics, big data tools, and AI‑driven decision‑making"
    },
    {
      icon: Bot,
      title: "Technology & Cybersecurity",
      description: "Learn networking, cloud computing, ethical hacking, and IT project management"
    },
    {
      icon: BarChart3,
      title: "Healthcare Management",
      description: "Explore healthcare administration, policy, and information management"
    },
    {
      icon: Megaphone,
      title: "Project Management",
      description: "Develop advanced project planning, cost, and risk management skills"
    },
    {
      icon: Settings,
      title: "Capstone/Internship",
      description: "Apply your learning in real‑world projects or industry internships"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">Curriculum Overview</h2>
          <p className="text-xl text-[#111111]">Master cutting-edge business analytics skills with our comprehensive curriculum</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-gradient-to-br from-[#003865] to-[#001a33] rounded-xl p-6 text-white">
              <div className="w-12 h-12 bg-[#FECE00] rounded-lg flex items-center justify-center mb-4">
                <course.icon className="text-[#012F64] text-xl" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{course.title}</h3>
              <p className="text-white/90">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
