/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireStore from 'firebase/firestore';

async function setCommentPost(
  postId: string,
  userId: string,
  text: string,
): Promise<void> {
  const db = fireStore.getFirestore();
  const postsCollection = fireStore.collection(db, 'posts');
  const query = fireStore.query(
    postsCollection,
    fireStore.where('id', '==', postId),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const doc = querySnapshot.docs[0];
  const likeCollection = fireStore.collection(doc.ref, 'comments');
  const likeAdd = fireStore.addDoc(likeCollection, {
    userId,
    text,
  });
  console.log('Estou num loop?');
}

export default setCommentPost;
