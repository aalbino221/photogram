import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

async function addToFollowersOrFollowing(
  userIdFirst: string,
  userIdSecond: string,
  usersCollection: fireStore.CollectionReference<fireStore.DocumentData>,
  collectionName: string,
) {
  try {
    const query = fireStore.query(
      usersCollection,
      fireStore.where('id', '==', userIdFirst),
    );
    const querySnapshot = await fireStore.getDocs(query);
    const doc = querySnapshot.docs[0];
    const followedCollection = fireStore.collection(
      doc.ref,
      `${collectionName}`,
    );
    await fireStore.addDoc(followedCollection, {
      userId: userIdSecond,
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function followUser(userIdFollowed: string, userIdFollower: string) {
  const db = fireStore.getFirestore(app);
  const usersCollection = fireStore.collection(db, 'users');
  const following = await addToFollowersOrFollowing(
    userIdFollowed,
    userIdFollower,
    usersCollection,
    'followers',
  );
  if (!following) return;
  addToFollowersOrFollowing(
    userIdFollower,
    userIdFollowed,
    usersCollection,
    'following',
  );
}

export default followUser;
