import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Loader2, MessageSquare, Plus, Users, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Forum() {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
  });

  /* =============================
     Load Posts
  ============================== */

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("forumPosts") || "[]");
    setPosts(stored);
    setIsLoading(false);
  }, []);

  /* =============================
     Create Post
  ============================== */

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;

    const newPost = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      author: { firstName: "You" },
      createdAt: new Date().toISOString(),
      replyCount: 0,
    };

    const updatedPosts = [newPost, ...posts];
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);

    setOpen(false);
    setFormData({ title: "", content: "", category: "General" });

    toast({
      title: "Discussion Posted ✅",
      description: "Your post has been published successfully.",
    });
  };

  /* =============================
     Delete Post
  ============================== */

  const handleDelete = (id: number) => {
    const filtered = posts.filter((post) => post.id !== id);
    localStorage.setItem("forumPosts", JSON.stringify(filtered));
    setPosts(filtered);

    toast({
      title: "Post Deleted 🗑",
      description: "Your discussion has been removed.",
    });
  };

  /* =============================
     Edit Post
  ============================== */

  const openEdit = (post: any) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      category: post.category,
    });
    setEditOpen(true);
  };

  const handleUpdate = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editingPostId
        ? { ...post, ...formData }
        : post
    );

    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setEditOpen(false);
    setEditingPostId(null);

    toast({
      title: "Post Updated ✏",
      description: "Your discussion has been updated.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Community Forum</h1>
          <p className="text-muted-foreground">
            Ask questions, share experiences, and network.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Discussion
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a Discussion</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border px-3 text-sm"
                >
                  <option>General</option>
                  <option>Interview Prep</option>
                  <option>Resume Reviews</option>
                  <option>Networking</option>
                </select>
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  rows={5}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSubmit}>
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No discussions yet.
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="relative">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {post.category} • {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </div>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openEdit(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Discussion</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Textarea
              rows={5}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}