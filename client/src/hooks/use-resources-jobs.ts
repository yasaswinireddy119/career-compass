import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertResource, InsertJob } from "@shared/schema";

export function useResources(type?: string) {
  return useQuery({
    queryKey: [api.resources.list.path, type],
    queryFn: async () => {
      const url = type ? `${api.resources.list.path}?type=${type}` : api.resources.list.path;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
  });
}

export function useJobs(search?: string) {
  return useQuery({
    queryKey: [api.jobs.list.path, search],
    queryFn: async () => {
      const url = search ? `${api.jobs.list.path}?search=${encodeURIComponent(search)}` : api.jobs.list.path;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<InsertJob, "postedBy">) => {
      const res = await fetch(api.jobs.create.path, {
        method: api.jobs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to post job");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.jobs.list.path] });
    },
  });
}
