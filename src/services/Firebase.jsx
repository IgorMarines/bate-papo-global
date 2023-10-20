import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr32NvuO36B1DUIuqdcDzIV2KeFoLRiQ0",
  authDomain: "bate-papo-cbf66.firebaseapp.com",
  projectId: "bate-papo-cbf66",
  storageBucket: "bate-papo-cbf66.appspot.com",
  messagingSenderId: "405494448836",
  appId: "1:405494448836:web:e2d7c540ff7e71d1263f91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);