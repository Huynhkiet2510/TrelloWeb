import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBptAfoD0p4CZULQJ0u9uUYrOVdIsYgzmk",
  authDomain: "dashboardadmin-4c745.firebaseapp.com",
  projectId: "dashboardadmin-4c745",
  storageBucket: "dashboardadmin-4c745.firebasestorage.app",
  messagingSenderId: "373918131109",
  appId: "1:373918131109:web:16db650e6259cb0262fe4c",
  measurementId: "G-DSLWSL29NX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;