import NextCourseSection from "@/app/NextCourseSection";
import Link from "next/link";
import React from "react";

// --- Icons (Inline SVGs) ---
const Icons = {
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
  ),
  Filter: () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  Fingerprint: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/></svg>
  )
};

// --- UI Components ---

const TerminalWindow = ({ commands }: { commands: string[] }) => (
  <div className="bg-[#1e1e1e] rounded-xl shadow-xl overflow-hidden border border-gray-800 my-6 font-mono text-sm group">
    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <span className="text-gray-500 text-xs">zsh</span>
    </div>
    <div className="p-5 space-y-2">
      {commands.map((cmd, i) => (
        <div key={i} className="flex gap-3 text-gray-100 font-medium">
          <span className="text-emerald-500 select-none">➜</span>
          <span>{cmd}</span>
        </div>
      ))}
    </div>
  </div>
);

const CodeWindow = ({ title, code, language = "python", caption }: { title: string; code: string; language?: string; caption?: string }) => (
  <div className="my-0"> {/* Removed margin to fit inside cards better */}
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 font-mono text-sm relative">
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black/50">
        <div className="flex items-center gap-2">
           <span className="text-blue-400">📄</span>
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
      <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">{title}</h2>
    </div>
    <p className="text-xl text-zinc-700 leading-relaxed max-w-2xl">{desc}</p>
  </div>
);

// --- Main Page Component ---

export default function FastAPIBasics() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
            <Icons.ChevronLeft /> Back
          </Link>
          <span className="font-bold text-lg tracking-tight">FastAPI Masterclass</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24">
        
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
            Backend Development Module
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-black tracking-tight leading-[1.1]">
            FastAPI<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">The Essentials</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Master the core concepts: Routing, Parameters, Validation, and Documentation.
          </p>
        </header>

        {/* --- Module: FastAPI Basics --- */}
        <section className="mb-32">
          <SectionHeader 
            num="1" 
            title="FastAPI: The Toolkit" 
            desc="Now we apply the theory. FastAPI is a modern Python web framework that handles all the heavy lifting—validation, serialization, and documentation—automatically." 
          />

          <div className="space-y-24">
            
            {/* Step 1: Hello World */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              <h3 className="text-2xl font-bold mb-4 text-black flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
                The Hello World
              </h3>
              <p className="text-zinc-700 mb-6 text-lg leading-relaxed">
                This is the minimal setup. We import the class, create an instance, and use a <strong>decorator</strong> (`@app.get`) to tell FastAPI to handle requests to the root URL.
              </p>
              
              <CodeWindow 
                title="main.py" 
                language="python"
                code={`from fastapi import FastAPI

# 1. Create the App
app = FastAPI()

# 2. Define the Route
# "GET request to /" -> runs this function
@app.get("/")
async def read_root():
    return {"message": "Hello World", "system": "online"}`}
              />
              
              <div className="bg-zinc-900 text-zinc-400 p-4 rounded-lg font-mono text-sm border border-black mt-4 flex items-center justify-between">
                <div className="flex gap-3">
                   <span className="text-green-500">➜</span>
                   <span>uvicorn main:app --reload</span>
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Terminal</span>
              </div>
            </div>

            {/* Step 2: The Two Types of Parameters */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-black flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
                  Handling Data in the URL
                </h3>
                <p className="text-zinc-700 text-lg leading-relaxed max-w-2xl">
                    There are two distinct ways to grab data from the URL bar. It is critical to know when to use which.
                </p>
                
              </div>

              {/* Stack for URL Parameters */}
              <div className="space-y-12">
                
                {/* --- Part A: Path Parameters --- */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden group hover:border-blue-300 transition-colors duration-300">
                    {/* Header Area */}
                    <div className="bg-blue-50/50 p-6 md:p-8 border-b border-blue-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">Scenario A</span>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Icons.Fingerprint /> Identification</span>
                            </div>
                            <h4 className="font-bold text-3xl text-zinc-900 mb-2">Path Parameters</h4>
                            <p className="text-zinc-600 font-medium">Use these to identify a specific resource.</p>
                        </div>

                        {/* Visualizer */}
                        <div className="bg-white px-5 py-4 rounded-xl border border-blue-200 shadow-sm font-mono text-sm flex items-center select-none transform transition-transform group-hover:scale-[1.02]">
                            <span className="text-gray-400">base_url/users/</span>
                            <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold ml-0.5 shadow-md">5</span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8">
                        <p className="text-zinc-600 mb-6 text-sm">
                            By adding curly brackets <code className="text-blue-600 font-bold bg-blue-50 px-1 rounded">{`{user_id}`}</code> in the decorator, you tell FastAPI to capture that part of the URL and pass it as an argument.
                        </p>
                        <CodeWindow 
                          title="main.py" 
                          caption="FastAPI auto-converts the string '5' to the integer 5."
                          code={`@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id}`}
                        />
                    </div>
                </div>

                {/* --- Part B: Query Parameters --- */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden group hover:border-amber-300 transition-colors duration-300">
                    {/* Header Area */}
                    <div className="bg-amber-50/50 p-6 md:p-8 border-b border-amber-100 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">Scenario B</span>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1"><Icons.Filter /> Modification</span>
                            </div>
                            <h4 className="font-bold text-3xl text-zinc-900 mb-2">Query Parameters</h4>
                            <p className="text-zinc-600 font-medium">Use these to filter, sort, or paginate.</p>
                        </div>

                        {/* Visualizer */}
                        <div className="bg-white px-5 py-4 rounded-xl border border-amber-200 shadow-sm font-mono text-sm flex items-center select-none transform transition-transform group-hover:scale-[1.02]">
                            <span className="text-gray-400">base_url/items</span>
                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md font-bold border border-amber-200 ml-1 shadow-sm">?limit=10</span>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8">
                         <p className="text-zinc-600 mb-6 text-sm">
                            Query parameters are defined <strong>only</strong> in the function arguments, not in the path string.
                        </p>
                        <CodeWindow 
                          title="main.py" 
                          code={`# 'limit' is NOT in the path string
@app.get("/items/")
async def get_items(limit: int = 10):
    return {"limit": limit}`}
                        />
                    </div>
                </div>

              </div>
            </div>

            {/* Step 3: Pydantic */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              <h3 className="text-2xl font-bold mb-4 text-black flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</span>
                Data Validation (The Special Sauce)
              </h3>
              <p className="text-zinc-700 mb-6 text-lg">
                In most frameworks, you have to write code to check if `price` is actually a number. In FastAPI, you just define a <strong>Pydantic Model</strong>.
              </p>
              

              <CodeWindow 
                title="main.py" 
                caption="FastAPI will now enforce these types strictly."
                code={`from pydantic import BaseModel

# 1. Define the Blueprint
class Item(BaseModel):
    name: str
    price: float        # Must be a number
    is_offer: bool | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item`}
              />

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                     <strong className="text-green-800 flex items-center gap-2 text-sm uppercase tracking-wide mb-2">
                        <Icons.Check /> Valid Request
                     </strong>
                     <pre className="text-xs text-green-900 font-mono">
{`{
  "name": "Apple",
  "price": 2.5
}`}
                     </pre>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg relative overflow-hidden">
                     <strong className="text-red-800 flex items-center gap-2 text-sm uppercase tracking-wide mb-2">
                        ❌ Invalid Request
                     </strong>
                      <pre className="text-xs text-red-900 font-mono">
{`{
  "name": "Apple",
  "price": "hello"  <-- Error!
}`}
                     </pre>
                     <div className="mt-2 text-[10px] text-red-600 font-medium">FastAPI returns: "value is not a valid float" automatically.</div>
                  </div>
              </div>
            </div>
              
            {/* Step 4: Auto Docs */}
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h4 className="font-bold text-2xl text-black mb-2">Automatic Documentation</h4>
                      <p className="text-zinc-600 mb-4">
                        Because you defined your types, FastAPI generates a purely interactive documentation page for you. You don't write a single line of HTML.
                      </p>
                      <div className="inline-block bg-zinc-100 text-zinc-600 px-3 py-1 rounded border border-zinc-200 font-mono text-sm">
                        http://localhost:8000/docs
                      </div>
                    </div>
                    
                    {/* Simulated Swagger UI Component */}
                    <div className="flex-1 w-full bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden select-none">
                        <div className="bg-[#f0f0f0] px-4 py-2 border-b border-gray-300 flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                           <span className="font-bold text-zinc-700 text-xs">FastAPI Docs</span>
                        </div>
                        <div className="p-4 space-y-2">
                           {/* GET Route */}
                           <div className="border border-[#61affe] rounded bg-[#ebf3fb] flex items-center overflow-hidden">
                              <div className="bg-[#61affe] text-white px-3 py-1.5 text-xs font-bold w-16 text-center">GET</div>
                              <div className="px-3 text-xs font-mono text-zinc-700 font-medium">/items/</div>
                              <div className="ml-auto mr-3 text-xs text-zinc-500">Read Items</div>
                           </div>
                           {/* POST Route */}
                           <div className="border border-[#49cc90] rounded bg-[#e8f6f0] flex items-center overflow-hidden">
                              <div className="bg-[#49cc90] text-white px-3 py-1.5 text-xs font-bold w-16 text-center">POST</div>
                              <div className="px-3 text-xs font-mono text-zinc-700 font-medium">/items/</div>
                              <div className="ml-auto mr-3 text-xs text-zinc-500">Create Item</div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </section>
        <NextCourseSection 
        href="/learn/kafka" 
        title="Start Learning Kafka" 
      />
      </main>
    </div>
  );
}