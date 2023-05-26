import * as fireStore from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase-config';
import {
  PostProps,
  Comment,
} from '../../../components/Reusable/interfaces/posts';

async function getPostInfo(postId: string): Promise<PostProps> {
  try {
    const db = fireStore.getFirestore(app);
    const postsCollection = fireStore.collection(db, 'posts');
    const query = fireStore.query(
      postsCollection,
      fireStore.where('id', '==', postId),
    );
    const querySnapshot = await fireStore.getDocs(query);
    const doc = querySnapshot.docs[0];

    const post = doc.data() as PostProps;

    const commentsCollection = fireStore.collection(doc.ref, 'comments');
    const commentsQuery = fireStore.query(
      commentsCollection,
      fireStore.limit(3),
    );
    const commentsSnapshot = await fireStore.getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map(
      (commentDoc) => commentDoc.data() as Comment,
    );
    post.comments = comments;

    const currentUser = getAuth().currentUser?.uid || '';

    const likedCollection = fireStore.collection(doc.ref, 'likes');
    const likesQuery = fireStore.query(likedCollection);
    const likesSnapshot = await fireStore.getDocs(likesQuery);
    post.likes = likesSnapshot.size;

    const likedQuery = fireStore.query(
      likedCollection,
      fireStore.where('userId', '==', currentUser),
    );

    const likedSnapshot = await fireStore.getDocs(likedQuery);

    if (likedSnapshot.size > 0) {
      post.liked = true;
    } else {
      post.liked = false;
    }

    post.createdAt = post.createdAt.toString();

    console.log('Estou num loop?');

    return post;
  } catch (error) {
    return {
      id: '',
      userId: '',
      photoUrl: '',
      likes: 0,
      liked: false,
      comments: [],
      profileUrl: '',
      description: '',
      createdAt: '',
    };
  }
}

export default getPostInfo;
