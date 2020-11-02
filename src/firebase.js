import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCzXMduNXvF-Sb6VZzYSiFRjk-r7AVmGWo",
    authDomain: "telegram-clone-55fe0.firebaseapp.com",
    databaseURL: "https://telegram-clone-55fe0.firebaseio.com",
    projectId: "telegram-clone-55fe0",
    storageBucket: "telegram-clone-55fe0.appspot.com",
    messagingSenderId: "263988824032",
    appId: "1:263988824032:web:9d328d1a4e5b5acbf28d85"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;