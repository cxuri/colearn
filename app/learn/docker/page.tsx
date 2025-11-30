import Link from "next/link";
import NextCourseSection from "@/app/NextCourseSection";
import React from "react";
import { 
  ChevronLeft, 
  Terminal, 
  Box, 
  Layers, 
  Activity, 
  Server, 
  Network, 
  Database, 
  FileText, 
  Container, 
  HardDrive,
  Cpu,
  Globe
} from "lucide-react";

// --- UI Components ---

const TerminalWindow = ({ commands }: { commands: string[] }) => (
  <div className="bg-[#1e1e1e] rounded-xl shadow-xl overflow-hidden border border-gray-800 my-6 font-mono text-sm group">
    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <span className="text-gray-500 text-xs">bash</span>
    </div>
    <div className="p-5 space-y-2">
      {commands.map((cmd, i) => (
        <div key={i} className="flex gap-3 text-gray-100 font-medium">
          <span className="text-blue-500 select-none">$</span>
          <span>{cmd}</span>
        </div>
      ))}
    </div>
  </div>
);

const CodeWindow = ({ title, code, language = "dockerfile", caption }: { title: string; code: string; language?: string; caption?: string }) => (
  <div className="my-0">
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 font-mono text-sm relative">
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black/50">
        <div className="flex items-center gap-2">
           <span className="text-blue-400"><FileText size={14} /></span>
           <span className="text-gray-300 font-medium text-xs">{title}</span>
        </div>
        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{language}</span>
      </div>
      <div className="p-6 overflow-x-auto bg-[#1e1e1e] text-[13px] leading-relaxed">
        <pre className="text-[#d4d4d4] whitespace-pre font-normal font-mono">{code}</pre>
      </div>
    </div>
    {caption && <p className="mt-2 text-zinc-500 text-sm italic text-center">👆 {caption}</p>}
  </div>
);

const SectionHeader = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="mb-10">
    <div className="inline-flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
        {num}
      </div>
      {/* Explicitly text-black */}
      <h2 className="text-3xl font-bold text-black tracking-tight">{title}</h2>
    </div>
    <p className="text-xl text-zinc-700 leading-relaxed max-w-2xl">{desc}</p>
  </div>
);

// --- Main Page Component ---

export default function DockerMasterclass() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
            <ChevronLeft size={18} /> Back
          </Link>
          {/* Explicitly text-black */}
          <span className="font-bold text-lg tracking-tight text-black">DevOps Essentials</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24">
        
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
            Module 1: Containerization
          </div>
          {/* Explicitly text-black */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-black tracking-tight leading-[1.1]">
            Stop saying<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">"It works on my machine"</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Docker packages your app with everything it needs—libraries, dependencies, and tools—so it runs exactly the same, everywhere.
          </p>
        </header>

        {/* --- Module 1: The Concept --- */}
        <section className="mb-32">
          <SectionHeader 
            num="1" 
            title="The Container Revolution" 
            desc="Before Docker, we had to manually install Python, Postgres, and Redis on every server. It was a nightmare. Docker changed the game by standardizing the 'box' software ships in." 
          />
          
          

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-red-50 rounded-xl mb-4 text-red-600">
                    <Server size={32} />
                </div>
                {/* Explicitly text-black */}
                <h3 className="text-xl font-bold mb-2 text-black">The Old Way (VMs)</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                    Virtual Machines are heavy. Each one contains a <strong>full Operating System</strong> (Windows/Linux), taking up GBs of space and minutes to boot.
                </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-blue-100 rounded-xl mb-4 text-blue-600">
                    <Container size={32} />
                </div>
                {/* Kept blue because it has a specific color */}
                <h3 className="text-xl font-bold mb-2 text-blue-900">The Docker Way</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                    Containers are light. They share the host's <strong>OS Kernel</strong> but keep applications isolated. They start in milliseconds and take up MBs.
                </p>
            </div>
          </div>
        </section>

        {/* --- Module 2: Image vs Container --- */}
        <section className="mb-32">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
            <div className="mb-8">
               <SectionHeader 
                num="2" 
                title="Two Core Concepts" 
                desc="Newcomers often confuse Images and Containers. Understanding the distinction is the most important part of learning Docker." 
               />
            </div>

            <div className="space-y-12">
              
              {/* --- Concept A: The Image --- */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden group hover:border-blue-300 transition-colors duration-300">
                  <div className="bg-blue-50/50 p-6 md:p-8 border-b border-blue-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">Concept A</span>
                              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Layers size={14} /> Static</span>
                          </div>
                          {/* Explicitly text-black */}
                          <h4 className="font-bold text-3xl text-black mb-2">The Image</h4>
                          <p className="text-zinc-600 font-medium">The Blueprint (ReadOnly)</p>
                      </div>
                      <div className="bg-white px-5 py-4 rounded-xl border border-blue-200 shadow-sm font-mono text-sm flex items-center select-none">
                         <span className="text-2xl mr-2">💿</span>
                         <span className="text-gray-500">python:3.9-slim</span>
                      </div>
                  </div>
                  <div className="p-6 md:p-8">
                      <p className="text-zinc-600 mb-6 text-sm">
                          An image is a frozen snapshot of your application. It contains your code, libraries, and settings. You cannot edit an image once built; you can only build a new one.
                      </p>
                      <TerminalWindow commands={["docker build -t my-app ."]} />
                  </div>
              </div>

              {/* --- Concept B: The Container --- */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden group hover:border-green-300 transition-colors duration-300">
                  <div className="bg-green-50/50 p-6 md:p-8 border-b border-green-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-100 px-2 py-0.5 rounded-full border border-green-200">Concept B</span>
                              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Activity size={14} /> Runtime</span>
                          </div>
                          {/* Explicitly text-black */}
                          <h4 className="font-bold text-3xl text-black mb-2">The Container</h4>
                          <p className="text-zinc-600 font-medium">The Running Instance</p>
                      </div>
                      <div className="bg-white px-5 py-4 rounded-xl border border-green-200 shadow-sm font-mono text-sm flex items-center select-none">
                         <span className="text-2xl mr-2">🚀</span>
                         <span className="text-gray-500">process_id_101</span>
                      </div>
                  </div>
                  <div className="p-6 md:p-8">
                       <p className="text-zinc-600 mb-6 text-sm">
                          A container is a running instance of an image. You can start, stop, and delete containers. You can run 100 containers from a single image.
                      </p>
                      <TerminalWindow commands={["docker run -p 8000:8000 my-app"]} />
                  </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- Module 3: The Recipe --- */}
        <section className="mb-32">
          <SectionHeader 
            num="3" 
            title="The Recipe: Dockerfile" 
            desc="To create an image, you write a text file called 'Dockerfile'. It tells Docker exactly how to assemble your application layer by layer." 
          />

          

          <CodeWindow 
            title="Dockerfile" 
            caption="A standard Dockerfile for a Python application."
            code={`# 1. Start from a base OS or language
FROM python:3.9-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy requirements file FIRST (for caching)
COPY requirements.txt .

# 4. Install dependencies inside the container
RUN pip install -r requirements.txt

# 5. Copy the rest of your app code
COPY . .

# 6. Define the command to run when container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
             <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                <span className="font-mono font-bold text-blue-600 block mb-1">FROM</span>
                <span className="text-xs text-zinc-600">The base layer (OS/Language). Always the first line.</span>
             </div>
             <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                <span className="font-mono font-bold text-blue-600 block mb-1">COPY</span>
                <span className="text-xs text-zinc-600">Moves files from your computer into the container.</span>
             </div>
             <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                <span className="font-mono font-bold text-blue-600 block mb-1">CMD</span>
                <span className="text-xs text-zinc-600">The final command that launches your app.</span>
             </div>
          </div>
        </section>

        {/* --- Module 4: Networking --- */}
        <section className="mb-32">
           <SectionHeader 
            num="4" 
            title="Port Mapping" 
            desc="Containers are isolated. If your app listens on port 80 inside the container, you cannot access it unless you 'map' it to the outside world." 
           />

           <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white border border-gray-200 p-10 rounded-3xl shadow-sm">
              <div className="text-center">
                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 mb-3">
                    <Globe size={32} />
                 </div>
                 {/* Explicitly text-black */}
                 <h4 className="font-bold text-lg text-black">Your Browser</h4>
                 <code className="text-xs bg-gray-100 px-2 py-1 rounded text-black">localhost:3000</code>
              </div>

              <div className="flex-1 flex flex-col items-center">
                 <div className="w-full h-1 border-t-2 border-dashed border-gray-300 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-mono text-zinc-500">
                        -p 3000:80
                    </div>
                 </div>
                 <div className="mt-2 text-xs text-zinc-400 uppercase font-bold tracking-widest flex items-center gap-1">
                    <Network size={12} /> The Bridge
                 </div>
              </div>

              <div className="text-center">
                 <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-3">
                    <Box size={32} />
                 </div>
                 {/* Explicitly text-black */}
                 <h4 className="font-bold text-lg text-black">Container</h4>
                 <code className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">Port 80</code>
              </div>
           </div>

           <div className="mt-6 bg-zinc-100 p-4 rounded-lg text-sm text-zinc-600 flex items-center gap-3">
              {/* Explicitly text-black for the code */}
              <span className="font-mono font-bold bg-white px-2 py-1 rounded border border-gray-200 text-black">3000:80</span>
              <span className="text-black">Left side is <strong>YOUR</strong> machine. Right side is the <strong>CONTAINER</strong>.</span>
           </div>
        </section>

        {/* --- Module 5: Storage (Volumes) --- */}
        <section className="mb-32">
           <SectionHeader 
            num="5" 
            title="Data Persistence" 
            desc="Containers are ephemeral. If you delete a container, its data vanishes. To save databases or files, you must use Volumes." 
           />

           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-100 p-8 rounded-2xl">
                 <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <HardDrive size={18} /> No Volume
                 </h4>
                 <p className="text-sm text-red-800/80 mb-4">
                    If the container crashes or updates, your SQLite database or uploaded files are deleted forever.
                 </p>
              </div>
              <div className="bg-green-50 border border-green-100 p-8 rounded-2xl">
                 <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                    <Database size={18} /> With Volume
                 </h4>
                 <p className="text-sm text-green-800/80 mb-4">
                    Data is stored on your actual hard drive, outside the container. It survives restarts.
                 </p>
              </div>
           </div>
           
           <TerminalWindow commands={["docker run -v my_data:/app/data postgres"]} />
        </section>

        {/* --- Module 6: Docker Compose --- */}
        <section className="mb-24">
          <SectionHeader 
            num="6" 
            title="Docker Compose" 
            desc="Running one container is easy. Running a Frontend, Backend, and Database together? That's where Docker Compose shines." 
          />
          
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] rounded-3xl p-1 shadow-2xl">
              <div className="bg-[#1e1e1e] rounded-[22px] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <span className="text-gray-300 font-bold text-sm flex items-center gap-2">
                        <FileText size={16} /> docker-compose.yml
                    </span>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded font-bold uppercase">Orchestration</span>
                </div>
                <div className="p-8 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed text-gray-300">
{`version: '3.8'

services:
  # 1. The Backend
  api:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./app:/code/app  # Sync code in real-time

  # 2. The Database
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:`}
                    </pre>
                </div>
              </div>
          </div>

          <div className="mt-8 text-center">
             <p className="text-zinc-600 mb-4">Spin up your entire infrastructure with one word:</p>
             <code className="text-xl font-bold bg-black text-white px-6 py-3 rounded-xl shadow-lg">docker-compose up</code>
          </div>
        </section>

        <NextCourseSection 
        href="/learn/kuber" 
        title="Start Learning Kubernetees" 
        />

      </main>
    </div>
  );
}