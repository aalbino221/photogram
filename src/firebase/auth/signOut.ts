/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireAuth from 'firebase/auth';
import app from '../firebase-config';

const auth = fireAuth.getAuth(app);

async function signOutGoogle() {
  fireAuth.signOut(auth);
  // CHANGE STATE
}

export default signOutGoogle;
