import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Target, BookOpen, AlertCircle, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  /* =============================
     Load Profile from localStorage
  ============================== */

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userProfile") || "null");
    setProfile(stored);
    setLoadingProfile(false);
  }, []);

  /* =============================
     Generate AI Insights (Frontend Logic)
  ============================== */

  const handleGetAiAdvice = () => {
    setAnalyzing(true);

    setTimeout(() => {
      if (!profile) {
        setRecommendations(
          "⚠️ Please complete your profile to receive personalized AI insights."
        );
        setAnalyzing(false);
        return;
      }

      const insights: string[] = [];

      if (profile.skills?.includes("React")) {
        insights.push("🚀 Focus on advanced React concepts like performance optimization and hooks.");
      }

      if (profile.interests?.includes("Tech")) {
        insights.push("📈 Explore emerging trends like AI, Cloud Computing, and DevOps.");
      }

      if (!profile.experience || profile.experience.length < 10) {
        insights.push("💼 Consider internships or freelance projects to strengthen your resume.");
      }

      if (profile.role === "user") {
        insights.push("🤝 Start networking actively on LinkedIn and attend tech meetups.");
      }

      if (profile.education) {
        insights.push(`🎓 Leverage your education at ${profile.education} in your resume branding.`);
      }

      if (insights.length === 0) {
        insights.push("✨ Keep updating your profile to unlock deeper career insights.");
      }

      setRecommendations(insights.join("\n\n"));
      setAnalyzing(false);
    }, 1000);
  };

  if (loadingProfile) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, {user?.firstName || "Explorer"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your career progression.
        </p>
      </div>

      {!profile && (
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-md animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Let's get started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Complete your profile to get personalized AI recommendations.
            </p>
            <Button
              onClick={() => setLocation("/profile")}
              className="shadow-md shadow-blue-500/20"
            >
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Goals Card */}
        <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Goals
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Track your progress</div>
            <p className="text-xs text-muted-foreground mt-1">
              Visit the Goals page to manage
            </p>
            <Button
              variant="link"
              className="mt-4 px-0 text-primary"
              onClick={() => setLocation("/goals")}
            >
              View Goals →
            </Button>
          </CardContent>
        </Card>

        {/* AI Strategist Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-200/50 dark:border-indigo-800/50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-primary" /> AI Career Strategist
            </CardTitle>
            <CardDescription>
              Get instant, personalized advice based on your profile.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!recommendations ? (
              <Button
                onClick={handleGetAiAdvice}
                disabled={analyzing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl px-6"
              >
                {analyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {analyzing ? "Analyzing Profile..." : "Generate Insights"}
              </Button>
            ) : (
              <div className="bg-white/80 dark:bg-black/40 rounded-xl p-6 backdrop-blur-sm border shadow-inner max-h-[400px] overflow-y-auto text-sm prose prose-slate dark:prose-invert">
                <ReactMarkdown>{recommendations}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resources Card */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Discover templates and guides to boost your chances.
            </p>
            <Button
              variant="outline"
              onClick={() => setLocation("/resources")}
              className="w-full"
            >
              <BookOpen className="mr-2 h-4 w-4" /> Browse Library
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}