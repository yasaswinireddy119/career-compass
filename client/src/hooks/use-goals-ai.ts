import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertGoal } from "@shared/schema";

export function useGoals() {
  return useQuery({
    queryKey: [api.goals.list.path],
    queryFn: async () => {
      const res = await fetch(api.goals.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch goals");
      return res.json();
    },
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<InsertGoal, "userId">) => {
      const res = await fetch(api.goals.create.path, {
        method: api.goals.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create goal");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.goals.list.path] });
    },
  });
}

export function useUpdateGoalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const url = buildUrl(api.goals.update.path, { id });
      const res = await fetch(url, {
        method: api.goals.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update goal");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.goals.list.path] });
    },
  });
}

export function useAiRecommendations() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.ai.careerRecommendations.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to get recommendations");
      return res.json();
    },
  });
}
