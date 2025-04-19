// src/App.jsx
import { useEffect, useState } from 'react';
import { fetchPosts } from './firebase/postService';
import PostCard from './PostCard';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPosts();
        console.log('✅ fetched:', data);
        setPosts(data);
      } catch (err) {
        console.error('❌ fetch error:', err);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>📚 Study Retriever</h1>
      {posts.length
        ? posts.map(p => <PostCard key={p.id} {...p} />)
        : <p>No study sessions posted yet.</p>
      }
    </div>
  );
}