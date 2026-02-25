import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    bio: "",
    education: "",
    skills: "",
    experience: "",
    interests: "",
    role: "user",
    hourlyRate: "",
  });

  /* =========================
     Load Profile from localStorage
  ========================== */

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "null");

    if (storedProfile) {
      setFormData({
        bio: storedProfile.bio || "",
        education: storedProfile.education || "",
        skills: storedProfile.skills?.join(", ") || "",
        experience: storedProfile.experience || "",
        interests: storedProfile.interests?.join(", ") || "",
        role: storedProfile.role || "user",
        hourlyRate: storedProfile.hourlyRate?.toString() || "",
      });
    }

    setIsLoading(false);
  }, []);

  /* =========================
     Save Profile
  ========================== */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      bio: formData.bio,
      education: formData.education,
      experience: formData.experience,
      role: formData.role,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
      interests: formData.interests
        ? formData.interests.split(",").map((s) => s.trim())
        : [],
      hourlyRate: formData.hourlyRate
        ? parseInt(formData.hourlyRate)
        : null,
    };

    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    toast({
      title: "Profile Updated ✅",
      description: "Your profile has been saved successfully.",
    });
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          Update your details to improve matching and AI recommendations.
        </p>
      </div>

      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This information is used to generate AI career insights.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>I am a...</Label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3"
              >
                <option value="user">Job Seeker / Student</option>
                <option value="counselor">Career Counselor</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Professional Bio</Label>
              <Textarea
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Skills</Label>
                <Input
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Interests</Label>
                <Input
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({ ...formData, interests: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Education</Label>
              <Input
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Work Experience</Label>
              <Textarea
                rows={3}
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="rounded-xl shadow-md">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}