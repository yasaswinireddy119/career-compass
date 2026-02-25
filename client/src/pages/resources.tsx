import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Video, LayoutTemplate, ExternalLink } from "lucide-react";

export default function Resources() {
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);

  /* =============================
     Dummy Resource Data
  ============================== */

  useEffect(() => {
    const dummyResources = [
      {
        id: 1,
        title: "Ultimate Resume Writing Guide",
        description:
          "Learn how to craft a professional resume that stands out and passes ATS systems.",
        type: "article",
        url: "https://www.indeed.com/career-advice/resumes-cover-letters",
      },
      {
        id: 2,
        title: "React Developer Roadmap 2025",
        description:
          "A complete roadmap to becoming a professional React developer from beginner to advanced level.",
        type: "article",
        url: "https://roadmap.sh/react",
      },
      {
        id: 3,
        title: "Mock Interview Preparation Video",
        description:
          "Watch this detailed mock interview session and learn how to answer technical questions confidently.",
        type: "video",
        url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
      },
      {
        id: 4,
        title: "Professional Resume Template",
        description:
          "Download a clean and modern resume template suitable for software developers.",
        type: "template",
        url: "https://www.canva.com/resumes/templates/",
      },
      {
        id: 5,
        title: "LinkedIn Profile Optimization Guide",
        description:
          "Step-by-step guide to optimize your LinkedIn profile for better job opportunities.",
        type: "article",
        url: "https://www.linkedin.com/help/linkedin",
      },
      {
        id: 6,
        title: "System Design Basics",
        description:
          "Understand system design fundamentals for interviews and scalable applications.",
        type: "video",
        url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
      },
    ];

    setResources(dummyResources);
    setIsLoading(false);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "template":
        return <LayoutTemplate className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Resource Library</h1>
        <p className="text-muted-foreground">
          Articles, templates, and videos to accelerate your career.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            className="group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 flex flex-col"
          >
            <CardHeader className="bg-secondary/50 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-background rounded-xl shadow-sm text-primary">
                  {getIcon(resource.type)}
                </div>
                <Badge variant="outline" className="capitalize bg-background">
                  {resource.type}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {resource.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {resource.description}
              </p>

              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline mt-auto"
              >
                Access Resource
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}