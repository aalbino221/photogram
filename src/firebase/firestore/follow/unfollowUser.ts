import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';

async function removeFollowersOrFollowing(
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
    const followedDocQuery = fireStore.query(
      followedCollection,
      fireStore.where('userId', '==', userIdSecond),
    );
    const followedDocSnapshot = await fireStore.getDocs(followedDocQuery);
    const followedDoc = followedDocSnapshot.docs[0];
    await fireStore.deleteDoc(followedDoc.ref);
    if (collectionName === 'followers') {
      await fireStore.updateDoc(doc.ref, {
        followerCount: fireStore.increment(-1),
      });
    } else if (collectionName === 'following') {
      await fireStore.updateDoc(doc.ref, {
        followingCount: fireStore.increment(-1),
      });
    }
    return true;
  } catch (err) {
    return false;
  }
}

async function unfollowUser(userIdFollowed: string, userIdFollower: string) {
  const db = fireStore.getFirestore(app);
  const usersCollection = fireStore.collection(db, 'users');
  await removeFollowersOrFollowing(
    userIdFollowed,
    userIdFollower,
    usersCollection,
    'followers',
  );
  await removeFollowersOrFollowing(
    userIdFollower,
    userIdFollowed,
    usersCollection,
    'following',
  );
}

export default unfollowUser;
