import Link from "next/link";
import React from "react";

interface NextCourseSectionProps {
  href?: string;
  title?: string;
  description?: string;
}

export default function NextCourseSection({ 
  href = "/learn/json", 
  title = "Continue Learning",
  description = "The journey doesn't end here. Jump straight into the next module to keep building your stack."
}: NextCourseSectionProps) {
  return (
    <div className="relative z-10 w-full bg-black text-white py-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            {description}
          </p>
        </div>
        
        <Link href={href} className="group whitespace-nowrap">
          <div className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-all flex items-center gap-3">
            Next Course
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}