let carrotMoney = 0;
let luckyClickChance = 1000;
let started = false;
let mdown = false;

// UPGRADE INFO

let upgradeLVL = [1, 1, 1];
let upgradeStats = [
  3 * upgradeLVL[0] * 3.5,
  5 * upgradeLVL[1] * 5,
  5 * upgradeLVL[1] * 5 * luckyClickChance * upgradeLVL[2],
];

let upgradeCost = [
  100 * (upgradeLVL[0] + 1),
  125 * (upgradeLVL[1] + 1),
  luckyClickChance * (upgradeLVL[2] + 1),
];

let upgradeDisplayName = [
  `Per Second \n($${Math.floor(upgradeStats[0])})`,
  `Per Click ($${upgradeStats[1]})`,
  `Lucky Click (x${luckyClickChance * upgradeLVL[2]})`,
];

// ARRAYS FOR HTML CONTENT

let name = new Array(upgradeDisplayName.length);
let level = new Array(upgradeDisplayName.length);
let button = new Array(upgradeDisplayName.length);
let cost = new Array(upgradeDisplayName.length);

let profitEffectAmount;
let loss;

// CREATES BALANCE DISPLAY ELEMENT

let balance = document.createElement("h2");
balance.setAttribute("style", "color:black;");
balance.innerHTML = `$${carrotMoney}`;
balance.setAttribute("style", "text-anchor: middle;");
document.querySelector(".player-info").prepend(balance);
const balanceDisplay = balance;

// CREATES UPGRADE ELEMENTS IN HTML

for (let i = 0; i < upgradeDisplayName.length; i++) {
  name[i] = document.createElement("p");
  name[i].innerHTML = upgradeDisplayName[i];
  name[i].classList.add("name");
  document.querySelector(".name").append(name[i]);

  level[i] = document.createElement("p");
  level[i].innerHTML = `<td nowrap>Lv. <b>${upgradeLVL[i]}</b></td>`;
  level[i].classList.add("level");
  document.querySelector(".level").append(level[i]);

  button[i] = document.createElement("p");
  button[i].innerHTML = `<button class="ugBtn">UPGRADE</button>`;
  button[i].classList.add("button");
  document.querySelector(".button").append(button[i]);

  cost[i] = document.createElement("p");
  cost[i].innerHTML = `-$${upgradeCost[i]}`;
  cost[i].classList.add("cost");
  document.querySelector(".cost").append(cost[i]);
}

//  SELECTS CARROT IMG AND ADDS CLICK FUNCTION

const carrotImg = document.querySelector("#carrot img");
const carrotBtn = document.querySelector("#carrot");

carrotBtn.addEventListener("mousedown", function () {
  carrotImg.setAttribute("height", "170px");
  carrotImg.setAttribute("width", "auto");
});

carrotBtn.addEventListener("mouseup", function () {
  handleCarrotClick();
  let carrotImgEffect = document.createElement("img");
  carrotImgEffect.setAttribute("src", "carrot.png");
  carrotImg.setAttribute("height", "200px");
  carrotImgEffect.remove();
  carrotImgEffect.classList.add("carrotClick");
  document.querySelector("#carrot").append(carrotImgEffect);
  setTimeout(() => {
    carrotImgEffect.remove();
  }, 300);
  started = true;
});

// RANDOM NUM GENERATOR

let dice = {
  roll: (sides) => {
    let result = Math.floor(Math.random() * sides + 1);
    console.clear();
    console.log(result);
    if (result != sides) {
      return false;
    } else {
      return true;
    }
  },
};

// WHEN CLICKING CARROT

function handleCarrotClick() {
  profitEffectAmount = -carrotMoney;
  let lucky = dice.roll(luckyClickChance);
  console.log(lucky);
  console.log(upgradeStats[2]);

  if (lucky == false) {
    carrotMoney += upgradeStats[1];
  } else {
    carrotMoney += upgradeStats[2];
  }
  profitEffectAmount = profitEffectAmount + carrotMoney;
  console.log(profitEffectAmount);
  console.log(upgradeStats[1]);
  carrotMoney++;
  profitEffect(profitEffectAmount);

  let loss = false;
}

// WHEN YOU CLICK UPGRADE

function upgrade() {
  if (carrotMoney >= upgradeCost[clickedButtonIndex]) {
    carrotMoney -= upgradeCost[clickedButtonIndex];
    upgradeLVL[clickedButtonIndex]++;
    loss = true;
    profitEffect(upgradeCost[clickedButtonIndex]);
  }
  clickedButtonIndex = -1;

  displayUpdate();
}

// CREATES TEMPORARY H2 ELEMENT WITH CSS CLASS CONTAINING ANIMATION

function profitEffect(profitEffectAmount) {
  let newDiv = document.createElement("h2");
  document.querySelector(".player-info").prepend(newDiv);
  if (loss == true) {
    newDiv.innerHTML = `-$${Math.floor(profitEffectAmount)}`;
    newDiv.classList.add("loss");
    setTimeout(() => {
      newDiv.remove();
    }, 200);
  } else {
    newDiv.innerHTML = `+$${Math.floor(profitEffectAmount)}`;
    newDiv.classList.add("gain");
    setTimeout(() => {
      newDiv.remove();
    }, 100);
  }
  loss = false;
}

// REFRESHES CHANGING HTML ELEMENTS

function displayUpdate() {
  upgradeStats = [
    3 * upgradeLVL[0] * 3.5,
    5 * upgradeLVL[1] * 5,
    5 * upgradeLVL[1] * 5 * luckyClickChance * upgradeLVL[2],
  ];
  upgradeCost = [
    100 * (upgradeLVL[0] + 1),
    125 * (upgradeLVL[1] + 1),
    luckyClickChance * (upgradeLVL[2] + 1),
  ];
  upgradeDisplayName = [
    `Per Second \n($${Math.floor(upgradeStats[0])})`,
    `Per Click ($${upgradeStats[1]})`,
    `Lucky Click (x${luckyClickChance * upgradeLVL[2]})`,
  ];

  for (let i = 0; i < upgradeDisplayName.length; i++) {
    name[i].innerHTML = upgradeDisplayName[i];
    level[i].innerHTML = `<td nowrap>Lv. <b>${upgradeLVL[i]}</b></td>`;
    button[i].innerHTML = `<button class="ugBtn">UPGRADE</button>`;
    cost[i].innerHTML = `-$${upgradeCost[i]}`;
  }

  balanceDisplay.innerHTML = `$${Math.floor(carrotMoney)}`;
}

// RUNS AFTER EVERY 1000MS THAT PASSES

setInterval(function () {
  if (started == true) {
    carrotMoney += upgradeStats[0];
    profitEffect(upgradeStats[0]);
    displayUpdate();
  }
}, 1000);

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function () {
    clickedButtonIndex = i;
  });
  button[i].addEventListener("click", upgrade);
}

// WHEN YOU CLICK ANYWHERE ON THE PAGE

document.addEventListener("click", displayUpdate);
