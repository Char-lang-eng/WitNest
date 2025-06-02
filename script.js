import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
      
let jokes = [
  
];

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
const colRef = collection(db, "jokes");

getDocs(colRef)
  .then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.score = data.likes/data.impressions;
    if(data.impressions < 10){
      data.score = 0.1*data.likes + 0.07*(10-data.impressions);
    }
    jokes.push(data);
  })
  jokes.sort((a, b) => b.score - a.score);
  console.log(jokes)
  pressed();
})
  
function pressed(){
  const oldButtons = document.querySelectorAll("#container button:not(.inactive)")
  oldButtons.forEach(btn => {
    btn.classList.add("inactive");
  });
  const container = document.getElementById("container");
  const nDiv = document.createElement("div");
  const nDiv2 = document.createElement("div");
  const nP = document.createElement("p");
  const nViews = document.createElement("p");
  const nLB = document.createElement("button");
  const nDB = document.createElement("button");
  const nReact = document.createElement("p");
  const range = Math.ceil(jokes.length*(0.5**Math.floor(Math.random()*4.5+0.5)))
  const joke = Math.floor(Math.random()*(range));
  const jokeID = jokes[joke].id;
  
  nDiv.classList = "joke";
  nP.textContent = jokes[joke].content;
  nDiv.appendChild(nP);
  if(jokes[joke].impressions == 1){
    nViews.textContent = "Written by "+jokes[joke].author+", 1 view";
  }
  else{
    nViews.textContent = "Written by "+jokes[joke].author+", "+jokes[joke].impressions+" views";
  }
  nLB.classList = "button";
  nLB.textContent = " Like ";
  nReact.textContent = "Rate this joke to continue";
  nLB.onclick = () => {
    if(nReact.textContent != "You liked this"){
      upJoke(jokeID);
    }
    if(nReact.textContent == "Rate this joke to continue"){
      pressed();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
    nReact.textContent = "You liked this";
  };
  nDB.classList = "button";
  nDB.textContent = " Dislike ";
  nDB.onclick = () => {
    if(nReact.textContent == "You liked this"){
      downJoke(jokeID);
    }
    if(nReact.textContent == "Rate this joke to continue"){
      pressed();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
    nReact.textContent = "You disliked this";
  };
  nDiv2.classList = "buttonDiv";
  nDiv2.appendChild(nReact);
  nDiv2.appendChild(nLB);
  nDiv2.appendChild(nDB);
  nDiv2.appendChild(nViews);
  nDiv.appendChild(nDiv2);
  container.appendChild(nDiv);
  impression(jokeID);
  jokes.splice(joke, 1);
  if(jokes.length <= 0){
    getDocs(colRef)
      .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.score = data.likes/data.impressions;
        if(data.impressions < 10){
          data.score += 0.7*(10-data.impressions);
        }
        jokes.push(data);
      })
      jokes.sort((a, b) => b.score - a.score);
    })
  }
}
function upJoke(jokeID){
  const jokeRef = doc(db, "jokes", jokeID);
  updateDoc(jokeRef, {
    likes: increment(1)
  })
}
function downJoke(jokeID){
  const jokeRef = doc(db, "jokes", jokeID);
  updateDoc(jokeRef, {
    likes: increment(-1)
  })
}
function impression(jokeID){
  const jokeRef = doc(db, "jokes", jokeID);
  updateDoc(jokeRef, {
    impressions: increment(1)
  })
}

