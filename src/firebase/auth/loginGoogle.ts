/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireAuth from 'firebase/auth';
import app from '../firebase-config';
import { alreadyRegistred } from './registerGoogle';

const auth = fireAuth.getAuth(app);

async function loginGoogle(): Promise<boolean> {
  const provider = new fireAuth.GoogleAuthProvider();
  try {
    const id = await fireAuth.signInWithPopup(auth, provider);
    const isRegistred = await alreadyRegistred(id.user.uid);
    if (!isRegistred) {
      fireAuth.signOut(auth);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export default loginGoogle;
