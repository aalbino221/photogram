/* eslint-disable operator-linebreak */
import * as fireAuth from 'firebase/auth';
import * as fireStore from 'firebase/firestore';
import app from '../firebase-config';

interface Data {
  id: string;
  name: string;
  profilePhotoUrl: string;
  postCount: number;
}

interface RegisterResult {
  success: boolean;
  data?: Data;
  message?: string;
}

const auth = fireAuth.getAuth(app);
const db = fireStore.getFirestore(app);

async function alreadyRegistred(id: string): Promise<boolean> {
  const usersCollection = fireStore.collection(db, 'users');
  const query = fireStore.query(
    usersCollection,
    fireStore.where('id', '==', id),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const documentCount = querySnapshot.size;
  if (documentCount > 0) {
    return true;
  }
  return false;
}

async function usernameTaken(name: string): Promise<boolean> {
  const usersCollection = fireStore.collection(db, 'users');
  const query = fireStore.query(
    usersCollection,
    fireStore.where('name', '==', name),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const documentCount = querySnapshot.size;
  if (documentCount > 0) {
    return true;
  }
  return false;
}

async function registerGoogle(name: string): Promise<RegisterResult> {
  const provider = new fireAuth.GoogleAuthProvider();
  try {
    const alreadyTaken = await usernameTaken(name);
    if (alreadyTaken) {
      return { success: false, message: 'Username already taken' };
    }
    const id = await fireAuth.signInWithPopup(auth, provider);
    const isRegistred = await alreadyRegistred(id.user.uid);
    if (isRegistred) {
      return { success: false, message: 'User already registred' };
    }
    const usersCollection = fireStore.collection(db, 'users');
    const newUser = {
      id: id.user.uid,
      name,
      profilePhotoUrl:
        auth.currentUser?.photoURL ||
        'https://firebasestorage.googleapis.com/v0/b/photogram-5eb44.appspot.com/o/profile%2Fplaceholder-person.jpg?alt=media&token=ae5af7b9-eb3d-4800-8608-a6b8a921c3c7',
      postCount: 0,
      followerCount: 0,
      followingCount: 0,
    };
    await fireStore.addDoc(usersCollection, newUser);
    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, message: 'Something went wrong' };
  }
}

export { usernameTaken, alreadyRegistred };

export default registerGoogle;
