import { useState } from "react";
import { useRoute } from "wouter";
import { useForumPost, useCreateForumReply } from "@/hooks/use-forum";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Loader2, ArrowLeft, Send } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function ForumPost() {
  const [, params] = useRoute("/forum/:id");
  const id = parseInt(params?.id || "0");
  
  const { data: post, isLoading } = useForumPost(id);
  const createReply = useCreateForumReply();
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = async () => {
    if (!replyContent.trim()) return;
    await createReply.mutateAsync({ postId: id, content: replyContent });
    setReplyContent("");
  };

  if (isLoading) return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!post) return <div className="text-center py-20 text-muted-foreground">Post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Button variant="ghost" onClick={() => window.history.back()} className="-ml-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forum
      </Button>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-lg mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold">
              {post.author?.firstName?.[0] || 'U'}
            </div>
            <div>
              <p className="font-semibold text-foreground">{post.author?.firstName || 'User'} {post.author?.lastName}</p>
              <p>{format(new Date(post.createdAt), 'MMMM d, yyyy h:mm a')}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="pt-10">
          <h3 className="text-xl font-bold mb-6">{post.replies?.length || 0} Replies</h3>
          
          <div className="space-y-6 mb-10">
            {post.replies?.map((reply: any) => (
              <Card key={reply.id} className="bg-card shadow-sm border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3 border-b pb-3">
                    <span className="font-semibold text-foreground">{reply.author?.firstName || 'User'}</span>
                    <span>•</span>
                    <span>{format(new Date(reply.createdAt), 'MMM d, h:mm a')}</span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
                    {reply.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
            <h4 className="font-bold mb-4">Add a Reply</h4>
            <Textarea 
              value={replyContent} 
              onChange={e => setReplyContent(e.target.value)} 
              rows={4} 
              placeholder="Share your thoughts..." 
              className="bg-background mb-4 rounded-xl"
            />
            <Button onClick={handleSubmit} disabled={createReply.isPending || !replyContent.trim()} className="rounded-xl px-6">
              {createReply.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Post Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
