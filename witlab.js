import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { collection, addDoc, serverTimestamp, getFirestore, getDocs, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDj294Z1z6URU6blMD4hXjUqqObTn37HMQ",
  authDomain: "witnest2.firebaseapp.com",
  projectId: "witnest2",
  storageBucket: "witnest2.firebasestorage.app",
  messagingSenderId: "856793078152",
  appId: "1:856793078152:web:94ef07a632866edcca023d"
};
initializeApp(firebaseConfig);
const db = getFirestore();
window.submit = async function() {
  const content = document.getElementById("joke-text").value.trim();
  const author = document.getElementById("author").value.trim();
  
  if(content.length < 20){
    alert("Your joke must be at least 20 characters long");
    return;
  }
  if(author.length < 5){
    alert("Your name must be at least 5 characters long");
    return;
  }
  const newJoke = {
    content: content,
    author: author,
    likes: 0,
    impressions: 0
  };
  addDoc(collection(db, "jokes"), newJoke)
    .then(() => {
      alert("Your joke has been submitted!");
      document.getElementById("joke-text").value = "";
    })
    .catch((error) => {
      alert("Something went wrong, joke not submitted.");
    });
  
}
