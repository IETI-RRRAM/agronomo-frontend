// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYdbI0sTLlz0CPn_fKRyI-cOTTWx3tVu4",
  authDomain: "agronomo-d7c35.firebaseapp.com",
  projectId: "agronomo-d7c35",
  storageBucket: "agronomo-d7c35.appspot.com",
  messagingSenderId: "1068376909324",
  appId: "1:1068376909324:web:a15de107795dc8e9207029",
  measurementId: "G-M2HXT6Y1J8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);

export async function uploadFile(file: any) {
    try {
        const storageRef = ref(storage, `/imagenes/${v4()}`);
        await uploadBytes(storageRef, file);
        const urlImage = await getDownloadURL(storageRef);
        return urlImage;
    }catch (e){
        console.log(e)
    }
}