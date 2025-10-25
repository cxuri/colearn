import {
  Target,
  BookCheck,
  Code2,
  CheckCircle2, // For the hero list
  ArrowRight, // For the hero button
  Users, // For the 'About' section & Combined CTA
  MessageSquareWarning, // Represents WhatsApp chaos
  LayoutGrid, // Represents organized app
  LogIn, // For 'How it Works'
  Brain, // For 'How it Works'
  Briefcase, // For 'How it Works'
  Lightbulb, // Phase 1: Idea
  Construction, // Phase 2: Building
  TestTube2, // Phase 3: Beta
  Rocket, // Phase 4: Launch
  Eye, // For Visual Modules
  Cpu, // For AI Prediction / Pattern Recognition
  Sparkles, // For Curated Content / Fast Pace
  UsersRound, // For Community Driven (alternative)
  Search,

} from 'lucide-react';

export default function LandingPage() {
  let currentPhase = 1; // <-- CHANGE THIS NUMBER TO UPDATE PROGRESS (1, 2, 3, or 4)

  const roadmapPhases = [
    {
      phase: 1,
      title: 'Phase 1: Idea & Feedback',
      description:
        "We're here now! We need your ideas. Tell us what you need through surveys and Discord so we build the right features.",
      icon: Lightbulb,
      status: currentPhase === 1 ? 'Current' : currentPhase > 1 ? 'Completed' : 'Upcoming',
    },
    {
      phase: 2,
      title: 'Phase 2: Building Core Features',
      description:
        'Making the first key parts: notes for your syllabus, basic placement help, and the main community area, using your feedback.',
      icon: Construction,
      status: currentPhase === 2 ? 'Current' : currentPhase > 2 ? 'Completed' : 'Upcoming',
    },
    {
      phase: 3,
      title: 'Phase 3: Beta Testing with You',
      description:
        'Inviting students from our Discord to try the first version, find bugs, and tell us what works (and what doesn’t!).',
      icon: TestTube2,
      status: currentPhase === 3 ? 'Current' : currentPhase > 3 ? 'Completed' : 'Upcoming',
    },
    {
      phase: 4,
      title: 'Phase 4: Public Launch & Growth',
      description:
        'Opening the app to all B.Tech students! We’ll keep adding features and making improvements based on what you tell us.',
      icon: Rocket,
      status: currentPhase === 4 ? 'Current' : currentPhase > 4 ? 'Completed' : 'Upcoming',
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Current':
        return 'border-accent text-accent animate-pulse';
      case 'Completed':
        return 'border-green-500 text-green-500';
      case 'Upcoming':
      default:
        return 'border-[var(--border)] text-[var(--muted-foreground)] opacity-60';
    }
  };

  const getDotClasses = (status: string) => {
    switch (status) {
      case 'Current':
        return 'bg-accent ring-accent/30';
      case 'Completed':
        return 'bg-green-500 ring-green-500/30';
      case 'Upcoming':
      default:
        return 'bg-[var(--muted-foreground)] ring-[var(--border)] opacity-60';
    }
  };

  return (
    // Use CSS variables for background
    <div className="flex min-h-screen flex-col items-center bg-[var(--background)]">
      {/* --- Style tag to define animations --- */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          
          @keyframes gradient-text {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-text {
            background-size: 200% auto;
            animation: gradient-text 5s ease-in-out infinite;
          }

          @keyframes bobble {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-bobble {
            animation: bobble 2s ease-in-out infinite;
          }
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-600 { animation-delay: 600ms; }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 10px -5px var(--accent-glow, #06b6d4);
            }
            50% {
              box-shadow: 0 0 20px 0px var(--accent-glow, #06b6d4);
            }
          }
          .hover-glow:hover {
            --accent-glow: var(--accent);
            animation: glow 2s ease-in-out infinite;
            border-color: var(--accent);
          }
          @keyframes subtle-pulse {
             0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); } /* Use accent color */
             70% { box-shadow: 0 0 0 10px rgba(6, 182, 212, 0); }
          }
          .animate-subtle-pulse {
              animation: subtle-pulse 2s infinite;
          }

          /* Simple chat bubble styles */
          .chat-bubble-left {
            background-color: #27272a; /* Zinc 800 approx */
            color: #e4e4e7; /* Zinc 200 approx */
            border-radius: 12px 12px 12px 0;
          }
          .chat-bubble-right {
             background-color: #059669; /* Emerald 600 approx */
             color: white;
             border-radius: 12px 12px 0 12px;
          }
          
          /* --- NEW: Simple Fade-in Animation --- */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0; /* Start hidden */
          }
          /* --- Staggered delays for animation --- */
          .animation-delay-100 { animation-delay: 100ms; }
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-300 { animation-delay: 300ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-500 { animation-delay: 500ms; }
        `}
      </style>

      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <a href="#" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent animate-gradient-text">
              Colearn
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-[var(--muted-foreground)] md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              How it Works
            </a>
            <a
              href="#roadmap"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Roadmap
            </a>
            <a
              href="#about" // Link now points to the combined section
              className="transition-colors hover:text-[var(--foreground)]"
            >
              About & Join
            </a>
          </div>
          <a
            href="https://discord.gg/pPy4VSRy" // Add your Discord link here
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-sm font-semibold text-gray-950 shadow-sm transition-all duration-200 ease-in-out animate-gradient-text hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Join the Discord
          </a>
        </nav>
      </header>

      <main className="w-full">
        {/* 2. Hero Section */}
        <section className="w-full px-4 py-20 md:py-28 lg:py-36">
           <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-start text-left">
              <h1 className="text-4xl font-extrabold tracking-tighter text-[var(--foreground)] md:text-5xl lg:text-6xl">
                Stop the Scroll. Start Learning.
              </h1>
              <p className="mt-4 text-xl font-medium text-[var(--accent)] md:text-2xl">
                Your B.Tech life, finally organized.
              </p>
              <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted-foreground)] md:text-xl">
                Colearn is the{' '}
                <span className="font-semibold text-[var(--foreground)]">
                  free all-in-one app
                </span>{' '}
                for B.Tech students, made by students like you. Ditch the messy group chats and find notes, placement prep, and career guidance in one smart place.
              </p>

              <div className="mt-10 flex w-full flex-col items-start">
                <a
                  href="https://forms.gle/4CB5QkpwRam8FfCB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg shadow-teal-500/30 transition-all duration-200 ease-in-out animate-subtle-pulse hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Help Us Build It (Quick Survey)
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  Tell us what you need in just 2 minutes!
                </p>
              </div>
            </div>

            {/* Right Column: Feature List */}
            <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 shadow-md shadow-black/5">
              <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
                Core features we're planning:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--accent)] animate-bobble" />
                  <span className="text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Curated Content:</span> Notes & resources for your exact syllabus.
                  </span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--accent)] animate-bobble animation-delay-200" />
                  <span className="text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Smart Learning:</span> Visual modules, adaptive pace & pattern recognition.
                  </span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--accent)] animate-bobble animation-delay-400" />
                  <span className="text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">AI Predictions:</span> Insights into potential question paper patterns.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--accent)] animate-bobble animation-delay-600" />
                  <span className="text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Community Driven:</span> Share resources, ask questions, learn together.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Marquee Section */}
        <section className="w-full border-y border-[var(--border)] bg-[var(--card)]/50">
           <div className="relative flex overflow-hidden py-5 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max flex-shrink-0 animate-marquee items-center">
              {/* List items duplicated for seamless loop */}
              <div className="flex w-max items-center">
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Visual Modules
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  AI Exam Prediction
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Curated Syllabus Content
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                 <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Learn at Your Pace
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Placement Prep Hub
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Skill-Gap Analysis
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Community Driven
                </span>
                 <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  For All B.Tech Branches
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
              </div>
              {/* Duplicate set */}
              <div className="flex w-max items-center" aria-hidden="true">
                 <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Visual Modules
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  AI Exam Prediction
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Curated Syllabus Content
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                 <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Learn at Your Pace
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Placement Prep Hub
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Skill-Gap Analysis
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  Community Driven
                </span>
                 <span className="text-2xl text-[var(--accent)]">&bull;</span>
                <span className="mx-6 text-lg font-medium text-[var(--muted-foreground)]">
                  For All B.Tech Branches
                </span>
                <span className="text-2xl text-[var(--accent)]">&bull;</span>
              </div>
            </div>
          </div>
        </section>
        {/* 4. "Before & After" Section */}
        <section className="w-full bg-[var(--background)] py-20 sm:py-28 lg:py-32">
           <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              From Scattered Chats to Smart Hub
            </h2>
            <p className="mb-12 text-center text-lg text-[var(--muted-foreground)]">
              Stop digging through endless messages. Get what you need, fast.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* "Before" Card - Styled like a messy chat */}
              <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 opacity-90 motion-safe:animate-fadeIn">
                <div className="mb-4 flex items-center gap-2">
                  <MessageSquareWarning className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-red-400">
                    The Old Way: Group Chat Chaos
                  </h3>
                </div>
                {/* Simple Chat Simulation */}
                <div className="flex h-64 flex-col space-y-3 overflow-hidden rounded-md bg-zinc-900 p-3 shadow-inner">
                  <div className="w-fit max-w-[80%] p-2 chat-bubble-left">
                    <p className="text-sm">Anyone have Unit 3 notes?</p>
                  </div>
                  <div className="ml-auto w-fit max-w-[80%] p-2 chat-bubble-right">
                    <p className="text-sm">Which subject bro?</p>
                  </div>
                   <div className="w-fit max-w-[80%] p-2 chat-bubble-left">
                    <p className="text-sm">DBMS... exam is tmrw!</p>
                  </div>
                   <div className="ml-auto w-fit max-w-[80%] p-2 chat-bubble-right">
                    <p className="text-sm">Check drive link maybe? 🤔</p>
                  </div>
                  <div className="w-fit max-w-[80%] p-2 chat-bubble-left">
                    <p className="text-sm">Link expired 😭</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                  Sound familiar? Lost files, endless scrolling, wrong syllabus...
                </p>
              </div>

              {/* "After" Card - Styled like a clean app interface */}
              <div
                className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 transition-all
                           hover-glow motion-safe:animate-fadeIn animation-delay-200"
              >
                <div className="mb-4 flex items-center gap-2">
                  <LayoutGrid className="h-6 w-6 text-[var(--accent)]" />
                  <h3 className="text-xl font-semibold text-[var(--accent)]">
                    The Colearn Way: Organized Hub
                  </h3>
                </div>
                 {/* Simple App UI Simulation */}
                 <div className="flex h-64 flex-col space-y-3 overflow-hidden rounded-md bg-zinc-900 p-3 shadow-inner">
                    {/* Search Bar */}
                    <div className="flex items-center gap-2 rounded bg-zinc-800 p-2">
                         <Search className="h-4 w-4 text-zinc-500"/>
                         <p className="text-sm text-zinc-400">Search "DBMS Unit 3"...</p>
                    </div>
                    {/* Results Area */}
                    <div className="flex-1 space-y-2 rounded bg-zinc-800 p-3">
                        <div className="flex items-center gap-2 rounded bg-accent/10 p-2">
                             <CheckCircle2 className="h-4 w-4 text-accent"/>
                             <p className="text-sm text-accent">Verified Notes - Your Syllabus</p>
                        </div>
                         <div className="flex items-center gap-2 rounded bg-zinc-700 p-2">
                             <BookCheck className="h-4 w-4 text-zinc-400"/>
                             <p className="text-sm text-zinc-300">Previous Year Questions</p>
                        </div>
                         {/* Added one more example */}
                         <div className="flex items-center gap-2 rounded bg-zinc-700 p-2">
                             <Cpu className="h-4 w-4 text-zinc-400"/>
                             <p className="text-sm text-zinc-300">AI Predicted Topics</p>
                        </div>
                    </div>
                 </div>
                <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                  Everything you need, organized by subject and syllabus, always up-to-date.
                </p>
              </div>
            </div>
             {/* --- UPDATED: Text size changed to text-sm --- */}
             <p className="mt-12 text-center text-sm text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-400">
                Note: This is not an official Preview, just a concept.
             </p>
          </div>
        </section>

        {/* 5. Features Section */}
        <section
          id="features"
          className="w-full bg-[var(--card)] py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl motion-safe:animate-fadeIn">
              Learn Smarter, Not Harder
            </h2>
            <p className="mb-12 text-center text-lg text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-100">
              Core features designed to boost your B.Tech journey:
            </p>

            <div className="group grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature Card 1: Smart & Personalized Learning */}
              <div
                className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 
                           transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 hover:-translate-y-1 hover:shadow-xl hover:scale-105 motion-safe:animate-fadeIn animation-delay-200"
              >
                <Sparkles className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  Smart & Personalized Learning
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Get <span className="font-semibold text-[var(--foreground)]">curated content</span> for your exact syllabus. Learn faster with <span className="font-semibold text-[var(--foreground)]">visual modules</span>, study at <span className="font-semibold text-[var(--foreground)]">your pace</span>, and benefit from AI that understands your <span className="font-semibold text-[var(--foreground)]">learning patterns</span>.
                </p>
              </div>

              {/* Feature Card 2: AI & Community Power */}
              <div
                className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 
                           transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 hover:-translate-y-1 hover:shadow-xl hover:scale-105 motion-safe:animate-fadeIn animation-delay-300"
              >
                <Cpu className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  AI Insights & Community Hub
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Leverage <span className="font-semibold text-[var(--foreground)]">AI question paper predictions</span> based on past trends. Connect with peers in our <span className="font-semibold text-[var(--foreground)]">community-driven</span> space to share resources and get help.
                </p>
              </div>

              {/* Feature Card 3: Career Focused */}
              <div
                className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 
                           transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 hover:-translate-y-1 hover:shadow-xl hover:scale-105 motion-safe:animate-fadeIn animation-delay-400"
              >
                <Target className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  Career Focused Prep
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Access comprehensive <span className="font-semibold text-[var(--foreground)]">placement prep</span> materials. Use the <span className="font-semibold text-[var(--foreground)]">skill-gap analysis</span> to see exactly what you need for your target job and get a clear path forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. "How It Works" Section */}
        <section
          id="how-it-works"
          className="w-full bg-[var(--background)] py-20 sm:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl motion-safe:animate-fadeIn">
              Help Us Build It: 3 Quick Steps
            </h2>
            <p className="mb-12 text-center text-lg text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-100">
              Your ideas are key to making Colearn awesome. Here's how to get involved right now:
            </p>
            <div className="group grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 motion-safe:animate-fadeIn animation-delay-200">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <LogIn className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  1. Join the Discord
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Connect with other students, share ideas, and get early updates in our community server.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 motion-safe:animate-fadeIn animation-delay-300">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  2. Take the Survey
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  It takes 2 minutes! Tell us your branch, biggest study problems, and what features you want most.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all duration-300 group-hover:opacity-60 hover:!opacity-100 motion-safe:animate-fadeIn animation-delay-400">
                <div className="mb-4 rounded-full bg-accent/10 p-4 text-accent">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  3. Follow the Journey
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Check the roadmap below, join discussions, and be first in line to test new features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Roadmap Section */}
        <section id="roadmap" className="w-full bg-[var(--card)] py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl motion-safe:animate-fadeIn">
              Our Building Plan (Roadmap)
            </h2>
            <p className="mb-12 text-center text-lg text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-100">
              We're building this openly. Here's the plan – your feedback can change it! 🚀
            </p>

            <div className="relative flex flex-col items-start px-4">
              {/* Connecting Line */}
              <div className="absolute left-9 top-10 h-[calc(100%-4rem)] w-0.5 bg-[var(--border)] motion-safe:animate-fadeIn" aria-hidden="true" />

              {roadmapPhases.map((item, index) => (
                <div key={item.phase} className="relative mb-10 flex w-full items-start gap-6 pl-16 last:mb-0 motion-safe:animate-fadeIn" style={{ animationDelay: `${200 + index * 100}ms`}}>
                  {/* Status Dot */}
                  <div
                    className={`absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full ring-4 ${getDotClasses(item.status)}`}
                  >
                    <item.icon className={`h-4 w-4 ${item.status === 'Current' ? 'text-accent-foreground' : item.status === 'Completed' ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  {/* Content */}
                  <div className={`flex-1 rounded-lg border p-6 ${getStatusClasses(item.status)} ${item.status === 'Upcoming' ? 'bg-transparent shadow-inner shadow-black/10' : 'bg-[var(--background)]/30'}`}>
                    <span
                      className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.status === 'Current'
                          ? 'bg-accent/20 text-accent'
                          : item.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {item.status}
                    </span>
                    <h3 className={`mb-2 text-xl font-semibold ${item.status === 'Current' ? 'text-[var(--foreground)]' : item.status === 'Completed' ? 'text-green-300' : 'text-[var(--muted-foreground)]'}`}>
                      {item.title}
                    </h3>
                    <p className={`${item.status === 'Upcoming' ? 'text-[var(--muted-foreground)] opacity-60' : 'text-[var(--muted-foreground)]'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
             <p className="mt-12 text-center text-base text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-500">
                Have ideas for future phases? Tell us in the Discord!
             </p>
          </div>
        </section>


        {/* --- 8. COMBINED About & CTA Section --- */}
        <section
          id="about" // Kept the ID for the nav link
          className="w-full bg-[var(--background)] px-4 py-20 sm:py-28 lg:py-32" // Combined padding
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              {/* Left Side: About Content */}
              <div className="flex flex-col items-start text-left motion-safe:animate-fadeIn">
                <Users className="mb-4 h-12 w-12 text-[var(--accent)]" />
                <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                  Just Students Helping Students
                </h2>
                <p className="mt-6 text-lg text-[var(--muted-foreground)]">
                  Colearn isn't a big company. It's built by{' '}
                  <span className="font-semibold text-[var(--foreground)]">
                    us – B.Tech students like you
                  </span>
                  – because we're tired of the messy notes and confusing prep too! We're making the app <span className="font-semibold text-[var(--foreground)]">we wish we had</span>. This project is totally open, and we need your ideas to make it great.
                </p>
              </div>

              {/* Right Side: CTA Content */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left motion-safe:animate-fadeIn animation-delay-200">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
                      Let's Build This, Together.
                  </h3>
                  <p className="mt-4 max-w-md text-lg text-[var(--muted-foreground)]">
                      Ready to help? Your feedback now makes a huge difference. Join the community, share what you need, and let's create something amazing.
                  </p>
                  <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row md:justify-start">
                    <a
                      href="https://forms.gle/4CB5QkpwRam8FfCB8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-3 text-base font-semibold text-gray-950 shadow-md shadow-blue-500/20 transition-all duration-200 ease-in-out animate-gradient-text hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Share Your Ideas (2 Min Survey)
                    </a>
                    <a
                      href="https://discord.gg/pPy4VSRy" // Add your Discord link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)]/10 px-6 py-3 text-base font-semibold text-[var(--accent)] shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[var(--accent)]/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Join the Discord Community
                    </a>
                  </div>
              </div>
          </div>
        </section>

      </main>

      {/* 9. Footer */}
      <footer className="w-full border-t border-[var(--border)] bg-[var(--card)] py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-[var(--muted-foreground)]">
          <p>
            &copy; {new Date().getFullYear()} Colearn. Built openly with ❤️ by B.Tech students.
          </p>
        </div>
      </footer>
    </div>
  );
}