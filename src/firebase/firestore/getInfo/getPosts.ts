import * as fireStore from 'firebase/firestore';
import app from '../../firebase-config';
import { PostInfo } from '../../../components/Reusable/interfaces/posts';

async function getPosts(): Promise<Array<PostInfo>> {
  const db = fireStore.getFirestore(app);
  const postsCollection = fireStore.collection(db, 'posts');
  const query = fireStore.query(postsCollection, fireStore.limit(10));
  const querySnapshot = await fireStore.getDocs(query);
  const docsArray = querySnapshot.docs.map((doc) => doc.data().id as PostInfo);
  console.log('Estou num loop?');

  return docsArray;
}

export default getPosts;
