// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyBjkenSnPSquQD9nlAXEqniJKr9tfwXL5o',
  authDomain: 'movies-app-cc918.firebaseapp.com',
  projectId: 'movies-app-cc918',
  storageBucket: 'movies-app-cc918.appspot.com',
  messagingSenderId: '142905534383',
  appId: '1:142905534383:web:78c70c9f3d1c840b2c715a',
  measurementId: 'G-TMDLZL0S2L',
}
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
}
