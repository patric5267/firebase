import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  
  apiKey: "AIzaSyCzLSK-maySKVOgt-NC2HQNRJR2mid8xhQ",
  authDomain: "fir-prac-c0487.firebaseapp.com",
  projectId: "fir-prac-c0487",
  storageBucket: "fir-prac-c0487.appspot.com",
  messagingSenderId: "963462359940",
  appId: "1:963462359940:web:af98ecf616da104bab4bd1",
  databaseURL:"https://fir-prac-c0487-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)