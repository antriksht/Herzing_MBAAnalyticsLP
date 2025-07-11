import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How long does the evaluation process take?",
      answer:
        "The evaluation process typically takes 5-7 business days once we receive all required documents. Our admissions team will review your transcripts, English proficiency scores, and application materials to determine your eligibility and potential transfer credits.",
    },
    {
      question: "Can I keep my F1 visa status during the transfer?",
      answer:
        "Yes, you can maintain your F1 visa status during the transfer process. We provide comprehensive guidance on SEVIS transfer procedures to ensure your immigration status remains valid throughout the transition to Herzing University.",
    },
    {
      question: "What scholarships and financial aid are available?",
      answer:
        "International students may be eligible for various scholarships including academic merit scholarships, need-based grants, and program-specific awards. We also offer flexible payment plans and currently have a waived enrollment fee promotion for the September 3rd start date.",
    },
    {
      question: "Do I need to take the GMAT or GRE?",
      answer:
        "No, the GMAT and GRE are not required for admission to our MBA in Business Analytics program. We evaluate candidates based on their academic background, professional experience, and potential for success in the program.",
    },
    {
      question: "How many credits can I transfer from my previous education?",
      answer:
        "You can transfer up to 9 credits from your previous graduate coursework, potentially reducing your time to degree completion. Our admissions team will evaluate your transcripts to determine which credits are eligible for transfer.",
    },
    {
      question: "Is the program fully online or do I need to attend campus?",
      answer:
        "Our MBA in Business Analytics is available in both 100% online and hybrid formats. You can choose the learning format that best fits your schedule and preferences while maintaining your F1 visa status.",
    },
    {
      question:
        "What support services are available for international students?",
      answer:
        "We provide dedicated international student advisors, visa transfer assistance, career coaching, flexible scheduling options, and comprehensive academic support to ensure your success throughout the program.",
    },
    {
      question: "When is the next program start date?",
      answer:
        "The next program start date is September 3rd, 2025. We're currently offering a waived enrollment fee for students who enroll for this start date. Additional start dates are available throughout the year.",
    },
  ];

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#003865] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#111111]">
            Get answers to common questions about our MBA program and F1 visa
            transfer process
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