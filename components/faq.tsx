'use client';

import { useState } from 'react';
import { Archivo_Black, Space_Mono } from 'next/font/google';
import { Plus, Minus, BadgeCheck, CornerRightDown, LifeBuoy, ArrowRight } from 'lucide-react';

const archivo = Archivo_Black({ weight: '400', subsets: ['latin'] });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });

const FAQs = [
  {
    question: "What is this app?",
    answer: "Klaz is a community driven free learning app, we are a team of btech students who got tired of learning stuff the normal way, so thats why we are building klaz"
  },
  {
    question: "Is this app affiliated with KTU?",
    answer: "Absolutely not. If we were, the site would crash every time you opened it. We are an independent archive built by students, for students."
  },
  {
    question: "Is it actually free?",
    answer: "Yes. Education shouldn't be paywalled. We might add a Pro tier later on for Power users, but the core archive (Notes/QP) will remains open source and free."
  },
  {
    question: "Will you sell my data?",
    answer: "The data we are collecting is strictly for informing all the students on the launch of the app, and optional Updates"
  },
  {
    question: "Can I upload my own notes?",
    answer: "Yes. That's the whole point. our idea is a community managed app, where we students share notes for others to use"
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick, index }: any) => {
  return (
    <div className={`border-b-4 border-black group transition-all duration-300 ${isOpen ? 'bg-black text-white' : 'bg-white hover:bg-[#FBBF24]'}`}>
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
            <div className="w-8 h-1 bg-[#FBBF24] mb-4"></div>
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
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="lg:sticky lg:top-32 flex flex-col h-full justify-center">
                <h2 className={`text-black text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-8 ${archivo.className}`}>
                    The <br/> Interro<br/>gation.
                </h2>
                
                {/* Truth Ticket */}
                <div className="relative bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-0 transition-transform duration-300 mb-8 max-w-sm">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#FBBF24]/90 rotate-3 backdrop-blur-sm shadow-sm"></div>
                    <div className="flex justify-between items-center border-b-2 border-black/10 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                             <BadgeCheck className="text-[#10B981]" size={20} />
                             <span className={`text-xs font-bold uppercase ${mono.className}`}>Verified Truth</span>
                        </div>
                        <span className={`text-xs font-bold text-gray-400 ${mono.className}`}>#NO_BS</span>
                    </div>
                    <div className={`text-sm font-bold leading-relaxed text-gray-800 ${mono.className}`}>
                        "We are building the tool we wished we had during our S3 exams. This isn't a startup; it's a survival mechanism."
                    </div>
                    {/* Barcode */}
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
                    <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                    Support Status: Online
                </div>
            </div>
            <CornerRightDown className="lg:hidden absolute bottom-8 right-8 w-12 h-12 text-black opacity-20" />
        </div>

        {/* --- RIGHT COLUMN: QUESTIONS --- */}
        <div className="lg:col-span-7 bg-white flex flex-col justify-between">
            <div>
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
            </div>
            
            {/* --- UPDATED FOOTER SECTION --- 
               Clean White "System Log" style instead of heavy yellow block.
               Provides breathing room before the next separator.
            */}
            <div className="p-8 md:p-12 border-b-4 border-black bg-white relative overflow-hidden group">
                {/* Subtle Grid Background for technical feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 border-2 border-black rounded-none">
                            <LifeBuoy size={28} className="text-black" />
                        </div>
                        <div>
                            <p className={`text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ${mono.className}`}>
                                /// END_OF_LOG
                            </p>
                            <span className={`text-xl md:text-2xl font-black uppercase leading-none ${archivo.className}`}>
                                Still Confused?
                            </span>
                        </div>
                    </div>

                    {/* Wireframe Button (Clean & Sharp) */}
                    <button className={`
                        group-hover:bg-black group-hover:text-white
                        bg-white text-black px-6 py-3 
                        text-sm font-bold uppercase tracking-wider
                        border-2 border-black 
                        shadow-[4px_4px_0px_0px_#000] 
                        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                        transition-all duration-200
                        flex items-center gap-2
                        ${mono.className}
                    `}>
                        Contact Support
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
}