import NextCourseSection from "@/app/NextCourseSection";
import Link from "next/link";
import React from "react";

// --- Icons ---
const Icons = {
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Braces: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>
  )
};

// --- Components ---

const CodeWindow = ({ title, code, language = "json", caption, error }: { title: string; code: string; language?: string; caption?: string; error?: boolean }) => (
  <div className="my-0">
    <div className={`rounded-xl shadow-lg overflow-hidden border ${error ? 'border-red-300' : 'border-gray-800'} font-mono text-sm relative`}>
      <div className={`${error ? 'bg-red-50 border-red-200' : 'bg-[#252526] border-black/50'} px-4 py-2 flex items-center justify-between border-b`}>
        <div className="flex items-center gap-2">
           <span className={error ? 'text-red-600' : 'text-blue-400'}>{error ? '⚠️' : '📄'}</span>
           <span className={`${error ? 'text-red-900' : 'text-gray-300'} font-medium text-xs`}>{title}</span>
        </div>
        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{language}</span>
      </div>
      <div className={`p-6 overflow-x-auto ${error ? 'bg-red-50/50' : 'bg-[#1e1e1e]'} text-[13px] leading-relaxed`}>
        <pre className={`${error ? 'text-red-900' : 'text-[#d4d4d4]'} whitespace-pre font-normal font-mono`}>{code}</pre>
      </div>
    </div>
    {caption && <p className={`mt-2 text-sm italic text-center ${error ? 'text-red-700' : 'text-zinc-500'}`}>👆 {caption}</p>}
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

// --- Main Page ---

export default function JSONModule() {
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
        
        {/* Hero */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-yellow-50 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-yellow-100">
            Module 1: The Data Format
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-black tracking-tight leading-[1.1]">
            The Universal Language:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">JSON</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Before we build a server, we must learn the language servers speak. It is the glue between your Python backend and the rest of the world.
          </p>
        </header>

        {/* --- Section 1: Anatomy --- */}
        <section className="mb-32">
          <SectionHeader 
            num="1" 
            title="The Anatomy of JSON" 
            desc="JSON (JavaScript Object Notation) is a text format for storing and transporting data. It is easy for humans to read and easy for machines to parse." 
          />

          

          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <CodeWindow 
                  title="user_profile.json" 
                  caption="A standard JSON object."
                  code={`{
  "id": 8402,
  "username": "CodeMaster",
  "is_admin": true,
  "tags": ["python", "api"],
  "settings": {
    "theme": "dark",
    "notifications": null
  }
}`}
                />
             </div>
             
             <div className="space-y-6">
                <h3 className="text-xl font-bold">The Building Blocks</h3>
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                   <div className="flex items-center gap-3 mb-2">
                      <Icons.Braces />
                      <span className="font-bold text-lg">Objects</span>
                   </div>
                   <p className="text-zinc-600 text-sm">Wrapped in curly braces <strong>{`{}`}</strong>. They hold key/value pairs.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-lg">[ ]</span>
                      <span className="font-bold text-lg">Arrays</span>
                   </div>
                   <p className="text-zinc-600 text-sm">Wrapped in square brackets. An ordered list of values.</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-lg">"Keys"</span>
                   </div>
                   <p className="text-zinc-600 text-sm">Keys must <strong>always</strong> be strings enclosed in double quotes.</p>
                </div>
             </div>
          </div>
        </section>

        {/* --- Section 2: Data Types --- */}
        <section className="mb-32">
           <SectionHeader 
            num="2" 
            title="Supported Data Types" 
            desc="JSON is strict. It only supports a specific set of data types. You cannot put functions, dates, or custom classes directly into JSON." 
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
               { type: "String", val: '"Hello"', color: "bg-green-50 text-green-700 border-green-200" },
               { type: "Number", val: '42 or 3.14', color: "bg-blue-50 text-blue-700 border-blue-200" },
               { type: "Boolean", val: 'true / false', color: "bg-purple-50 text-purple-700 border-purple-200" },
               { type: "Null", val: 'null', color: "bg-gray-100 text-gray-800 border-gray-200" },
               { type: "Array", val: '[1, 2, 3]', color: "bg-orange-50 text-orange-700 border-orange-200" },
               { type: "Object", val: '{"id": 1}', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
             ].map((item, i) => (
               <div key={i} className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${item.color}`}>
                  <span className="font-bold uppercase tracking-widest text-xs mb-2">{item.type}</span>
                  <span className="font-mono text-lg font-bold">{item.val}</span>
               </div>
             ))}
          </div>
          
          <div className="mt-6 bg-zinc-100 p-4 rounded-lg text-sm text-zinc-800 text-center">
            Note: JSON does not support <span className="text-red-700 font-bold">undefined</span>, <span className="text-red-700 font-bold">functions</span>, or <span className="text-red-700 font-bold">comments</span>.
          </div>
        </section>

        {/* --- Section 3: Common Mistakes --- */}
        <section className="mb-32">
          <SectionHeader 
            num="3" 
            title="Syntax Rules (The Gotchas)" 
            desc="JSON is not Python code. It is stricter. If you break these rules, your API will crash." 
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mistake 1 */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">1</span>
                Single Quotes are Illegal
              </h3>
              <p className="text-zinc-600 mb-4 text-sm">Python allows single quotes. JSON does <strong>not</strong>.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <Icons.X />
                  <span className="text-red-900 text-sm font-mono">{'{\'name\': \'John\'}'}</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                   <Icons.Check />
                   <span className="text-green-800 text-sm font-mono">{'{"name": "John"}'}</span>
                </div>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">2</span>
                Trailing Commas
              </h3>
              <p className="text-zinc-600 mb-4 text-sm">You cannot leave a comma after the last item.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <Icons.X />
                  <span className="text-red-900 text-sm font-mono">{'[1, 2, 3, ]'}</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                   <Icons.Check />
                   <span className="text-green-800 text-sm font-mono">{'[1, 2, 3]'}</span>
                </div>
              </div>
            </div>
            
            {/* Mistake 3 */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">3</span>
                Boolean Capitalization
              </h3>
              <p className="text-zinc-600 mb-4 text-sm">Python uses <strong>True</strong>. JSON uses <strong>true</strong>.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <Icons.X />
                  <span className="text-red-900 text-sm font-mono">"is_admin": True</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                   <Icons.Check />
                   <span className="text-green-800 text-sm font-mono">"is_admin": true</span>
                </div>
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs">4</span>
                Comments
              </h3>
              <p className="text-zinc-600 mb-4 text-sm">You cannot add comments in JSON files.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <Icons.X />
                  <span className="text-red-900 text-sm font-mono">{"// This is user data"}</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                   <Icons.Check />
                   <span className="text-green-800 text-sm font-mono italic">(No comments allowed)</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- Section 4: Python Integration --- */}
        <section className="mb-24">
           <SectionHeader 
            num="4" 
            title="Python Integration" 
            desc="FastAPI handles JSON automatically, but sometimes you need to convert it manually. Python has a built-in library for this." 
          />

          <div className="bg-[#1e1e1e] p-1 rounded-2xl shadow-2xl overflow-hidden">
             <div className="bg-[#2d2d2d] px-6 py-3 flex justify-between items-center">
              <span className="text-gray-300 font-bold">script.py</span>
            </div>
            <div className="p-8">
               <pre className="font-mono text-sm leading-relaxed text-gray-300">
{`import json

# 1. Python Dictionary
data = {
    "name": "Alice",
    "age": 25,
    "is_student": True,  # Python Boolean
    "courses": None      # Python None
}

# 2. Convert to JSON String (Serialization)
json_string = json.dumps(data)
print(json_string)
# Output: {"name": "Alice", "age": 25, "is_student": true, "courses": null}

# 3. Convert back to Python (Deserialization)
python_obj = json.loads(json_string)
print(python_obj["name"])
# Output: Alice`}
               </pre>
            </div>
          </div>
        </section>

        <NextCourseSection 
        href="/learn/fastapi" 
        title="Start Learning Fast API now" 
      />
      </main>
    </div>
  );
}