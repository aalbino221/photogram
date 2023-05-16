/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as fireAuth from 'firebase/auth';
import app from '../firebase-config';

const auth = fireAuth.getAuth(app);

fireAuth.onAuthStateChanged(auth, (user) => {
  if (user) {
    // DO SOMETHING
  } else {
    // DO SOMETHING ELSE
  }
});
