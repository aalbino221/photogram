import * as fireStore from 'firebase/firestore';
import app from '../firebase-config';
import {
  PostProps,
  Comment,
  Liked,
} from '../../components/Reusable/interfaces/posts';

async function getPosts(): Promise<Array<PostProps>> {
  const db = fireStore.getFirestore(app);
  const postsCollection = fireStore.collection(db, 'posts');
  const query = fireStore.query(postsCollection, fireStore.limit(10));
  const querySnapshot = await fireStore.getDocs(query);
  const docsArray = querySnapshot.docs.map(async (doc) => {
    const post = doc.data() as PostProps;
    const commentsCollection = fireStore.collection(doc.ref, 'comments');
    const commentsQuery = fireStore.query(commentsCollection);
    const commentsSnapshot = await fireStore.getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map(
      (commentDoc) => commentDoc.data() as Comment,
    );
    post.comments = comments;
    const likedCollection = fireStore.collection(doc.ref, 'comments');
    const likedQuery = fireStore.query(likedCollection);
    const likedSnapshot = await fireStore.getDocs(likedQuery);
    const likes = likedSnapshot.docs.map((likeDoc) => likeDoc.data() as Liked);
    post.likes = likes;
    return post as PostProps;
  });
  const resolvedPosts = await Promise.all(docsArray);
  return resolvedPosts;
}

export default getPosts;
