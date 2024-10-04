// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyCEkQ_VRowy35mkObqYVxP1JsZ7U2iEHLA",
  authDomain: "recipe-dab6c.firebaseapp.com",
  projectId: "recipe-dab6c",
  storageBucket: "recipe-dab6c.appspot.com",
  messagingSenderId: "909250246293",
  appId: "1:909250246293:web:80f37de16aafbc1750cd9c"
};
 const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 const db = getDatabase(app);



export { auth, db };



