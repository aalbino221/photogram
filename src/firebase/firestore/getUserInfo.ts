import * as fireStore from 'firebase/firestore';
import app from '../firebase-config';

interface UserInfo {
  name: string;
  profilePicture: string;
}

async function getUserInfo(userId: string): Promise<UserInfo> {
  try {
    const db = fireStore.getFirestore(app);
    const usersCollection = fireStore.collection(db, 'users');
    const query = fireStore.query(
      usersCollection,
      fireStore.where('id', '==', userId),
    );
    const querySnapshot = await fireStore.getDocs(query);
    const docsArray = querySnapshot.docs.map((doc) => doc.data());
    return {
      name: docsArray[0].name,
      profilePicture: docsArray[0].profilePhotoUrl,
    };
  } catch (error) {
    return {
      name: 'deleted',
      profilePicture: '',
    };
  }
}

export default getUserInfo;
