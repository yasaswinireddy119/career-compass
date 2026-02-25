import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, MapPin, Building, ExternalLink } from "lucide-react";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);

  /* =============================
     Load Profile & Generate Jobs
  ============================== */

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile") || "null");

    const dummyJobs = [
      {
        id: 1,
        title: "Frontend React Developer",
        company: "TechNova Solutions",
        location: "Hyderabad, India",
        description: "Build modern web applications using React and Tailwind CSS.",
        requirements: ["React", "JavaScript", "Tailwind", "REST APIs"],
        tags: ["React", "Tech"],
        url: "https://www.linkedin.com/jobs/",
      },
      {
        id: 2,
        title: "AI Research Intern",
        company: "FutureAI Labs",
        location: "Bangalore, India",
        description: "Work on AI models and machine learning research projects.",
        requirements: ["Python", "Machine Learning", "AI"],
        tags: ["AI", "Tech"],
        url: "https://www.indeed.com/",
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "CloudEdge",
        location: "Remote",
        description: "Develop scalable web applications with Node.js and React.",
        requirements: ["Node.js", "React", "MongoDB"],
        tags: ["React", "Tech"],
        url: "https://www.naukri.com/",
      },
      {
        id: 4,
        title: "UI/UX Designer",
        company: "Designify Studio",
        location: "Mumbai, India",
        description: "Create modern user experiences for web and mobile apps.",
        requirements: ["Figma", "UI Design", "User Research"],
        tags: ["Design"],
        url: "https://www.linkedin.com/jobs/",
      },
      {
        id: 5,
        title: "Software Developer Intern",
        company: "InnovateX",
        location: "Chennai, India",
        description: "Assist in building web applications and internal tools.",
        requirements: ["JavaScript", "React"],
        tags: ["React", "Tech"],
        url: "https://internshala.com/",
      },
    ];

    /* =============================
       Match Jobs to Profile
    ============================== */

    if (profile) {
      const interests = profile.interests || [];
      const skills = profile.skills || [];

      const matchedJobs = dummyJobs.filter((job) =>
        job.tags.some((tag: string) =>
          interests.includes(tag) || skills.includes(tag)
        )
      );

      setJobs(matchedJobs.length ? matchedJobs : dummyJobs);
    } else {
      setJobs(dummyJobs);
    }

    setIsLoading(false);
  }, []);

  /* =============================
     Search Filter
  ============================== */

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-8 rounded-3xl border border-primary/10">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">
            Job Board
          </h1>
          <p className="text-muted-foreground mt-1">
            Find your next opportunity tailored to your skills.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-10 bg-background border-primary/20 shadow-sm rounded-xl h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground bg-card rounded-2xl border border-dashed">
              No jobs found.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="shadow-sm hover:shadow-md transition-all group border-border/50"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground font-medium">
                          <span className="flex items-center gap-1.5 text-foreground">
                            <Building className="h-4 w-4" /> {job.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {job.requirements.slice(0, 4).map((req: string) => (
                          <Badge
                            key={req}
                            variant="secondary"
                            className="bg-secondary text-secondary-foreground"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground h-10 px-6 font-medium shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
                    >
                      Apply
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}