import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertForumPost } from "@shared/schema";

export function useForumPosts(category?: string) {
  return useQuery({
    queryKey: [api.forum.listPosts.path, category],
    queryFn: async () => {
      const url = category ? `${api.forum.listPosts.path}?category=${category}` : api.forum.listPosts.path;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });
}

export function useForumPost(id: number) {
  return useQuery({
    queryKey: [api.forum.getPost.path, id],
    queryFn: async () => {
      const url = buildUrl(api.forum.getPost.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateForumPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<InsertForumPost, "authorId">) => {
      const res = await fetch(api.forum.createPost.path, {
        method: api.forum.createPost.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.forum.listPosts.path] });
    },
  });
}

export function useCreateForumReply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, content }: { postId: number; content: string }) => {
      const url = buildUrl(api.forum.createReply.path, { id: postId });
      const res = await fetch(url, {
        method: api.forum.createReply.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to post reply");
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.forum.getPost.path, variables.postId] });
    },
  });
}
