import { useEffect, useState, useMemo } from "react";
import { useSessions, useUpdateSessionStatus } from "@/hooks/use-sessions";
import { useProfile } from "@/hooks/use-profiles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Loader2, Calendar, Video, Clock, CheckCircle } from "lucide-react";

export default function Sessions() {
  const { data: apiSessions, isLoading } = useSessions();
  const { data: profile } = useProfile();
  const updateStatus = useUpdateSessionStatus();

  const [localSessions, setLocalSessions] = useState<any[]>([]);

  const isCounselor = profile?.role === "counselor";

  /* ============================
     Load localStorage sessions
  ============================= */

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("sessions") || "[]");
    setLocalSessions(stored);
  }, []);

  /* ============================
     Merge API + Local sessions
  ============================= */

  const allSessions = useMemo(() => {
    const formattedLocal = localSessions.map((s) => ({
      id: s.id,
      status: s.status.toLowerCase(),
      scheduledAt: new Date(`${s.date}T${s.time}`),
      counselor: { firstName: s.counselorName },
      user: { firstName: "You" },
      meetingLink: null,
      isLocal: true,
    }));

    return [...(apiSessions || []), ...formattedLocal];
  }, [apiSessions, localSessions]);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Your Sessions</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past counseling meetings.
        </p>
      </div>

      <div className="grid gap-4">
        {allSessions.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground bg-card rounded-2xl border border-dashed">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            No sessions scheduled yet.
          </div>
        ) : (
          allSessions.map((session: any) => (
            <Card
              key={session.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {isCounselor
                        ? `Meeting with ${session.user?.firstName}`
                        : `Meeting with ${session.counselor?.firstName}`}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(
                          new Date(session.scheduledAt),
                          "PPP 'at' p"
                        )}
                      </span>

                      {session.meetingLink && (
                        <span className="flex items-center gap-1 text-primary">
                          <Video className="h-4 w-4" />
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            Join Meeting
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <Badge
                    className={`${getStatusColor(
                      session.status
                    )} px-3 py-1 text-sm`}
                    variant="outline"
                  >
                    {session.status.toUpperCase()}
                  </Badge>

                  {/* Only allow confirm for API sessions */}
                  {isCounselor &&
                    session.status === "pending" &&
                    !session.isLocal && (
                      <Button
                        size="sm"
                        onClick={() =>
                          updateStatus.mutate({
                            id: session.id,
                            status: "confirmed",
                          })
                        }
                        disabled={updateStatus.isPending}
                        className="rounded-xl shadow-md shadow-green-500/20 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" /> Confirm
                      </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}