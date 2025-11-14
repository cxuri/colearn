"use client";

// --- React Core & Hooks ---
import { useState, useEffect, useRef, useCallback } from 'react';

// --- Lucide React Icons ---
import {
  Target,
  BookCheck,
  ArrowRight,
  Users,
  Lightbulb,
  Construction,
  TestTube2,
  Rocket,
  Cpu,
  Sparkles,
  LayoutGrid,
  Blocks, // Logo
  X,
  Menu,
  Award, // Ambassador Program
  Mail, // Waitlist
  MessageSquare, // Testimonials
} from 'lucide-react';

// --- Settings: Control Panel ---

// Set to true to show "Join Now", false to show "Applications Closed"
const IS_AMBASSADOR_PROGRAM_OPEN = true; 

// Set the current phase of the project (1-4)
const CURRENT_PHASE = 2; // Phase 2: "Building"

// --- Links: Update These ---
const GOOGLE_FORM_WAITLIST_LINK = "https://forms.gle/YOUR_WAITLIST_FORM_LINK";
const GOOGLE_FORM_AMBASSADOR_LINK = "https://forms.gle/YOUR_AMBASSADOR_FORM_LINK";
const DISCORD_LINK = "https://discord.gg/pPy4VSRy";


// --- Custom Hook: useActiveSection ---
// This hook observes which section is on screen and updates the header.
function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Triggers when section is 30% from top/bottom
      threshold: 0.3,
    });

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [observerCallback]);

  // Creates a ref-setter function for each section
  const registerSection = useCallback((id: string) => (node: HTMLElement | null) => {
    if (node) sectionRefs.current[id] = node;
  }, []);

  return { activeSection, registerSection, setActiveSection };
}

// --- Main Landing Page Component ---
export default function LandingPage() {
  
  const { activeSection, registerSection, setActiveSection } = useActiveSection();
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Page Content & Data ---

  // "What We're Hearing" Content (Manglish Complaints)
  const testimonials = [
    {
      quote: "Ente ponno... searching 5 group chats just for one PDF. Full scene. Everything needs to be in one place.",
      name: "Arjun Nair, 2nd Year CSE",
    },
    {
      quote: "End sem full scene aanu. That prof is saying something, I'm not understanding. Can it just give the important topics?",
      name: "Meera Menon, 3rd Year ECE",
    },
    {
      quote: "Placement inte karyam parayanda, like college il padipikatha kore topics codikunnund, A solution for that would be perfect",
      name: "Basil Thomas, 4th Year CSE",
    },
  ];

  // "How It Works" (Features) Content
  const features = [
    {
      icon: LayoutGrid,
      title: 'All-in-One Hub',
      description: 'Ditch messy group chats. All your notes, PYQs, and resources in one organized place.',
      span: 'md:col-span-3',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Prep',
      description: 'Leverage AI to predict exam topics based on past trends and save time.',
      span: 'md:col-span-1',
    },
    {
      icon: Target,
      title: 'Career Focused',
      description: 'Placement prep & skill-gap analysis for your dream job, minus the noise.',
      span: 'md:col-span-2',
    },
  ];

  // "Development Plan" (Roadmap) Content
  const roadmapPhases = [
    {
      phase: 1,
      title: 'Idea & Feedback',
      description: "Gathering your needs through surveys & Discord to build the right features.",
      icon: Lightbulb,
    },
    {
      phase: 2,
      title: 'Building Core Features',
      description: 'Developing key components: syllabus notes, placement help, and community features.',
      icon: Construction,
    },
    {
      phase: 3,
      title: 'Beta Testing',
      description: 'Inviting students to test the app, identify bugs, and refine user experience.',
      icon: TestTube2,
    },
    {
      phase: 4,
      title: 'Public Launch',
      description: 'Opening the app to all B.Tech students and continuous iterative improvements.',
      icon: Rocket,
    },
  ];

  // --- Helper Functions ---
  const getPhaseStatus = (phaseNum: number) => {
    if (phaseNum < CURRENT_PHASE) return 'completed';
    if (phaseNum === CURRENT_PHASE) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Subtle global radial gradient (moves on scroll) */}
      <div
        className="fixed inset-0 z-[-2] h-full w-full opacity-10"
        style={{
          background: 'radial-gradient(120% 120% at 50% 50%, var(--accent), transparent)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          animation: 'bg-gradient-radial-scrolling 60s ease-in-out infinite alternate',
        }}
        aria-hidden="true"
      />

      {/* Subtle Global Grid Background */}
      <div className="fixed inset-0 z-[-1] opacity-5"
           style={{
             backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)',
             backgroundSize: '24px 24px',
           }}
           aria-hidden="true"
      />

      {/* Styles for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }
          @keyframes text-reveal-clip {
            from { clip-path: inset(0 100% 0 0); }
            to { clip-path: inset(0 0 0 0); }
          }
          .animate-text-reveal {
            clip-path: inset(0 100% 0 0);
            animation: text-reveal-clip 0.8s ease-out forwards;
          }
          @keyframes bg-gradient-radial-scrolling {
            0% { background-position: 50% 50%; }
            25% { background-position: 70% 30%; }
            50% { background-position: 50% 50%; }
            75% { background-position: 30% 70%; }
            100% { background-position: 50% 50%; }
          }
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: var(--accent); }
          }
          .animate-typing {
            overflow: hidden;
            white-space: nowrap;
            animation: 
              typing 2.5s steps(44, end) forwards,
              blink-caret .75s step-end infinite;
          }
          @keyframes sonar-pulse {
            0% {
              box-shadow: 0 0 0 0px var(--accent);
              opacity: 1;
            }
            100% {
              box-shadow: 0 0 0 12px var(--accent);
              opacity: 0;
            }
          }
          .animate-sonar-pulse::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background-color: var(--accent);
            animation: sonar-pulse 1.5s ease-in-out infinite;
          }
          /* Staggered delays */
          .animation-delay-100 { animation-delay: 100ms; }
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-300 { animation-delay: 300ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-500 { animation-delay: 500ms; }
          .animation-delay-700 { animation-delay: 700ms; }
        `}
      </style>

      {/* 1. Floating Glassmorphism Header */}
      <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--background)]/80 shadow-lg shadow-black/5 backdrop-blur-lg">
        <nav className="flex items-center justify-between px-4 py-3">
          {/* Logo (font-mono) */}
          <a href="#" className="flex items-center gap-2 text-2xl font-mono font-bold" onClick={() => setActiveSection('hero')}>
            <Blocks className="h-6 w-6 text-[var(--accent)]" />
            <span className="text-[var(--foreground)]">Klaz</span>
          </a>
          
          {/* Toggles (Desktop) */}
          <div className="hidden items-center gap-2 rounded-lg bg-[var(--card)] p-1 md:flex">
            {['features', 'roadmap', 'ambassador', 'waitlist'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`rounded-md px-3 py-1 text-sm font-mono font-medium transition-colors ${
                  activeSection === id
                    ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          
          {/* CTA (Desktop) - Ghost button */}
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-lg border-2 border-[var(--accent)] bg-transparent px-4 py-1.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition-all duration-200 ease-in-out hover:bg-[var(--accent)]/10 md:inline-flex"
          >
            Join Discord
          </a>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-lg">
            <nav className="flex flex-col gap-4 p-4">
              {['features', 'roadmap', 'ambassador', 'waitlist'].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => {
                    setActiveSection(id);
                    setIsMobileMenuOpen(false); // Close menu on click
                  }}
                  className={`rounded-md px-3 py-2 text-base font-mono font-medium transition-colors ${
                    activeSection === id
                      ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--accent)] bg-transparent px-4 py-2 text-base font-semibold text-[var(--accent)] shadow-sm"
              >
                Join Discord
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Wrapper */}
      <main className="w-full">
        
        {/* 2. Hero Section (100vh) */}
        <section ref={registerSection('hero')} id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden px-4 py-24 text-center">
          
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src="/promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 z-1 bg-black/70"></div>

          <div className="mx-auto flex max-w-4xl flex-col items-center relative z-10">
            
            {/* Hero Typography */}
            <p className="font-mono text-xl font-medium text-[var(--accent)] animate-fadeIn animation-delay-100">
              Stop the Scroll.
            </p>
            <h1 className="text-8xl font-extrabold uppercase leading-none tracking-tighter text-white md:text-9xl">
              <span className="block animate-text-reveal animation-delay-200">Start</span>
              <span className="block animate-text-reveal animation-delay-300">Learning.</span>
            </h1>
            
            {/* Typing Animation Subtitle (font-mono) */}
            <p className="font-mono mt-6 text-xl text-gray-200 md:text-2xl animate-fadeIn animation-delay-500">
              <span className="inline-block animate-typing border-r-2 border-accent">
                Your B.Tech life, finally organized.
              </span>
            </p>

            {/* Hero CTAs (Mobile friendly) */}
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row animate-fadeIn animation-delay-700">
              {/* Primary CTA (Waitlist) */}
              <a
                href="#waitlist"
                onClick={() => setActiveSection('waitlist')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--accent-foreground)] shadow-lg shadow-[var(--accent)]/20 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                Join the Waitlist
                <ArrowRight className="h-5 w-5" />
              </a>
              
              {/* Secondary CTA (Ghost Button) - white border for video */}
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
              >
                Join the Discord
              </a>
            </div>
            
          </div>
        </section>

        {/* 3. "What We're Hearing" Section (Testimonials) */}
        <section
          id="social-proof" // Not in nav, so no ref needed
          className="w-full bg-[var(--card)] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col items-center text-center">
              {/* Heading changed to sound more "hobbyist" */}
              <h2 className="font-mono text-4xl font-bold text-[var(--foreground)] md:text-5xl animate-fadeIn">
                What We're Hearing
              </h2>
              {/* --- MODIFIED: This text is now more inclusive --- */}
              <p className="mt-4 max-w-2xl text-xl text-[var(--muted-foreground)] animate-fadeIn animation-delay-100">
                We're students building the app we all need. Here's what we're hearing from campus.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 motion-safe:animate-fadeIn"
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <MessageSquare className="h-8 w-8 text-[var(--accent)] mb-4" />
                  {/* Text is no longer bold, quotes are removed */}
                  <p className="text-lg text-[var(--foreground)] leading-relaxed">
                    {item.quote}
                  </p>
                  <p className="mt-4 text-sm font-mono text-[var(--muted-foreground)]">
                    - {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 4. "How It Works" / Features Section (Bento Grid) */}
        <section
          ref={registerSection('features')} id="features"
          className="w-full bg-[var(--background)] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-mono text-4xl font-bold text-[var(--foreground)] md:text-5xl animate-fadeIn">
                One App. Everything You Need.
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-[var(--muted-foreground)] animate-fadeIn animation-delay-100">
                Core features designed to boost your B.Tech journey.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl hover:shadow-[var(--accent)]/20 hover:-translate-y-1.5 motion-safe:animate-fadeIn ${feature.span}`}
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <div className="mb-4 w-fit rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
                    <feature.icon className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                  {/* Feature title uses font-mono */}
                  <h3 className="mb-2 font-mono text-2xl font-semibold text-[var(--foreground)]">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Roadmap Section (Blueprint Grid Background) */}
        <section ref={registerSection('roadmap')} id="roadmap" className="w-full bg-[var(--card)] py-16 sm:py-20 lg:py-24 overflow-hidden relative">
          {/* Blueprint grid for this section only */}
          <div className="absolute inset-0 z-0 opacity-20"
               style={{
                 backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)',
                 backgroundSize: '20px 20px',
               }}
               aria-hidden="true"
          />

          <div className="mx-auto max-w-5xl px-4 relative z-10"> {/* Ensure content is above grid */}
            <h2 className="mb-4 text-center font-mono text-4xl font-bold text-[var(--foreground)] md:text-5xl motion-safe:animate-fadeIn">
              Development Plan
            </h2>
            <p className="mb-16 text-center text-xl text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-100">
              We're building this openly. Here's the plan – your feedback can change it!
            </p>

            {/* Horizontal Timeline (No lines, just gap) */}
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:justify-center mt-10 p-4 md:p-0">
              
              {roadmapPhases.map((item, index) => {
                const status = getPhaseStatus(item.phase);
                return (
                  <div
                    key={item.phase}
                    className={`relative z-10 flex flex-col items-center text-center p-4 md:p-0 md:w-1/4 motion-safe:animate-fadeIn`}
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    {/* Status Dot */}
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-[var(--card)] ${status === 'current' ? 'bg-[var(--accent)] animate-sonar-pulse' : status === 'completed' ? 'bg-green-500' : 'bg-[var(--muted-foreground)]'}`}>
                      <item.icon className={`h-4 w-4 ${status === 'current' ? 'text-[var(--accent-foreground)]' : status === 'completed' ? 'text-white' : 'text-[var(--muted-foreground)] opacity-60'}`} />
                    </div>
                    {/* Content Box */}
                    <div className={`mt-4 w-full md:w-auto rounded-lg border p-4 transition-all duration-300 ${status === 'current' ? 'border-[var(--accent)] bg-[var(--card)] shadow-xl shadow-[var(--accent)]/10' : status === 'completed' ? 'border-green-500 bg-[var(--card)]/80 opacity-80' : 'border-[var(--border)] bg-[var(--card)]/80 opacity-60'}`}>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mb-2 ${status === 'current' ? 'bg-accent/20 text-accent' : status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-muted/50 text-muted-foreground'}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <h3 className={`font-mono text-lg font-semibold ${status === 'current' ? 'text-[var(--foreground)]' : status === 'completed' ? 'text-green-300' : 'text-[var(--muted-foreground)]'}`}>
                        {item.title}
                      </h3>
                      <p className={`font-mono text-base mt-1 ${status === 'upcoming' ? 'text-[var(--muted-foreground)] opacity-60' : 'text-[var(--muted-foreground)]'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section
          ref={registerSection('ambassador')} id="ambassador"
          className="w-full bg-[var(--background)] px-4 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 text-center">
            <div className="flex flex-col items-center text-center motion-safe:animate-fadeIn">
              <Award className="mb-4 h-12 w-12 text-[var(--accent)]" />
              <h2 className="font-mono text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                Become an Ambassador
              </h2>
              <p className="mt-6 text-xl text-[var(--muted-foreground)]">
                Be a leader in your college. Help us spread the word about Klaz,
                gather feedback, and shape the future of student learning. Get
                exclusive perks, certificates, and more.
              </p>
            </div>
            {/* CTA Button (Conditional) */}
            <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row motion-safe:animate-fadeIn animation-delay-200">
              {IS_AMBASSADOR_PROGRAM_OPEN ? (
                <a
                  href={GOOGLE_FORM_AMBASSADOR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--accent-foreground)] shadow-lg shadow-[var(--accent)]/20 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                >
                  Join the Program
                  <ArrowRight className="h-5 w-5" />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[var(--muted-foreground)]/20 px-8 py-4 text-lg font-bold text-[var(--muted-foreground)] opacity-70 sm:w-auto"
                >
                  Applications Closed
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 7. Waitlist Section (Using Google Form) */}
        <section
          ref={registerSection('waitlist')} id="waitlist"
          className="w-full bg-[var(--card)] px-4 py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 text-center">
            <div className="flex flex-col items-center text-center motion-safe:animate-fadeIn">
              <Mail className="mb-4 h-12 w-12 text-[var(--accent)]" />
              <h2 className="font-mono text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                Get Early Access
              </h2>
              <p className="mt-6 text-xl text-[var(--muted-foreground)]">
                Be the first to know when Klaz goes live. Join the waitlist for
                an exclusive launch-day badge and early access.
              </p>
            </div>
            {/* Google Form Waitlist Button */}
            <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row motion-safe:animate-fadeIn animation-delay-200">
              <a
                href={GOOGLE_FORM_WAITLIST_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-4 text-lg font-bold text-[var(--accent-foreground)] shadow-lg shadow-[var(--accent)]/20 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                Join the Waitlist
              </a>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--accent)] bg-transparent px-8 py-4 text-lg font-bold text-[var(--accent)] shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[var(--accent)]/10 sm:w-auto"
              >
                Join the Discord
              </a>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] motion-safe:animate-fadeIn animation-delay-300">
              No spam, just one email when we launch.
            </p>
          </div>
        </section>
      </main>

      {/* 8. Professional Footer */}
      <footer className="w-full border-t border-[var(--border)] bg-[var(--background)] py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-2xl font-mono font-bold" onClick={() => setActiveSection('hero')}>
              <Blocks className="h-6 w-6 text-[var(--accent)]" />
              <span className="text-[var(--foreground)]">Klaz</span>
            </a>
            <p className="max-w-xs text-base text-[var(--muted-foreground)]">
              A project by B.Tech students, for B.Tech students.
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              &copy; {new Date().getFullYear()} Klaz. All rights reserved.
            </p>
          </div>
          
          {/* Column 2: Links */}
          <div className="md:ml-auto">
            <h3 className="font-mono text-sm font-semibold uppercase text-[var(--foreground)]">
              Navigate
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <a href="#features" onClick={() => setActiveSection('features')} className="text-base text-[var(--muted-Goreground)] transition-colors hover:text-[var(--accent)]">Features</a>
              <a href="#roadmap" onClick={() => setActiveSection('roadmap')} className="text-base text-[var(--muted-Goreground)] transition-colors hover:text-[var(--accent)]">Roadmap</a>
              <a href="#ambassador" onClick={() => setActiveSection('ambassador')} className="text-base text-[var(--muted-Goreground)] transition-colors hover:text-[var(--accent)]">Ambassadors</a>
              <a href="#waitlist" onClick={() => setActiveSection('waitlist')} className="text-base text-[var(--muted-Goreground)] transition-colors hover:text-[var(--accent)]">Waitlist</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}