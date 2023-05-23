import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

interface UserInfo {
  id: string;
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
    console.log('Estou num loop?');
    return {
      id: docsArray[0].id,
      name: docsArray[0].name,
      profilePicture: docsArray[0].profilePhotoUrl,
    };
  } catch (error) {
    console.log('Estou num loop?');
    return {
      id: '',
      name: 'deleted',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/photogram-5eb44.appspot.com/o/profile%2Fplaceholder-person.jpg?alt=media&token=ae5af7b9-eb3d-4800-8608-a6b8a921c3c7',
    };
  }
}

export default getUserInfo;
