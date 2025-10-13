import React, { useEffect, useState } from 'react';

interface PostItem {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export function PostFeed() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/posts');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: author || 'You', content }),
      });
      if (res.ok) {
        setContent('');
        setAuthor('');
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="py-12 px-4 container mx-auto max-w-3xl">
      <h2 className="text-2xl mb-4">Post Feed</h2>

      <form onSubmit={submit} className="mb-6">
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="w-full mb-2 p-2 border rounded" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={4} className="w-full p-2 border rounded mb-2" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Post</button>
        </div>
      </form>

      {loading && <div>Loading...</div>}

      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="p-4 border rounded bg-card">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{p.author}</div>
              <div className="text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
            <div>{p.content}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
