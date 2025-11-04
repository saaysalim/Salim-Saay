import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store/store';
import { setPosts as setPostsAction, addPost as addPostAction, updatePost as updatePostAction, addComment as addCommentAction, toggleLike as toggleLikeAction } from '../store/postsSlice';
import { login as loginAction } from '../store/authSlice';

interface PostItem {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  // locally-saved posts that haven't been sent to a server yet
  _local?: boolean;
  image?: string | null; // data URL or remote URL
  comments?: { id: string; author: string; content: string; createdAt: string }[];
  likedBy?: string[];
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function PostFeed() {
  const posts = useSelector((state: RootState) => state.posts.items);
  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => (s as any).auth);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/posts');
      if (!res.ok) throw new Error('Server returned ' + res.status);
      const data: PostItem[] = await res.json();
      // merge any locally saved posts that haven't been pushed yet
      const local = loadLocalPosts();
      const merged = mergeLocalWithRemote(local, data);
      dispatch(setPostsAction(merged));
      // if remote succeeded, clear any persisted local-only posts
      if (local.length) saveLocalPosts([]);
    } catch (e) {
      console.warn('Could not fetch posts from server, falling back to localStorage', e);
      const local = loadLocalPosts();
      // show local posts when offline
      dispatch(setPostsAction(local.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))));
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
      const payload: any = { author: author || 'You', content };
      if (imageDataUrl) payload.image = imageDataUrl;
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (auth && auth.token) headers['Authorization'] = 'Bearer ' + auth.token;
      const res = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setContent('');
        setAuthor('');
        fetchPosts();
        return;
      }
      throw new Error('Server returned ' + res.status);
    } catch (e) {
      console.warn('Failed to post to server, saving locally', e);
      // Save post locally so it appears in the feed when running as a static site
      const newPost: PostItem = {
        id: generateId(),
        author: author || 'You',
        content,
        image: imageDataUrl || null,
        createdAt: new Date().toISOString(),
        _local: true,
      };
      const cur = loadLocalPosts();
      const updated = [newPost, ...cur];
      saveLocalPosts(updated);
      dispatch(addPostAction(newPost));
      setContent('');
      setImageDataUrl(null);
      setAuthor('');
    }
  };

  // image handling (read file as data URL)
  const onImageChange = (file?: File) => {
    if (!file) return setImageDataUrl(null);
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  // like a post (optimistic UI + local fallback)
  const toggleLike = async (post: PostItem) => {
    try {
      const res = await fetch(`http://localhost:5000/posts/${post.id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'You' }),
      });
      if (res.ok) {
        // refresh
        fetchPosts();
        return;
      }
      throw new Error('Server error');
    } catch (e) {
      // local toggle
      dispatch(toggleLikeAction({ postId: post.id, author: 'You' }));
      // also persist local posts
      const local = loadLocalPosts();
      const updated = local.map((p) => p.id === post.id ? { ...p, likedBy: (p.likedBy || []).includes('You') ? (p.likedBy || []).filter(x => x !== 'You') : [...(p.likedBy||[]), 'You'] } : p);
      saveLocalPosts(updated);
    }
  };

  // add comment to a post
  const addComment = async (postId: string, commentAuthor: string, commentContent: string) => {
    if (!commentContent.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor || 'You', content: commentContent }),
      });
      if (res.ok) {
        fetchPosts();
        return;
      }
      throw new Error('Server error');
    } catch (e) {
      // local fallback: update local posts and UI
      const newComment = { id: generateId(), author: commentAuthor || 'You', content: commentContent, createdAt: new Date().toISOString() };
      dispatch(addCommentAction({ postId, comment: newComment }));
      const local = loadLocalPosts();
      const updated = local.map((p) => p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p);
      saveLocalPosts(updated);
    }
  };

  // helpers for local persistence
  function loadLocalPosts(): PostItem[] {
    try {
      const raw = localStorage.getItem('postfeed.posts');
      if (!raw) return [];
      const parsed = JSON.parse(raw) as PostItem[];
      return parsed;
    } catch (e) {
      console.warn('Error reading local posts', e);
      return [];
    }
  }

  function saveLocalPosts(items: PostItem[]) {
    try {
      localStorage.setItem('postfeed.posts', JSON.stringify(items));
    } catch (e) {
      console.warn('Error saving local posts', e);
    }
  }

  function generateId() {
    return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  }

  function mergeLocalWithRemote(local: PostItem[], remote: PostItem[]) {
    if (!local || !local.length) return remote.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    // include local posts that don't exist on remote (by id or by createdAt+content)
    const remoteIds = new Set(remote.map((r) => r.id));
    const dedupedLocal = local.filter((l) => !remoteIds.has(l.id));
    const combined = [...dedupedLocal, ...remote];
    return combined.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }

  return (
    <section className="py-12 px-4 container mx-auto max-w-3xl">
      <h2 className="text-2xl mb-4">Post Feed</h2>

      {auth && auth.token ? (
        <form onSubmit={submit} className="mb-6">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="w-full mb-2 p-2 border rounded" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={4} className="w-full p-2 border rounded mb-2" />
          <div className="flex items-center gap-2 mb-2">
            <label className="cursor-pointer inline-block px-3 py-2 border rounded bg-white">
              Add image
              <input type="file" accept="image/*" onChange={(e) => onImageChange(e.target.files?.[0])} className="hidden" />
            </label>
            {imageDataUrl && (<img src={imageDataUrl} alt="preview" className="h-16 rounded object-cover" />)}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Logged in as <strong>{auth.username}</strong></div>
            <div>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Post</button>
            </div>
          </div>
        </form>
      ) : (
        <AuthForm onSuccess={() => fetchPosts()} />
      )}

      {loading && <div>Loading...</div>}

      <div className="space-y-4">
        {posts.map((p: PostItem) => (
          <article key={p.id} className="p-4 border rounded bg-card">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{p.author}</div>
              <div className="text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
            <div className="mb-2">{p.content}</div>
            {p.image && <img src={p.image} alt="post" className="w-full max-h-72 object-cover rounded mb-2" />}
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => toggleLike(p)} className="px-2 py-1 border rounded">{(p.likedBy || []).includes('You') ? 'Unlike' : 'Like'} ({(p.likedBy || []).length})</button>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href + '#post-' + p.id) } className="px-2 py-1 border rounded">Share</button>
            </div>
            <div className="space-y-2">
              {(p.comments || []).map((c: { id: string; author: string; content: string; createdAt: string }) => (
                <div key={c.id} className="p-2 bg-gray-50 rounded">
                  <div className="text-sm font-medium">{c.author} <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</span></div>
                  <div className="text-sm">{c.content}</div>
                </div>
              ))}
              <CommentForm onAdd={(author, content) => addComment(p.id, author, content)} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommentForm({ onAdd }: { onAdd: (author: string, content: string) => void }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(author || 'You', content); setAuthor(''); setContent(''); }} className="mt-2 flex gap-2">
      <input placeholder="Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="p-1 border rounded flex-shrink-0 w-24" />
      <input placeholder="Write a comment" value={content} onChange={(e) => setContent(e.target.value)} className="flex-1 p-1 border rounded" />
      <button type="submit" className="px-2 py-1 bg-primary text-white rounded">Comment</button>
    </form>
  );
}

function AuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = mode === 'login' ? '/auth/login' : '/auth/register';
    try {
      const res = await fetch('http://localhost:5000' + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || 'Request failed');
        return;
      }
      const body = await res.json();
      if (mode === 'login') {
        // store token in redux
  dispatch(loginAction({ username: body.username, token: body.token }));
        if (onSuccess) onSuccess();
      } else {
        // registration returned a token — auto-login
        if (body.token) {
          dispatch(loginAction({ username: body.username, token: body.token }));
          if (onSuccess) onSuccess();
        } else {
          alert('Registered. Please login.');
          setMode('login');
        }
      }
    } catch (e) {
      alert('Network error');
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="mb-2">{mode === 'login' ? 'Login' : 'Register'}</h3>
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
        <div className="flex gap-2">
          <button type="submit" className="px-3 py-1 bg-primary text-white rounded">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="px-3 py-1 border rounded">{mode === 'login' ? 'Switch to register' : 'Switch to login'}</button>
        </div>
      </form>
    </div>
  );
}
