import * as fireAuth from 'firebase/auth';
import * as fireStore from 'firebase/firestore';
import app from '../firebase-config';

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

async function registerGoogle(name: string): Promise<string> {
  const provider = new fireAuth.GoogleAuthProvider();
  try {
    const alreadyTaken = await usernameTaken(name);
    if (alreadyTaken) {
      return 'Username already taken';
    }
    const id = await fireAuth.signInWithPopup(auth, provider);
    const isRegistred = await alreadyRegistred(id.user.uid);
    if (isRegistred) {
      return 'Already registred';
    }
    const usersCollection = fireStore.collection(db, 'users');
    const newUser = {
      id: id.user.uid,
      name,
      profilePhotoUrl:
        'gs://photogram-5eb44.appspot.com/profile/placeholder-person.jpg',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0,
    };
    await fireStore.addDoc(usersCollection, newUser);
    return 'sucess';
  } catch (error) {
    return 'failed';
  }
}

function currentUser(): string {
  const user = auth.currentUser?.uid;
  return user || '';
}

export { usernameTaken, alreadyRegistred, currentUser };

export default registerGoogle;
