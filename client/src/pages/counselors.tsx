import { useState, useMemo } from "react";
import { useCounselors } from "@/hooks/use-profiles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, Star, DollarSign } from "lucide-react";

/* ===============================
   Dummy Counselors (Fallback)
================================ */

const dummyCounselors = [
  {
    id: 1,
    userId: "dummy-1",
    bio: "Senior Tech Career Counselor with 10+ years experience in software and startups.",
    hourlyRate: 5000,
    skills: ["Resume Review", "Interview Prep", "Career Strategy"],
    user: { firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com" }
  },
  {
    id: 2,
    userId: "dummy-2",
    bio: "Business mentor specializing in product management and leadership growth.",
    hourlyRate: 6000,
    skills: ["Leadership", "Product Strategy", "Mock Interviews"],
    user: { firstName: "Mike", lastName: "Chen", email: "mike@example.com" }
  },
  {
    id: 3,
    userId: "dummy-3",
    bio: "Creative industry expert helping designers and artists build strong portfolios.",
    hourlyRate: 4500,
    skills: ["Portfolio Review", "Personal Branding", "Freelancing"],
    user: { firstName: "Elena", lastName: "Rodriguez", email: "elena@example.com" }
  }
];

export default function Counselors() {
  const { data: counselors, isLoading } = useCounselors();
  const { toast } = useToast();

  const [selectedCounselor, setSelectedCounselor] = useState<any>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Use DB counselors if available, otherwise fallback to dummy
  const displayCounselors = useMemo(() => {
    if (!counselors || counselors.length === 0) {
      return dummyCounselors;
    }
    return counselors;
  }, [counselors]);

  /* ===============================
     Booking Function
  ================================ */

  const handleBook = () => {
    if (!date || !time || !selectedCounselor) return;

    const newSession = {
      id: Date.now(),
      counselorName:
        selectedCounselor.user?.firstName +
        " " +
        selectedCounselor.user?.lastName,
      date,
      time,
      status: "Confirmed",
    };

    const existingSessions =
      JSON.parse(localStorage.getItem("sessions") || "[]");

    localStorage.setItem(
      "sessions",
      JSON.stringify([...existingSessions, newSession])
    );

    toast({
      title: "Booking Confirmed ✅",
      description: `Your session with ${newSession.counselorName} is confirmed.`,
    });

    setSelectedCounselor(null);
    setDate("");
    setTime("");
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Expert Counselors</h1>
        <p className="text-muted-foreground">
          Find the perfect mentor to guide your career path.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCounselors.map((profile: any) => (
          <Card
            key={profile.id}
            className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden flex flex-col"
          >
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-xl font-bold text-primary shadow-sm">
                  {profile.user?.firstName?.[0] ||
                    profile.user?.email?.[0]?.toUpperCase() ||
                    "C"}
                </div>

                {profile.hourlyRate && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 font-semibold bg-background"
                  >
                    <DollarSign className="h-3 w-3" />{" "}
                    {(profile.hourlyRate / 100).toFixed(2)}/hr
                  </Badge>
                )}
              </div>

              <CardTitle className="mt-4 text-xl">
                {profile.user?.firstName || "Anonymous"}{" "}
                {profile.user?.lastName}
              </CardTitle>

              <div className="text-sm text-muted-foreground line-clamp-2 mt-2">
                {profile.bio ||
                  "Professional career counselor ready to help you succeed."}
              </div>
            </CardHeader>

            <CardContent className="pt-4 flex-1">
              <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                  <Star className="h-3 w-3" /> Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.slice(0, 3).map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-primary/5 border-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0 pb-6 px-6">
              <Button
                onClick={() => setSelectedCounselor(profile)}
                className="w-full shadow-lg shadow-primary/20 rounded-xl"
              >
                <Calendar className="mr-2 h-4 w-4" /> Book Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}

      <Dialog
        open={!!selectedCounselor}
        onOpenChange={(open) => !open && setSelectedCounselor(null)}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Book Session
            </DialogTitle>
            <DialogDescription>
              Schedule a 1-on-1 with{" "}
              {selectedCounselor?.user?.firstName || "the counselor"}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCounselor(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleBook}
              disabled={!date || !time}
              className="shadow-md"
            >
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}