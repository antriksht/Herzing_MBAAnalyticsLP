import { Award, ExternalLink } from "lucide-react";

export default function AccreditationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">
            University Accreditation & Recognition
          </h2>
          <p className="text-xl text-[#111111] max-w-3xl mx-auto">
            Our accredited & recognized online school
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-[#111111] leading-relaxed mb-6">
            We strive to earn rank as one of the top private, nonprofit
            universities in the United States. Just as you work every day to
            become the best version of yourself, so do we as a university.
          </p>
          <p className="text-lg text-[#111111] leading-relaxed">
            We are proud to have attained institutional accreditation in
            addition to industry recognition for our accomplishments helping
            students earn a college education and find career success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* US News Recognition */}
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#003865] mb-4">
              US News Recognition
            </h3>
            <p className="text-[#111111] mb-6 flex-grow">
              Ranked by U.S. News & World Report among the best online MBA
              degree programs in 2025.
            </p>
            <div className="mb-6 flex justify-center">
              <img
                src="https://www.herzing.edu/sites/default/files/styles/medium/public/2025-01/BOP07-MBA-Overall-2025_OL_0.png.webp"
                alt="US News Best MBA Programs Online 2025"
                className="h-20 w-auto"
              />
            </div>
            <a
              href="https://www.usnews.com/education/online-education/herzing-university-240392"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#65DBA5] hover:text-[#5bc396] font-medium inline-flex items-center mt-auto"
            >
              View Full Rankings <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>

          {/* Institutional Accreditation */}
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#003865] mb-4">
              Institutional Accreditation
            </h3>
            <p className="text-[#111111] mb-6 flex-grow">
              Accredited by the Higher Learning Commission, a regional
              accreditation agency recognized by the U.S. Department of
              Education.
            </p>
            <div className="mb-6 flex justify-center">
              <img
                src="/HigherLearningCommission.png"
                alt="Higher Learning Commission Accreditation"
                className="h-20 w-auto"
              />
            </div>
            <a
              href="https://www.herzing.edu/accreditation-0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#65DBA5] hover:text-[#5bc396] font-medium inline-flex items-center mt-auto"
            >
              View All Accreditations <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
