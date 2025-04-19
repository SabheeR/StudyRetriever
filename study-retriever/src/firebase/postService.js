// src/firebase/postsService.js
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function fetchPosts() {
  const snap = await getDocs(collection(db, 'studyPosts'));
  // debug: log each doc
  snap.docs.forEach(d => console.log(d.id, '=>', d.data()));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}