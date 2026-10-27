// db.js - replaces the BSD database ($BSD.db) using Firebase Firestore
// Use the SAME db.js in the frontend AND the backend.
// 1. Your Firebase project's settings (from Project settings > Your apps)
const firebaseConfig = {
apiKey: "AIzaSyA-rWBCjy6ZEaqDBH-gLQR61ckOAUSWFok",
  authDomain: "e-commerce2-cbb81.firebaseapp.com",
  projectId: "e-commerce2-cbb81",
  storageBucket: "e-commerce2-cbb81.firebasestorage.app",
  messagingSenderId: "231597500053",
  appId: "1:231597500053:web:daf375ada5ce2ec4d85d9c"
};
// 2. Start Firebase and connect to Firestore
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();// 
3. Make our own $BSD.db with the same commands as BSD
const $BSD = {
db: {
open: async function (dbName) {
// the database name becomes a Firestore "collection"
const collection = firestore.collection(dbName);
return {
// save a value under a key
set: function (key, value) {
return collection.doc(key).set({ value: value });
},
  // read the value saved under a key (null if not found)
get: function (key) {
return collection.doc(key).get().then(function (doc) {
if (doc.exists) {
return doc.data().value;
}
return null;
});
},
  // list all keys that start with prefix (for example "order")
listKeys: function (prefix) {
return collection.get().then(function (snapshot) {
let keys = [];
snapshot.forEach(function (doc) {
if (doc.id.startsWith(prefix)) {
keys.push(doc.id);
}
});
return keys;
});
}
};
}
}
};
