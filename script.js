const jokes = [
  "What's brown and sticky? A stick!",
  "Why don’t scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why can’t you hear a pterodactyl go to the bathroom? Because the 'P' is silent!",
  "How do you organize a space party? You planet.",
  "Why did the bicycle fall over? It was two-tired.",
  "I would tell you a construction pun, but I’m still working on it.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "I'm reading a book on anti-gravity. It's impossible to put down!"
];
function pressed(){
  console.log("Hello");
  const container = document.getElementById("container");
  const nDiv = document.createElement("div");
  const nDiv2 = document.createElement("div");
  const nP = document.createElement("p1");
  const nLB = document.createElement("button");
  const nDB = document.createElement("button");
  
  nDiv.classList = "joke";
  nP.textContent = jokes[Math.floor(Math.random()*jokes.length)];
  nDiv.appendChild(nP);
  nLB.classList = "button";
  nLB.textContent = " Like ";
  nLB.onclick = () => {
    pressed();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };
  nDB.classList = "button";
  nDB.textContent = " Dislike ";
  nDB.onclick = () => {
    pressed();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };
  nDiv2.classList = "buttonDiv";
  nDiv2.appendChild(nLB);
  nDiv2.appendChild(nDB);
  nDiv.appendChild(nDiv2);
  container.appendChild(nDiv);
  
}
pressed();
