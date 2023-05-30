/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireAuth from 'firebase/auth';
import * as fireStore from 'firebase/firestore';
import app from '../firebase-config';
import { alreadyRegistred } from './registerGoogle';

interface Data {
  id: string;
  name: string;
  profilePhotoUrl: string;
  postCount: number;
}

interface LoginResult {
  success: boolean;
  data?: Data;
}

const auth = fireAuth.getAuth(app);
const db = fireStore.getFirestore(app);

async function getInfo(id: string): Promise<Data> {
  const usersCollection = fireStore.collection(db, 'users');
  const query = fireStore.query(
    usersCollection,
    fireStore.where('id', '==', id),
  );
  const querySnapshot = await fireStore.getDocs(query);
  const docsArray = querySnapshot.docs.map((doc) => doc.data());
  const returnValue = {
    id: docsArray[0].id,
    name: docsArray[0].name,
    profilePhotoUrl: docsArray[0].profilePhotoUrl,
    postCount: docsArray[0].postCount,
  };
  return returnValue;
}

async function loginGoogle(): Promise<LoginResult> {
  const provider = new fireAuth.GoogleAuthProvider();
  try {
    const id = await fireAuth.signInWithPopup(auth, provider);
    const isRegistred = await alreadyRegistred(id.user.uid);
    if (!isRegistred) {
      fireAuth.signOut(auth);
      return { success: false };
    }
    return { success: true, data: await getInfo(id.user.uid) };
  } catch (error) {
    return { success: false };
  }
}

export { getInfo };
export default loginGoogle;
