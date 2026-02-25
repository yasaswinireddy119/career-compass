import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertProfile } from "@shared/schema";

export function useProfile() {
  return useQuery({
    queryKey: [api.profiles.get.path],
    queryFn: async () => {
      const res = await fetch(api.profiles.get.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  });
}

export function useCounselors() {
  return useQuery({
    queryKey: [api.profiles.counselors.path],
    queryFn: async () => {
      const res = await fetch(api.profiles.counselors.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch counselors");
      return res.json();
    },
  });
}

export function useUpsertProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<InsertProfile, "userId">) => {
      const res = await fetch(api.profiles.upsert.path, {
        method: api.profiles.upsert.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.get.path] });
    },
  });
}
