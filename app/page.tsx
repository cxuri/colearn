import {
  Target,
  BookCheck,
  Code2,
  CheckCircle2, // For the hero list
  ArrowRight, // For the hero button
  Users, // For the 'About' section
} from 'lucide-react';

export default function LandingPage() {
  return (
    // Use CSS variables for background
    <div className="flex min-h-screen flex-col items-center bg-[var(--background)]">
      {/* 1. Navbar */}
      {/* Use CSS variables for border, background, and text */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          {/* --- NEW: Blue/Teal Gradient Logo (Name Changed) --- */}
          <a href="#" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
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
              href="#about"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              About
            </a>
          </div>
          {/* --- NEW: Blue/Teal Gradient Button (Text color changed) --- */}
          <a
            href="https://discord.gg/pPy4VSRy" // Add your Discord link here
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-sm font-semibold text-gray-950 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Join the Discord
          </a>
        </nav>
      </header>

      <main className="w-full">
        {/* 2. Hero Section */}
        <section className="w-full px-4 py-24 md:py-32">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left Column: Text Content */}
            {/* Use CSS variables for text colors */}
            <div className="flex flex-col items-start text-left">
              <h1 className="text-4xl font-extrabold tracking-tighter text-[var(--foreground)] md:text-5xl">
                From Chaos to Clarity.
                <br />
                {/* --- NEW: Blue/Teal Gradient Text --- */}
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  Your B.Tech Hub is Here.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted-foreground)] md:text-xl">
                {/* --- NAME CHANGED --- */}
                Colearn is the{' '}
                <span className="font-semibold text-[var(--accent)]">
                  free-to-use, all-in-one platform
                </span>{' '}
                built by B.Tech students, for B.Tech students. We're
                replacing the chaos of WhatsApp groups with a smart hub for
                your academics and career.
              </p>

              <div className="mt-10 flex w-full flex-col items-start">
                {/* --- NEW: Button now uses your CSS variables --- */}
                <a
                  href="https://forms.gle/4CB5QkpwRam8FfCB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg shadow-teal-500/30 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Help Shape The App (Quick Survey)
                  <ArrowRight className="h-5 w-5" />
                </a>
                {/* This text-muted-foreground class will also work now */}
                <p className="mt-4 text-sm text-muted-foreground">
                  Help us build the app you actually need.
                </p>
              </div>
            </div>

            {/* Right Column: Feature List */}
            {/* Icons now automatically use the --accent (teal) variable */}
            <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 shadow-md shadow-black/5">
              <h3 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
                What we're building:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
                  <span className="text-[var(--muted-foreground)]">
                    Syllabus-specific notes & adaptive study modes.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
                  <span className="text-[var(--muted-foreground)]">
                    Complete placement prep for aptitude & interviews.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
                  <span className="text-[var(--muted-foreground)]">
                    Personalized skill-gap analysis for your dream job.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
                  <span className="text-[var(--muted-foreground)]">
                    A community-driven hub for all your resources.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        {/* Icons now automatically use the --accent (teal) variable */}
        <section id="features" className="w-full bg-[var(--card)] py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-4 text-center text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              A smarter way to study. A clearer path to your career.
            </h2>
            <p className="mb-12 text-center text-lg text-[var(--muted-foreground)]">
              Beyond simple notes. We deliver a complete toolkit for academic
              and professional success.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature Card 1 */}
              <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <BookCheck className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  Personalized Learning
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Learn at your own pace. Get content for your{' '}
                  <span className="font-semibold text-[var(--foreground)]">
                    exact
                  </span>{' '}
                  syllabus, switch study modes, and get curated recommendations
                  based on your study patterns.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Target className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  Complete Placement Prep
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Master your placements. Access a huge question bank for
                  aptitude, technical skills, and HR interviews, all in one
                  place.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Code2 className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                  Personalized Skill-Gap Analysis
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Choose your dream job, and our platform will show you the{' '}
                  <span className="font-semibold text-[var(--foreground)]">
                    exact
                  </span>{' '}
                  skills you're missing. Get a custom path to bridge that
                  gap and get hire-ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. About Section */}
        {/* Icon now automatically uses the --accent (teal) variable */}
        <section id="about" className="w-full bg-[var(--background)] px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-[var(--accent)]" />
            <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              Built by students, for students.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
              {/* --- NAME CHANGED --- */}
              Colearn isn't being built by a big corporation. It's a project
              started by{' '}
              <span className="font-semibold text-[var(--foreground)]">
                me and my friends
              </span>
              , a group of B.Tech students who are just as tired of the note
              chaos as you are. This project is 100% transparent and will be
              built with your feedback.
            </p>
          </div>
        </section>

        {/* 5. Final CTA Section */}
        {/* Icon now automatically uses the --accent (teal) variable */}
        <section className="w-full bg-[var(--card)] px-4 py-24 text-center">
          <BookCheck className="mx-auto mb-4 h-12 w-12 text-[var(--accent)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            Let's build this. Together.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--muted-foreground)]">
            Your feedback is crucial. Share your ideas and join our free
            community to help shape Colearn from day one.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {/* --- NEW: Blue/Teal Gradient Button (Text color changed) --- */}
            <a
              href="https://forms.gle/4CB5QkpwRam8FfCB8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-3 text-base font-semibold text-gray-950 shadow-md shadow-blue-500/20 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Share Your Ideas (Survey)
            </a>
            {/* --- NEW: Theme-aware Ghost Button (now Teal) --- */}
            <a
              href="https://discord.gg/pPy4VSRy" // Add your Discord link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)]/10 px-6 py-3 text-base font-semibold text-[var(--accent)] shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[var(--accent)]/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Join the Discord
            </a>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      {/* Use CSS variables for border and text */}
      <footer className="w-full border-t border-[var(--border)] bg-[var(--background)] py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-[var(--muted-foreground)]">
          <p>
            {/* --- NAME CHANGED --- */}
            &copy; {new Date().getFullYear()} Colearn. Built in public by
            B.Tech students.
          </p>
        </div>
      </footer>
    </div>
  );
}