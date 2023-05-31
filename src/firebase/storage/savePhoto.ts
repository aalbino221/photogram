import * as fireStorage from 'firebase/storage';
import { getAuth } from 'firebase/auth';

async function savePhoto(file: any): Promise<string> {
  try {
    const filePath = `profile/${getAuth().currentUser?.uid}/${file.name}`;
    const newImageRef = fireStorage.ref(fireStorage.getStorage(), filePath);
    await fireStorage.uploadBytesResumable(newImageRef, file);
    const publicImageUrl = await fireStorage.getDownloadURL(newImageRef);
    return publicImageUrl;
  } catch (error) {
    return '';
  }
}

export default savePhoto;
