import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

interface UserInfoProps {
  id: string;
  name: string;
  profilePicture: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
}

async function getUserInfo(userId: string): Promise<UserInfoProps> {
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
      id: docsArray[0].id,
      name: docsArray[0].name,
      profilePicture: docsArray[0].profilePhotoUrl,
      followingCount: docsArray[0].followingCount,
      followerCount: docsArray[0].followerCount,
      postCount: docsArray[0].postCount,
    };
  } catch (error) {
    return {
      id: '',
      name: 'deleted',
      profilePicture:
        'https://firebasestorage.googleapis.com/v0/b/photogram-5eb44.appspot.com/o/profile%2Fplaceholder-person.jpg?alt=media&token=ae5af7b9-eb3d-4800-8608-a6b8a921c3c7',
      followingCount: 0,
      followerCount: 0,
      postCount: 0,
    };
  }
}

export type { UserInfoProps };

export default getUserInfo;
