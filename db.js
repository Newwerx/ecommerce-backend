// db.js - replaces the BSD database ($BSD.db) using Firebase Firestore
// Use the SAME db.js in the frontend AND the backend.
// 1. Your Firebase project's settings (from Project settings > Your apps)
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.firebasestorage.app",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID"
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
