import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection({ id }: { id?: string }) {
  const faqs = [
    {
      question: "Can I transfer my F‑1 visa to Herzing University?",
      answer:
        "Yes. If your current I‑20 is in good standing and you meet admission requirements, we can issue you a new I‑20 and guide you through the SEVIS transfer process so your studies continue without interruption.",
    },
    {
      question: "Will my F‑1 visa status remain valid during the transfer?",
      answer:
        "Yes. Once your SEVIS record is transferred to Herzing, your F‑1 status remains active. Our international student advisors will walk you through the timing and paperwork to ensure a smooth transition.",
    },
    {
      question: "Do I need to take the GMAT, GRE, SAT, or ACT?",
      answer:
        "No. We do not require these exams for admission. If you have previously taken them, you may submit scores, but they are not necessary for acceptance.",
    },
    {
      question: "How many credits can I transfer?",
      answer:
        "Graduate students may transfer up to 9 credits from approved coursework, which can save time and tuition. Undergraduate transfer credit is determined after a formal evaluation of your previous academic transcripts.",
    },
    {
      question: "Can I study online or in a hybrid format?",
      answer:
        "Yes. Many programs offer 100% online learning or a hybrid option at our Atlanta campus, giving you flexibility while maintaining your visa compliance requirements.",
    },
    {
      question: "Can I work while studying?",
      answer:
        "International students have limited work options while on an F‑1 visa. You may work during your final semester through Curricular Practical Training (CPT), and after graduation you may apply for Optional Practical Training (OPT), which can last up to 36 months for STEM‑designated programs.",
    },
    {
      question:
        "What support services will I receive?",
      answer:
        "You’ll have access to dedicated international student advisors, one‑on‑one career coaching, visa transfer guidance, resume and interview preparation, and flexible scheduling to help you succeed from day one.",
    },
    {
      question: "When can I start my program?",
      answer:
        "Our next intake begins September 3, but with rolling admissions, you can apply anytime and secure your place in an upcoming start date. We’ll work with you to align your SEVIS transfer and program start for a seamless transition.",
    },
  ];

  return (
    <section id={id} className="py-16 bg-[#F5F5F5] scroll-m-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#111111]">
            Answers to common questions about F‑1 transfers and studying at Herzing University
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200 last:border-b-0"
              >
                <AccordionTrigger className="text-left py-6 px-4 hover:bg-gray-50 text-[#003865] font-semibold text-lg rounded-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6 text-[#111111] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}