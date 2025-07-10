import { Phone, Mail } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-blue to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Transfer your F1 visa to Herzing and pursue your MBA in Business Analytics with confidence. 
          Our dedicated team is here to support your success every step of the way.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-accent-green text-primary-blue font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-400 transition-colors w-full sm:w-auto">
            Apply Now - Start September 3rd
          </button>
          <button className="bg-transparent border-2 border-accent-green text-accent-green font-bold py-4 px-8 rounded-lg text-lg hover:bg-accent-green hover:text-primary-blue transition-colors w-full sm:w-auto">
            Talk to an Advisor
          </button>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-blue-100">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call: 1-800-596-0724</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email: info@herzing.edu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
