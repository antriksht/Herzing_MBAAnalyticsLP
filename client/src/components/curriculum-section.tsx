import { TrendingUp, Database, Bot, BarChart3, Megaphone, Settings } from "lucide-react";

export default function CurriculumSection() {
  const courses = [
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Learn to forecast trends and make data-driven decisions using advanced statistical methods"
    },
    {
      icon: Database,
      title: "Big Data Management",
      description: "Master the tools and techniques for handling large-scale data sets and cloud platforms"
    },
    {
      icon: Bot,
      title: "Machine Learning",
      description: "Implement AI solutions and automated decision-making systems for business applications"
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Create compelling visual stories from complex data using industry-leading tools"
    },
    {
      icon: Megaphone,
      title: "Marketing Engineering",
      description: "Apply analytics to marketing strategies and customer behavior analysis"
    },
    {
      icon: Settings,
      title: "Business Intelligence",
      description: "Transform raw data into actionable business insights and strategic recommendations"
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
              <div className="w-12 h-12 bg-[#65DBA5] rounded-lg flex items-center justify-center mb-4">
                <course.icon className="text-white text-xl" />
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
