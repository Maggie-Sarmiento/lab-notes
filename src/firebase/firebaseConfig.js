// Importar las funciones del SDK a usar
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAU5WXMC0PofLdZZ-TXWQTTjUmrK0qztkM',
  authDomain: 'lab-notes-dea0c.firebaseapp.com',
  projectId: 'lab-notes-dea0c',
  storageBucket: 'lab-notes-dea0c.appspot.com',
  messagingSenderId: '342877300802',
  appId: '1:342877300802:web:c640adec81ab14808565db',
};

// Initializando Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
