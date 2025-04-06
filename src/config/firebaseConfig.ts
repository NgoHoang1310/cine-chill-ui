// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAsMYNPhvv3QpjKHGNCXZh9JkV5T3vt-VU',
  authDomain: 'cine-chill-b8bfb.firebaseapp.com',
  projectId: 'cine-chill-b8bfb',
  storageBucket: 'cine-chill-b8bfb.firebasestorage.app',
  messagingSenderId: '986868848081',
  appId: '1:986868848081:web:8abd0e77a9731267177cf0',
  measurementId: 'G-HCZS4S66DK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
