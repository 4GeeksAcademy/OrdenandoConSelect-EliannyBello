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
const valueMap = {
  A: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13
};

btnDraw.addEventListener("click", () => {
  cards = [];
  cardContainer.innerHTML = "";
  cardSort.innerHTML = "";
  for (let i = 0; i < input.value; i++) {
    const iconos = suits[Math.floor(Math.random() * suits.length)];
    const valores = values[Math.floor(Math.random() * values.length)];
    cards.push({ iconos, valores });
  }

  renderCards(cards, cardContainer);
});

function renderCards(cards, container) {
  container.innerHTML = "";

  cards.forEach(card => {
    let cardElement = document.createElement("div");
    cardElement.className = "card";

    cardElement.innerHTML = `
      <div class="top-left">${card.iconos}</div>
      <div class="value">${card.valores}</div>
      <div class="bottom-right">${card.iconos}</div>
    `;

    if (card.iconos === "♥" || card.iconos === "♦") {
      cardElement.classList.add("red");
    }

    container.appendChild(cardElement);
  });
}

function compareCards(cardA, cardB) {
  const valueA = valueMap[cardA.valores];
  const valueB = valueMap[cardB.valores];
  return valueA - valueB;
}

function selectionSort(array) {
  let log = [];
  let len = array.length;

  for (let i = 0; i < len; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (compareCards(array[j], array[minIndex]) < 0) {
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

function logSortSteps(log) {
  cardSort.innerHTML = "";

  log.forEach((step, i) => {
    let stepContainer = document.createElement("div");
    stepContainer.className = "step-container";

    renderCards(step, stepContainer);

    let stepElement = document.createElement("div");
    stepElement.className = "sort-step";

    cardSort.appendChild(stepElement);
    cardSort.appendChild(stepContainer);
  });
}

btnSort.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  let sortLog = selectionSort([...cards]);
  renderCards(cards, cardContainer);
  logSortSteps(sortLog);
});
