import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Target, CheckCircle2, Circle } from "lucide-react";

export default function Goals() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");

  /* =============================
     Load Goals from localStorage
  ============================== */

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("careerGoals") || "[]");
    setGoals(stored);
    setIsLoading(false);
  }, []);

  /* =============================
     Save Goals to localStorage
  ============================== */

  const saveGoals = (updatedGoals: any[]) => {
    localStorage.setItem("careerGoals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  /* =============================
     Create Goal
  ============================== */

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal = {
      id: Date.now(),
      title: newTitle,
      status: "in_progress",
    };

    const updated = [newGoal, ...goals];
    saveGoals(updated);

    setNewTitle("");

    toast({
      title: "Goal Added 🎯",
      description: "Your new career goal has been created.",
    });
  };

  /* =============================
     Toggle Status
  ============================== */

  const toggleStatus = (id: number, currentStatus: string) => {
    const updated = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            status:
              currentStatus === "completed"
                ? "in_progress"
                : "completed",
          }
        : goal
    );

    saveGoals(updated);
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  const completed = goals.filter((g) => g.status === "completed");
  const inProgress = goals.filter((g) => g.status !== "completed");

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-primary p-8 rounded-3xl text-primary-foreground shadow-lg shadow-primary/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <Target className="h-8 w-8" /> Career Goals
        </h1>
        <p className="text-primary-foreground/80 mt-2 text-lg">
          Set targets and track your professional milestones.
        </p>
      </div>

      <Card className="shadow-md border-border/50">
        <CardContent className="p-6">
          <form onSubmit={handleCreate} className="flex gap-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Update resume with latest project"
              className="flex-1 h-12 text-base rounded-xl"
            />
            <Button
              type="submit"
              disabled={!newTitle.trim()}
              className="h-12 px-6 rounded-xl shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* IN PROGRESS */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            In Progress
            <Badge variant="secondary" className="rounded-full">
              {inProgress.length}
            </Badge>
          </h3>

          <div className="space-y-3">
            {inProgress.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No active goals. Add one above!
              </p>
            )}

            {inProgress.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center gap-3 p-4 bg-card border rounded-2xl shadow-sm hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() =>
                    toggleStatus(goal.id, goal.status)
                  }
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Circle className="h-6 w-6" />
                </button>
                <span className="flex-1 font-medium">
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPLETED */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-muted-foreground">
            Completed
            <Badge variant="outline" className="rounded-full">
              {completed.length}
            </Badge>
          </h3>

          <div className="space-y-3 opacity-70">
            {completed.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center gap-3 p-4 bg-secondary/50 border border-transparent rounded-2xl"
              >
                <button
                  onClick={() =>
                    toggleStatus(goal.id, goal.status)
                  }
                  className="text-green-500 hover:text-green-600 transition-colors"
                >
                  <CheckCircle2 className="h-6 w-6" />
                </button>
                <span className="flex-1 font-medium line-through text-muted-foreground">
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}