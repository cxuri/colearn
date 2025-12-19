'use client';

import { useState } from 'react';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Plus, Minus, ShieldAlert, BadgeCheck, CornerRightDown, HelpCircle } from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

const FAQs = [
  {
    question: "Is this app affiliated with KTU?",
    answer: "Absolutely not. If we were, the site would crash every time you opened it. We are an independent archive built by students, for students."
  },
  {
    question: "Is it actually free?",
    answer: "Yes. Education shouldn't be paywalled. We might add a 'Pro' tier later for advanced analytics, but the core archive (Notes/QP) will remains open source and free."
  },
  {
    question: "How do I get off the waitlist?",
    answer: "We let people in batches of 50 every Friday to prevent server fires. Sharing your referral link bumps you up the queue. Spamming us on Instagram might also work."
  },
  {
    question: "Will you sell my data?",
    answer: "We are too lazy to figure out how to do that. Your email is only used for login and 'Exam Tomorrow' panic alerts. No third-party tracking."
  },
  {
    question: "Can I upload my own notes?",
    answer: "Yes. That's the whole point. Contributors get a special 'Verified' badge and priority access to new features."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick, index }: any) => {
  return (
    <div className={`border-b-4 border-black group transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-white hover:bg-yellow-400'}`}>
      <button 
        onClick={onClick}
        className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
            <span className={`text-xs font-bold uppercase tracking-widest opacity-50 ${mono.className}`}>
                Query_0{index + 1}
            </span>
            <span className={`text-xl md:text-2xl font-bold uppercase leading-tight ${archivo.className}`}>
                {question}
            </span>
        </div>
        <div className={`border-2 p-1 relative z-10 shrink-0 ${isOpen ? 'border-white bg-black' : 'border-black bg-white'}`}>
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`p-8 pt-0 text-base md:text-lg leading-relaxed text-gray-300 ${mono.className}`}>
            <div className="w-8 h-1 bg-yellow-400 mb-4"></div>
            {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full md:w-auto md:mx-[14px] border-x-4 border-black bg-white relative">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* --- LEFT COLUMN: STICKY HEADER --- */}
        <div className="lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-[#F0F2F5] p-8 md:p-12 flex flex-col relative overflow-hidden">
            
            {/* Background Pattern for Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Sticky Content Wrapper */}
            <div className="lg:sticky lg:top-32 flex flex-col h-full justify-center">
                
                <h2 className={`text-black text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-8 ${archivo.className}`}>
                    The <br/> Interro<br/>gation.
                </h2>
                
                {/* --- NEW ELEMENT: THE "TRUTH TICKET" --- */}
                <div className="relative bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 mb-8 max-w-sm">
                    
                    {/* Tape Effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-400/80 rotate-3 backdrop-blur-sm shadow-sm"></div>

                    <div className="flex justify-between items-center border-b-2 border-black/10 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                             <BadgeCheck className="text-blue-600" size={20} />
                             <span className={`text-xs font-bold uppercase ${mono.className}`}>Verified Truth</span>
                        </div>
                        <span className={`text-xs font-bold text-gray-400 ${mono.className}`}>#NO_BS</span>
                    </div>

                    <div className={`text-sm font-bold leading-relaxed text-gray-800 ${mono.className}`}>
                        "We are building the tool we wished we had during our S3 exams. This isn't a startup; it's a survival mechanism."
                    </div>

                    {/* Barcode Mockup */}
                    <div className="mt-6 flex items-end justify-between opacity-80">
                         <div className="flex gap-1 h-8 items-end">
                             <div className="w-1 h-full bg-black"></div>
                             <div className="w-2 h-2/3 bg-black"></div>
                             <div className="w-1 h-full bg-black"></div>
                             <div className="w-3 h-1/2 bg-black"></div>
                             <div className="w-1 h-full bg-black"></div>
                             <div className="w-4 h-3/4 bg-black"></div>
                             <div className="w-1 h-full bg-black"></div>
                         </div>
                         <span className="text-[10px] font-mono font-bold">AUTH_KEY_VALID</span>
                    </div>
                </div>

                <div className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 ${mono.className}`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Support Status: Online
                </div>

            </div>

            {/* Mobile Decoration Arrow */}
            <CornerRightDown className="lg:hidden absolute bottom-8 right-8 w-12 h-12 text-black opacity-20" />
        </div>

        {/* --- RIGHT COLUMN: QUESTIONS LIST --- */}
        <div className="lg:col-span-7 bg-white">
            {FAQs.map((faq, i) => (
                <AccordionItem 
                    key={i} 
                    index={i}
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpen={openIndex === i} 
                    onClick={() => handleClick(i)} 
                />
            ))}
            
            {/* "Ask More" Box */}
            <div className="p-8 md:p-12 bg-yellow-400 border-b-4 border-black flex flex-col md:flex-row items-center gap-6 justify-between group cursor-pointer hover:bg-black hover:text-white transition-colors">
                <div className="flex items-center gap-4">
                    <HelpCircle size={32} strokeWidth={2.5} />
                    <span className={`text-xl font-bold uppercase ${archivo.className}`}>
                        Still Confused?
                    </span>
                </div>
                <button className={`bg-white text-black px-6 py-2 text-sm font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000] group-hover:bg-yellow-400 ${mono.className}`}>
                    Contact Support
                </button>
            </div>
        </div>

      </div>
    </section>
  );
}