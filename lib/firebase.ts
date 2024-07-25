import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAaZ9adL6ixVDIrzuo4C87QgFjDuw84-wQ",
  authDomain: "blog-media-c27bc.firebaseapp.com",
  projectId: "blog-media-c27bc",
  storageBucket: "blog-media-c27bc.appspot.com",
  messagingSenderId: "340644064082",
  appId: "1:340644064082:web:72a9685805809b9a43a88b",
  measurementId: "G-N3TCS00RB4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
