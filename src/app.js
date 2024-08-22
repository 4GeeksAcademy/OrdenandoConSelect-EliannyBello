import "./style.css";
const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
const input = document.querySelector(".card-count");
const btnDraw = document.querySelector(".draw-button");
const btnSort = document.querySelector(".sort-button");
const cardContainer = document.querySelector(".card-container");
const cardSort = document.querySelector(".sort-log");

let cards = [];

btnDraw.addEventListener("click", () => {
  for (let i = 0; i < input.value; i++) {
    const iconos = suits[Math.floor(Math.random() * suits.length)];
    const valores = values[Math.floor(Math.random() * values.length)];
    cards.push({ iconos, valores });
  }
  randomCards(cards);
});

function randomCards(cards) {
  cards.forEach(card => {
    let cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `${card.iconos}${card.valores}`;
    cardContainer.appendChild(cardElement);
  });
}
function selectionSort(array) {
  let log = [];
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j].valores < array[minIndex].valores) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    log.push(array.slice());
  }
  return log;
}

btnSort.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  let sortLog = selectionSort([...cards]);
  randomCards(cards);
  console.log(sortLog);
});
