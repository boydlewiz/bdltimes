// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-PVWNPk2fQa-7t-S79t5KJjH6UnCwXw",
  authDomain: "bdl-times.firebaseapp.com",
  projectId: "bdl-times",
  storageBucket: "bdl-times.firebasestorage.app",
  messagingSenderId: "989397726618",
  appId: "1:989397726618:web:4d9448eab3ae8206597623",
  measurementId: "G-LLVM79PYH1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable Firestore offline capabilities
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.log('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence
      console.log('Persistence not supported by this browser');
    }
  });

// Export the authentication and database services
window.auth = auth;
window.db = db; 