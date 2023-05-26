import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

interface ProfilePost {
  id: string;
  photoUrl: string;
}

async function getProfilePosts(userId: string): Promise<Array<ProfilePost>> {
  const db = fireStore.getFirestore(app);
  const postsCollection = fireStore.collection(db, 'posts');
  const query = fireStore.query(
    postsCollection,
    fireStore.where('userId', '==', userId),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const docsArray = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      photoUrl: data.photoUrl,
    };
  });
  return docsArray;
}

export default getProfilePosts;
