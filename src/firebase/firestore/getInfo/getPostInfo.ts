import * as fireStore from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebase-config';
import {
  PostProps,
  Comment,
  Liked,
} from '../../../components/Reusable/interfaces/posts';

async function getPostInfo(postId: number): Promise<PostProps> {
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
    const commentsQuery = fireStore.query(commentsCollection);
    const commentsSnapshot = await fireStore.getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map(
      (commentDoc) => commentDoc.data() as Comment,
    );
    post.comments = comments;

    const likedCollection = fireStore.collection(doc.ref, 'likes');
    const likedQuery = fireStore.query(likedCollection);
    const likedSnapshot = await fireStore.getDocs(likedQuery);
    const likes = likedSnapshot.docs.map((likeDoc) => likeDoc.data() as Liked);
    post.likes = likes;

    const followersCollection = fireStore.collection(doc.ref, 'likes');
    const currentuser = getAuth().currentUser?.uid || '';
    const followersQuery = fireStore.query(
      followersCollection,
      fireStore.where('userId', '==', currentuser),
    );
    const followersSnapshot = await fireStore.getDocs(followersQuery);
    if (followersSnapshot.size > 0) {
      post.followed = true;
    } else {
      post.followed = false;
    }

    console.log('Estou num loop?');

    return post;
  } catch (error) {
    return {
      id: 0,
      userId: '',
      photoUrl: '',
      likes: [],
      comments: [],
      profileUrl: '',
      description: '',
      followed: false,
    };
  }
}

export default getPostInfo;
