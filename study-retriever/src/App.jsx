import { useEffect, useState } from 'react';
import { fetchPosts } from '/Users/sabheerehman/Documents/GitHub/StudyRetriever/study-retriever/src/firebase/postService.js';
import PostCard from './PostCard';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        console.log("Fetched posts from Firestore:", data); // 👀
        setPosts(data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };
  
    loadPosts();
  }, []);  

  return (
    <div style={{ padding: '24px' }}>
      <h1>📚 Study Retriever</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))
      ) : (
        <p>No study sessions posted yet.</p>
      )}
    </div>
  );
}

export default App;