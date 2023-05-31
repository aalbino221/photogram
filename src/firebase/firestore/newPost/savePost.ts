import { v4 as uuidv4 } from 'uuid';
import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

interface SaveResult {
  success: boolean;
  message?: string;
}

async function savePost(
  url: string,
  description: string,
  userId: string,
): Promise<SaveResult> {
  try {
    const db = fireStore.getFirestore(app);
    const postsCollection = fireStore.collection(db, 'posts');
    const post = {
      id: uuidv4(),
      userId,
      description,
      photoUrl: url,
      createdAt: fireStore.serverTimestamp(),
    };
    const usersCollection = fireStore.collection(db, 'users');
    const query = fireStore.query(
      usersCollection,
      fireStore.where('id', '==', userId),
    );
    const querySnapshot = await fireStore.getDocs(query);
    const doc = querySnapshot.docs[0];
    fireStore.updateDoc(doc.ref, { postCount: fireStore.increment(1) });

    await fireStore.addDoc(postsCollection, post);
    return { success: true };
  } catch (e) {
    return { success: false, message: (e as Error).message };
  }
}

export default savePost;
