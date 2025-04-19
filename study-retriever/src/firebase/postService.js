// src/firebase/postsService.js
import { db } from './firebaseConfig';
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Reference to the "studyPosts" collection
const postsRef = collection(db, 'studyPosts');

/**
 * Fetch all posts, newest first.
 */
export async function fetchPosts() {
  // Build a query to order by `createdAt` descending
  const q    = query(postsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);

  // (Optional) debug log each document
  snap.docs.forEach(d => console.log(d.id, '=>', d.data()));

  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Create a new post/session.
 * @param {{ title: string, description: string }} data
 * @param {string} creatorId – the current user's UID
 */
export async function createPost(data, creatorId) {
  await addDoc(postsRef, {
    ...data,
    creatorId,
    createdAt: serverTimestamp()
  });
}

/**
 * Delete a post by its Firestore document ID.
 * @param {string} postId
 */
export async function deletePost(postId) {
  const ref = doc(db, 'studyPosts', postId);
  await deleteDoc(ref);
}
export async function joinSession(postId, userId) {
  const ref = doc(db, 'studyPosts', postId);
  await updateDoc(ref, {
    participants: arrayUnion(userId)
  });
}
export async function leaveSession(postId, userId) {
  const ref = doc(db, 'studyPosts', postId);
  await updateDoc(ref, {
    participants: arrayRemove(userId)
  });
}