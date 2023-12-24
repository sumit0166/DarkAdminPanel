
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
//  import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBwiDXBqtUAbPbstqoeAjovjocKjxWjHwE",
  authDomain: "admin-81b9c.firebaseapp.com",
  projectId: "admin-81b9c",
  storageBucket: "admin-81b9c.appspot.com",
  messagingSenderId: "623058532609",
  appId: "1:623058532609:web:7b9c9ad793eb71799c8300",
  measurementId: "G-2PCR98S3SX"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;