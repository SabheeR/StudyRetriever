// src/App.jsx
import { useEffect, useState } from 'react';
import { fetchPosts, createPost, deletePost } from './firebase/postService';
import { auth } from './firebase/firebaseConfig';
import PostCard from './PostCard';
import './App.css';

export default function App() {
  const [posts, setPosts]                   = useState([]);
  const [showForm, setShowForm]             = useState(false);
  const [courseNumber, setCourseNumber]     = useState('');
  const [courseName, setCourseName]         = useState('');
  const [professor, setProfessor]           = useState('');
  const [location, setLocation]             = useState('');
  const [room, setRoom]                     = useState('');
  const [date, setDate]                     = useState('');
  const [time, setTime]                     = useState('');

  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!courseNumber || !courseName || !date) return;

    await createPost(
      { courseNumber, courseName, professor, location, room, date, time },
      currentUid
    );

    setCourseNumber('');
    setCourseName('');
    setProfessor('');
    setLocation('');
    setRoom('');
    setDate('');
    setTime('');
    setShowForm(false);

    const updated = await fetchPosts();
    setPosts(updated);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>📚 Study Retriever</h1>
      <button className="floating-add-btn" onClick={() => setShowForm(true)}>
        Create Post
      </button>

      {showForm && (
        <form className="new-post-form" onSubmit={handleSubmit}>
          <input
            placeholder="Course Number"
            value={courseNumber}
            onChange={e => setCourseNumber(e.target.value)}
          />
          <input
            placeholder="Course Name"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
          <input
            placeholder="Professor"
            value={professor}
            onChange={e => setProfessor(e.target.value)}
          />
          <input
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <input
            placeholder="Room"
            value={room}
            onChange={e => setRoom(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <div>
            <button type="submit">Create Session</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard
            key={post.id}
            courseNumber={post.courseNumber}
            courseName={post.courseName}
            professor={post.professor}
            location={post.location}
            room={post.room}
            date={post.date}
            time={post.time}
            isHost={post.creatorId === currentUid}
            onDelete={() =>
              deletePost(post.id).then(() =>
                setPosts(curr => curr.filter(x => x.id !== post.id))
              )
            }
            onJoin={() => {
              /* join logic */
            }}
          />
        ))
      ) : (
        <p>No study sessions posted yet.</p>
      )}
    </div>
  );
}
