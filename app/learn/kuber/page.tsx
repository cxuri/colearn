import Link from "next/link";
import React from "react";
import { 
  ChevronLeft, 
  Terminal, 
  Box, 
  Ship, 
  Anchor, 
  Server, 
  Activity, 
  Globe, 
  Cpu, 
  Layers, 
  RefreshCw,
  Search
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
          <span className="text-blue-500 select-none">$</span>
          <span>{cmd}</span>
        </div>
      ))}
    </div>
  </div>
);

const CodeWindow = ({ title, code, language = "yaml", caption }: { title: string; code: string; language?: string; caption?: string }) => (
  <div className="my-0">
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-gray-800 font-mono text-sm relative">
      <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black/50">
        <div className="flex items-center gap-2">
           <span className="text-blue-400"><Layers size={14} /></span>
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

export default function KubernetesMasterclass() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black transition-colors">
            <ChevronLeft size={18} /> Back
          </Link>
          <span className="font-bold text-lg tracking-tight text-black">DevOps Essentials</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-24">
        
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100">
            Module 2: Orchestration
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-black tracking-tight leading-[1.1]">
            The Operating System<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">for the Cloud.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Docker runs a single ship. Kubernetes (K8s) manages the entire fleet. Learn how to automate deployment, scaling, and management of containerized apps.
          </p>
        </header>

        {/* --- Module 1: The Concept --- */}
        <section className="mb-32">
          <SectionHeader 
            num="1" 
            title="Orchestration vs. Docker" 
            desc="If Docker is a musician playing a violin, Kubernetes is the conductor managing the entire orchestra." 
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-zinc-100 rounded-xl mb-4 text-zinc-600">
                    <Box size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">Docker</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                    Great for running a container on your laptop. But what happens if that container crashes? Or if you need 50 copies of it? You have to do it manually.
                </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-start">
                <div className="p-3 bg-blue-100 rounded-xl mb-4 text-blue-600">
                    <Ship size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-900">Kubernetes</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                    K8s watches your containers. If one crashes, it restarts it. If traffic spikes, it adds more. It handles the health of the entire system automatically.
                </p>
            </div>
          </div>
        </section>

        {/* --- Module 2: Architecture --- */}
        <section className="mb-32">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
            <div className="mb-8">
               <SectionHeader 
                num="2" 
                title="The Cluster Architecture" 
                desc="A Kubernetes cluster is split into two parts: The Brains (Control Plane) and the Muscle (Worker Nodes)." 
               />
            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                
                {/* Control Plane */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-100 text-purple-700 p-2 rounded-lg"><Cpu size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Control Plane (Master)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-600">
                        <li className="flex gap-2"><span className="text-purple-600 font-bold">• API Server:</span> The front desk. Handles all commands.</li>
                        <li className="flex gap-2"><span className="text-purple-600 font-bold">• Scheduler:</span> Decides which node a pod goes to.</li>
                        <li className="flex gap-2"><span className="text-purple-600 font-bold">• Etcd:</span> The database storing cluster state.</li>
                    </ul>
                </div>

                {/* Worker Node */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg"><Server size={20} /></div>
                        <h4 className="font-bold text-lg text-black">Worker Nodes</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-600">
                        <li className="flex gap-2"><span className="text-blue-600 font-bold">• Kubelet:</span> The agent talking to the master.</li>
                        <li className="flex gap-2"><span className="text-blue-600 font-bold">• Kube Proxy:</span> Handles networking.</li>
                        <li className="flex gap-2"><span className="text-blue-600 font-bold">• Pods:</span> Where your apps actually run.</li>
                    </ul>
                </div>

            </div>
          </div>
        </section>

        {/* --- Module 3: The Objects --- */}
        <section className="mb-32">
          <SectionHeader 
            num="3" 
            title="The Holy Trinity of Objects" 
            desc="You rarely run a container directly. You use these three high-level objects to manage your applications." 
          />

          

[Image of Kubernetes Pod vs Container diagram]


          <div className="space-y-6">
              
              {/* Object 1: Pod */}
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 flex-shrink-0 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                      <Box size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-xl text-black mb-1">1. The Pod</h4>
                      <p className="text-zinc-600 text-sm mb-2">The smallest deployable unit. Think of it as a "wrapper" around your container.</p>
                      <div className="bg-zinc-100 text-xs px-3 py-1.5 rounded inline-block text-zinc-700">
                          <strong>Rule:</strong> 1 Pod usually = 1 Container.
                      </div>
                  </div>
              </div>

              {/* Object 2: Deployment */}
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 flex-shrink-0 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
                      <RefreshCw size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-xl text-black mb-1">2. The Deployment</h4>
                      <p className="text-zinc-600 text-sm mb-2">Manages the Pods. You tell it "I want 3 replicas of my app", and it ensures 3 are always running. It also handles updates.</p>
                      <div className="bg-zinc-100 text-xs px-3 py-1.5 rounded inline-block text-zinc-700">
                          <strong>Role:</strong> Scaling & Self-Healing.
                      </div>
                  </div>
              </div>

              {/* Object 3: Service */}
              <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 flex-shrink-0 bg-orange-100 text-orange-700 rounded-xl flex items-center justify-center">
                      <Anchor size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-xl text-black mb-1">3. The Service</h4>
                      <p className="text-zinc-600 text-sm mb-2">Pods are ephemeral; they get new IPs when they restart. A Service provides a <strong>stable IP address</strong> to access a set of Pods.</p>
                      <div className="bg-zinc-100 text-xs px-3 py-1.5 rounded inline-block text-zinc-700">
                          <strong>Role:</strong> Networking & Load Balancing.
                      </div>
                  </div>
              </div>

          </div>
        </section>

        {/* --- Module 4: The Recipe (YAML) --- */}
        <section className="mb-32">
           <SectionHeader 
            num="4" 
            title="Declarative Configuration" 
            desc="In K8s, you don't tell the system 'what to do'. You tell it 'what you want', usually via a YAML file. K8s makes it happen." 
           />

           <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Deployment YAML */}
              <div>
                  <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-100 text-blue-700 p-1.5 rounded"><Layers size={16} /></div>
                      <h4 className="font-bold text-lg text-black">deployment.yaml</h4>
                  </div>
                  <CodeWindow 
                    title="deployment.yaml" 
                    language="yaml"
                    code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
spec:
  replicas: 3            # I want 3 copies
  selector:
    matchLabels:
      app: web
  template:              # The Pod Blueprint
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: frontend
        image: nginx:latest
        ports:
        - containerPort: 80`}
                  />
              </div>

              {/* Service YAML */}
              <div>
                  <div className="flex items-center gap-2 mb-4">
                      <div className="bg-orange-100 text-orange-700 p-1.5 rounded"><Globe size={16} /></div>
                      <h4 className="font-bold text-lg text-black">service.yaml</h4>
                  </div>
                   <CodeWindow 
                    title="service.yaml" 
                    language="yaml"
                    code={`apiVersion: v1
kind: Service
metadata:
  name: my-web-service
spec:
  type: LoadBalancer     # Expose to public internet
  selector:
    app: web             # Connect to pods labeled 'web'
  ports:
    - protocol: TCP
      port: 80           # External port
      targetPort: 80     # Container port`}
                  />
              </div>

           </div>
        </section>

        {/* --- Module 5: Kubectl CLI --- */}
        <section className="mb-24">
          <SectionHeader 
            num="5" 
            title="Kubectl: The Remote Control" 
            desc="You interact with the cluster using the command line tool 'kubectl'. Here are the 4 commands you'll use 90% of the time." 
          />
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
             <div className="space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                   <div>
                      <strong className="text-lg font-bold text-black block">Apply Configuration</strong>
                      <span className="text-zinc-500 text-sm">Send your YAML file to the cluster to create/update resources.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kubectl apply -f deployment.yaml
                   </code>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                   <div>
                      <strong className="text-lg font-bold text-black block">Get Resources</strong>
                      <span className="text-zinc-500 text-sm">List all running pods.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kubectl get pods
                   </code>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                   <div>
                      <strong className="text-lg font-bold text-black block">Describe (Debug)</strong>
                      <span className="text-zinc-500 text-sm">See detailed details and error events for a specific pod.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kubectl describe pod [pod-name]
                   </code>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div>
                      <strong className="text-lg font-bold text-black block">Get Logs</strong>
                      <span className="text-zinc-500 text-sm">Print the stdout output of the container.</span>
                   </div>
                   <code className="bg-zinc-100 px-4 py-2 rounded-lg font-mono text-sm text-black border border-zinc-200">
                      kubectl logs [pod-name]
                   </code>
                </div>

             </div>
          </div>
        </section>
        <NextCourseSection 
        href="/learn" 
        title="Course Is Complete, Lets go back to Courses" 
      />
      </main>
    </div>
  );
}