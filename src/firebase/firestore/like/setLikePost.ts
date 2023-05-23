/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireStore from 'firebase/firestore';

async function setLikePost(postId: number, userId: string): Promise<void> {
  const db = fireStore.getFirestore();
  const postsCollection = fireStore.collection(db, 'posts');
  const query = fireStore.query(
    postsCollection,
    fireStore.where('id', '==', postId),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const doc = querySnapshot.docs[0];
  const likeCollection = fireStore.collection(doc.ref, 'likes');
  const likedQuery = fireStore.query(
    likeCollection,
    fireStore.where('userId', '==', userId),
  );
  const likedQueryDocs = await fireStore.getDocs(likedQuery);
  if (likedQueryDocs.size > 0) {
    const docToDelete = likedQueryDocs.docs[0];
    const deleteDoc = fireStore.deleteDoc(docToDelete.ref);
  } else {
    const likeAdd = fireStore.addDoc(likeCollection, {
      userId,
    });
  }
  console.log('Estou num loop?');
}

export default setLikePost;
