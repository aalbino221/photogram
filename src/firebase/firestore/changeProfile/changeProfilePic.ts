import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

async function changeProfilePic(
  userId: string,
  profilePhotoUrl: string,
): Promise<boolean> {
  try {
    const db = fireStore.getFirestore(app);
    const usersCollection = fireStore.collection(db, 'users');
    const query = fireStore.query(
      usersCollection,
      fireStore.where('id', '==', userId),
    );
    const querySnapshot = await fireStore.getDocs(query);
    const doc = querySnapshot.docs[0];
    fireStore.updateDoc(doc.ref, { profilePhotoUrl });
    return true;
  } catch (error) {
    return false;
  }
}

export default changeProfilePic;
