/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import * as fireAuth from 'firebase/auth';
import * as fireStore from 'firebase/firestore';
import * as fireStorage from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA0lt2EapP4fsiNc7dmg2vEluRg1uEZeWo',
  authDomain: 'photogram-5eb44.firebaseapp.com',
  projectId: 'photogram-5eb44',
  storageBucket: 'photogram-5eb44.appspot.com',
  messagingSenderId: '376654910642',
  appId: '1:376654910642:web:c62a08be513da1f1ace5ab',
};

const app = initializeApp(firebaseConfig);
const auth = fireAuth.getAuth(app);
const db = fireStore.getFirestore(app);
const storage = fireStorage.getStorage(app);

const mode = { current: 'dev' };

if (mode.current === 'dev') {
  fireAuth.connectAuthEmulator(auth, 'http://localhost:9099');
  fireStore.connectFirestoreEmulator(db, 'localhost', 8080);
  fireStorage.connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;
