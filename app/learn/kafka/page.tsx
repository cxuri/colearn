import Link from "next/link";
import React from "react";
import { 
  ChevronLeft, 
  Terminal, 
  Server, 
  Database, 
  FileText, 
  Zap, 
  ArrowRight,
  Layers,
  Users,
  MessageSquare,
  Bookmark,
  Repeat
} from "lucide-react";
import NextCourseSection from "@/app/NextCourseSection";

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
          <span className="text-red-500 select-none">$</span>
          <span>{cmd}</span>
        </div>
      ))}
    </div>
  </div>
);

const CodeWindow = ({ title, code, language = "python", caption }: { title: string; code: string; language?: string; caption?: string }) => (
  <div className="my-0">
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 font-mono text-sm relative">
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black/50">
        <div className="flex items-center gap-2">
           <span className="text-red-400"><FileText size={14} /></span>
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
      <h2 className="text-3xl font-bold text-black tracking-tight">{title}</h2>
    </div>
    <p className="text-xl text-zinc-700 leading-relaxed max-w-2xl">{desc}</p>
  </div>
);

// --- Main Page Component ---

export default function KafkaMasterclass() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
            <ChevronLeft size={18} /> Back
          </Link>
          <span className="font-bold text-lg tracking-tight text-black">Data Engineering Module</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24">
        
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-red-100">
            Apache Kafka
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-black tracking-tight leading-[1.1]">
            The Central<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Nervous System.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Learn the high-throughput, distributed streaming platform that powers the world's biggest real-time systems.
          </p>
        </header>

        {/* --- Module 1: The Problem --- */}
        <section className="mb-32">
          <SectionHeader 
            num="1" 
            title="Why do we need Kafka?" 
            desc="In simple apps, Service A calls Service B directly. But what happens when you have 50 services? You get a 'Spaghetti Architecture'. Kafka solves this by Decoupling." 
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-zinc-100 rounded-xl mb-4 text-zinc-600">
                    <Repeat size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">The Spaghetti Mess</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                    If the Billing Service is down, the Order Service crashes. Everything is tightly coupled. Adding a new service requires changing existing code.
                </p>
            </div>
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-red-100 rounded-xl mb-4 text-red-600">
                    <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-900">The Event Log</h3>
                <p className="text-red-900/80 text-sm leading-relaxed">
                    Service A just says "Order Placed" (Event) and forgets about it. Service B, C, and D listen to the stream and react when they are ready.
                </p>
            </div>
          </div>
        </section>

        {/* --- Module 2: The Architecture --- */}
        <section className="mb-32">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
            <div className="mb-8">
               <SectionHeader 
                num="2" 
                title="The Core Terminology" 
                desc="Kafka has a unique vocabulary. You are not dealing with tables or queues; you are dealing with Streams and Logs." 
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Card 1: Producer */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg"><ArrowRight size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Producer</h4>
                    </div>
                    <p className="text-sm text-zinc-600">The app that <strong>sends</strong> data. It pushes messages to a Kafka Topic.</p>
                </div>

                {/* Card 2: Consumer */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-100 text-green-700 p-2 rounded-lg"><ArrowRight size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Consumer</h4>
                    </div>
                    <p className="text-sm text-zinc-600">The app that <strong>reads</strong> data. It pulls messages from a Kafka Topic.</p>
                </div>

                {/* Card 3: Broker */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-zinc-100 text-zinc-700 p-2 rounded-lg"><Server size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Broker</h4>
                    </div>
                    <p className="text-sm text-zinc-600">A single Kafka server. A cluster is made of multiple brokers working together.</p>
                </div>

                {/* Card 4: Topic */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-red-100 text-red-700 p-2 rounded-lg"><Database size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Topic</h4>
                    </div>
                    <p className="text-sm text-zinc-600">A category for messages (e.g., "user-signups"). Similar to a table in SQL, but it's a log.</p>
                </div>

            </div>
          </div>
        </section>

        {/* --- Module 3: Anatomy of a Topic --- */}
        <section className="mb-32">
          <SectionHeader 
            num="3" 
            title="Topics, Partitions & Offsets" 
            desc="This is the most critical concept. A Topic is split into 'Partitions' so it can scale across multiple servers." 
          />

          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Layers size={20} className="text-red-600" />
                <h3 className="text-xl font-bold text-black">Topic: "payment-processed"</h3>
             </div>

             {/* Visualization of Partitions */}
             <div className="space-y-6">
                
                {/* Partition 0 */}
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-zinc-400 w-20 uppercase tracking-widest">Partition 0</span>
                    <div className="flex-1 flex gap-1 overflow-hidden">
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="h-10 w-12 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-mono text-zinc-500 rounded">
                                {n}
                            </div>
                        ))}
                        <div className="h-10 w-24 bg-red-50 border border-red-200 flex items-center justify-center text-xs font-bold text-red-700 rounded animate-pulse">
                            New Write
                        </div>
                    </div>
                </div>

                 {/* Partition 1 */}
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-zinc-400 w-20 uppercase tracking-widest">Partition 1</span>
                    <div className="flex-1 flex gap-1 overflow-hidden">
                        {[0, 1, 2].map((n) => (
                            <div key={n} className="h-10 w-12 bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-mono text-zinc-500 rounded">
                                {n}
                            </div>
                        ))}
                         <div className="h-10 w-12 bg-white flex items-center justify-center text-xs text-zinc-300">...</div>
                    </div>
                </div>

             </div>

             <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <strong className="text-black flex items-center gap-2 mb-1"><Bookmark size={16} /> The Offset</strong>
                    <p className="text-xs text-zinc-600">The unique ID (0, 1, 2...) of a message inside a partition. It is <strong>immutable</strong> (never changes).</p>
                </div>
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <strong className="text-black flex items-center gap-2 mb-1"><Users size={16} /> Ordering</strong>
                    <p className="text-xs text-zinc-600">Kafka only guarantees order <strong>within a partition</strong>, not across the whole topic.</p>
                </div>
             </div>
          </div>
        </section>

        {/* --- Module 4: Python Implementation --- */}
        <section className="mb-32">
           <SectionHeader 
            num="4" 
            title="The Python Code" 
            desc="Let's write a simple Producer and Consumer using python. We'll use JSON to structure our data." 
           />

           <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Producer Code */}
              <div>
                  <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-100 text-blue-700 p-1.5 rounded"><MessageSquare size={16} /></div>
                      <h4 className="font-bold text-lg text-black">producer.py</h4>
                  </div>
                  <CodeWindow 
                    title="producer.py" 
                    language="python"
                    code={`from kafka import KafkaProducer
import json

# 1. Initialize Producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# 2. Send Data
data = {"user_id": 101, "action": "click"}
producer.send('user-events', value=data)

# 3. Ensure it's sent
producer.flush()
print("Message sent!")`}
                  />
              </div>

              {/* Consumer Code */}
              <div>
                  <div className="flex items-center gap-2 mb-4">
                      <div className="bg-green-100 text-green-700 p-1.5 rounded"><Zap size={16} /></div>
                      <h4 className="font-bold text-lg text-black">consumer.py</h4>
                  </div>
                   <CodeWindow 
                    title="consumer.py" 
                    language="python"
                    code={`from kafka import KafkaConsumer
import json

# 1. Initialize Consumer
consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    group_id='analytics-group',
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

# 2. Listen loop
print("Listening...")
for message in consumer:
    print(f"Received: {message.value}")`}
                  />
              </div>

           </div>
        </section>

        {/* --- Module 5: CLI Commands --- */}
        <section className="mb-24">
          <SectionHeader 
            num="5" 
            title="Essential CLI Commands" 
            desc="Sometimes you need to inspect the cluster directly without writing code. Here are the everyday commands." 
          />
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
             <div className="space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                   <div>
                      <strong className="text-lg font-bold text-black block">Create a Topic</strong>
                      <span className="text-zinc-500 text-sm">Create a topic named 'events' with 3 partitions.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kafka-topics.sh --create --topic events --partitions 3
                   </code>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                   <div>
                      <strong className="text-lg font-bold text-black block">List Topics</strong>
                      <span className="text-zinc-500 text-sm">See everything available on the broker.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kafka-topics.sh --list --bootstrap-server localhost:9092
                   </code>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <strong className="text-lg font-bold text-black block">Start Console Consumer</strong>
                      <span className="text-zinc-500 text-sm">Read messages directly in your terminal.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kafka-console-consumer.sh --topic events --from-beginning
                   </code>
                </div>

             </div>
          </div>
        </section>

        <NextCourseSection 
        href="/learn/docker" 
        title="Start Learning Docker Now" 
      />
      </main>
    </div>
  );
}