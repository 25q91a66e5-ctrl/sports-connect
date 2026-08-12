import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlrJYHWCVDuqJiShwN498bVekmIr8l0p0",
  authDomain: "sports-connect-9545a.firebaseapp.com",
  databaseURL:
    "https://sports-connect-9545a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sports-connect-9545a",
  storageBucket: "sports-connect-9545a.firebasestorage.app",
  messagingSenderId: "800572148320",
  appId: "1:800572148320:web:c9012b40af7b4b49019105",
  measurementId: "G-N7M0YCEZ1G",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;