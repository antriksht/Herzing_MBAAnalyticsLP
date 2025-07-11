

export default function FinalCTA() {
  return (
    <section className="py-16 pb-24 lg:pb-16 bg-gradient-to-br from-[#003865] to-[#001a33] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Ready to Take the Next Step?</h2>
        <p className="text-xl mb-8 text-white/90">
          Transfer your F1 visa to Herzing and pursue your MBA in Business Analytics with confidence. 
          Our dedicated team is here to support your success every step of the way.
        </p>
        
        <div className="flex justify-center">
          <a href="#form" className="hidden lg:inline-block bg-[#65DBA5] text-[#012F64] font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#5bc396] transition-colors">
            Apply Now - Start September 3rd
          </a>
          <a href="#mobile-form" className="lg:hidden bg-[#65DBA5] text-[#012F64] font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#5bc396] transition-colors inline-block">
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
