import Link from "next/link";

// 1. Define your topics data
const topics = [
  {
    slug: "json",
    title: "JSON Fundamentals",
    description: "The universal language of data. Learn syntax, types, and common pitfalls.",
    tag: "Basics",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    slug: "fastapi",
    title: "FastAPI Masterclass",
    description: "Build high-performance Python APIs with automatic validation and docs.",
    tag: "Backend",
    color: "bg-teal-100 text-teal-800",
  },
  {
    slug: "klaz",
    title: "Klaz Full Stack",
    description: "The complete masterclass. Build scalable web applications from scratch.",
    tag: "Full Stack",
    color: "bg-pink-100 text-pink-800",
  },
  {
    slug: "docker",
    title: "Docker Essentials",
    description: "Stop saying 'it works on my machine'. Containerize your apps.",
    tag: "DevOps",
    color: "bg-blue-100 text-blue-800",
  },
  {
    slug: "kubernetes",
    title: "Kubernetes Orchestration",
    description: "Manage your container fleet. Pods, Deployments, and Services explained.",
    tag: "DevOps",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    slug: "kafka",
    title: "Apache Kafka",
    description: "The central nervous system. Build real-time streaming data pipelines.",
    tag: "Data Eng",
    color: "bg-red-100 text-red-800",
  },
];

export default async function ExploreTopics() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8 md:p-16 text-black relative overflow-hidden">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-sm font-bold mb-6 tracking-wide uppercase">
          Dev Courses
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[1.1]">
          Explore the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Knowledge Base.</span>
        </h1>
        <p className="text-xl font-medium text-gray-600 max-w-2xl leading-relaxed">
          Stop scrolling. Start learning deeply. Select a high-impact technical topic below to begin your masterclass.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {topics.map((topic) => (
          <Link 
            href={`/learn/${topic.slug}`} 
            key={topic.slug}
            className="group block h-full"
          >
            <div className="h-full border border-zinc-200 p-8 rounded-3xl hover:border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-white flex flex-col relative overflow-hidden">
              
              {/* Decorative top bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${topic.color.split(' ')[0].replace('bg-', 'bg-gradient-to-r from-white via-').replace('-100', '-400 to-white opacity-50')}`}></div>

              {/* Tag */}
              <div className="flex justify-between items-start mb-6">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-black/5 ${topic.color}`}>
                  {topic.tag}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl text-black font-extrabold mb-3 tracking-tight">
                {topic.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed mb-8 flex-grow font-medium text-sm">
                {topic.description}
              </p>
              
              {/* Arrow Icon */}
              <div className="flex items-center text-sm font-bold text-black mt-auto group-hover:underline decoration-2 underline-offset-4">
                Start Learning
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}