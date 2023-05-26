import * as fireStore from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase-config';

async function getFollowed(userId: string): Promise<boolean> {
  try {
    const db = fireStore.getFirestore(app);
    const usersCollection = fireStore.collection(db, 'users');
    const query = fireStore.query(
      usersCollection,
      fireStore.where('id', '==', userId),
    );
    const currentUser = getAuth().currentUser?.uid || '';
    const querySnapshot = await fireStore.getDocs(query);
    const doc = querySnapshot.docs[0];
    const followedCollection = fireStore.collection(doc.ref, 'followers');
    const followsQuery = fireStore.query(
      followedCollection,
      fireStore.where('userId', '==', currentUser),
    );
    const followsSnapshot = await fireStore.getDocs(followsQuery);
    if (followsSnapshot.size > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export default getFollowed;
