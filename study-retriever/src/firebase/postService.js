import { db } from './firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const postsRef = collection(db, 'studyPosts');

export const fetchPosts = async () => {
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};