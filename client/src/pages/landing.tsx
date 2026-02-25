import { ArrowRight, Compass, Users, BookOpen, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            <span className="font-display font-bold text-2xl tracking-tight">
              PathFinder
            </span>
          </div>

          <Button
            onClick={() => setLocation("/login")}
            className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="pt-40 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-slow"></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-slide-up">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary font-medium mb-6">
                
              </div>

              <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-foreground mb-6">
                Discover your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  true potential
                </span>{" "}
                and navigate your career.
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
                Expert 1-on-1 counseling, AI-driven recommendations, and a
                supportive community to help you build the career you've always
                wanted.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setLocation("/login")}
                  className="rounded-full h-14 px-8 text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Start Your Journey{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 aspect-[4/3] lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80"
                  alt="Career Counseling Session"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
              </div>

              {/* FLOATING CARD */}
              <div
                className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-xl border border-border/50 animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Expert Mentors
                    </p>
                    <p className="text-xl font-bold">500+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive tools designed to accelerate your professional
                growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-7 w-7" />}
                title="1-on-1 Counseling"
                description="Book personalized sessions with industry experts who understand your field and goals."
              />

              <FeatureCard
                icon={<BrainCircuit className="h-7 w-7" />}
                title="AI Recommendations"
                description="Let our advanced AI analyze your profile and suggest tailored career paths and skills."
              />

              <FeatureCard
                icon={<BookOpen className="h-7 w-7" />}
                title="Resource Library"
                description="Access templates, guides, and courses to prepare for interviews and upskill effectively."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-12 px-6 text-center text-muted-foreground">
        <p className="font-medium">
          © {new Date().getFullYear()} PathFinder. Build your future.
        </p>
      </footer>
    </div>
  );
}

/* Reusable Feature Card */
function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-card p-8 rounded-3xl shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}