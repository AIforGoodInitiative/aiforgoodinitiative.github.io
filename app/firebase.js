import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDdstaCqDh53H5dpt8Gq2MqEJl50XWX-ao",
  authDomain: "ai-for-good-initiative.firebaseapp.com",
  projectId: "ai-for-good-initiative",
  storageBucket: "ai-for-good-initiative.firebasestorage.app",
  messagingSenderId: "782334029460",
  appId: "1:782334029460:web:a4a1be93b8617800fe0e81",
  measurementId: "G-YV3XZML107"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

let appCheckInitialized = false;
if (typeof window !== "undefined" && !appCheckInitialized) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LesQxUrAAAAAG3eyRgvsvMcjEXn311b-YLe8j_O"),
    isTokenAutoRefreshEnabled: true,
  });
  appCheckInitialized = true;
}

export { auth, googleProvider, githubProvider };