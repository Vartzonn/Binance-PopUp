// Binance API datas
const binanceAPI = {
  APIKEY: "YOUR_API_KEY",
  SKEY: "YOUR_SECRET_KEY",
  baseUrl: "https://api.binance.com",
  orderEndpoint: "/api/v3/order",
};
const urlPhpSign = "https://hashphpapi.000webhostapp.com/";
const body = document.body;

function cardGlobalStyle(el) {
  el.style.width = "240px";
  el.style.position = "fixed";
  el.style.right = "1.5%";
  el.style.zIndex = "100000";
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
}
// Card that contain the form (the inputs)
const card = document.createElement("div");
function cardStyle() {
  card.style.width = "30px";
  card.style.height = "30px";
  card.style.borderRadius = "50%";
}
cardGlobalStyle(card);
cardStyle();
// We check if we are in dark or light mode
const darkModeDiv = document.querySelector('.css-4lf95n');
let cardBackgroundColor = "white";
if(!darkModeDiv) {
  cardBackgroundColor = "gold";
}
card.style.backgroundColor = cardBackgroundColor;
card.style.top = "8%";
card.style.transition =
  "width .3s, height .3s, border-radius .3s, background-color .4s";

// We take the last position of the card in localStorage
let cardPosition = JSON.parse(localStorage.getItem("cardPosition"));
if (cardPosition) {
  card.style.top = cardPosition.cardTop;
  card.style.left = cardPosition.cardLeft;
} else {
  card.style.top = "8%";
  card.style.left = "1.5%";
}

function whiteCard() {
  card.style.backgroundColor = "white";
}
const errorTime = 1500;
function cardError() {
  card.style.backgroundColor = "tomato";
  window.setTimeout(whiteCard, errorTime);
}
function cardSuccess() {
  card.style.backgroundColor = "lightgreen";
  window.setTimeout(whiteCard, 500);
}

// Errors card
const errorCard = document.createElement("div");
cardGlobalStyle(errorCard);
errorCard.style.height = "100px";
errorCard.style.overflow = "auto";
errorCard.style.borderRadius = "5%";
errorCard.style.backgroundColor = "tomato";
errorCard.style.top = "36%";
errorCard.style.transform = "translateX(500%)";
errorCard.style.transition = "transform .4s";
const titleError = document.createElement("span");
titleError.innerHTML = "Error :";
titleError.style.fontWeight = "bold";
const messageError = document.createElement("span");
messageError.innerHTML = "Error message";
messageError.style.textAlign = "center";
messageError.style.marginTop = "3%";
errorCard.appendChild(titleError);
errorCard.appendChild(messageError);

function showErrorCard(message) {
  errorCard.style.transform = "translateX(0)";
  messageError.innerHTML = message;
  submitInput.disabled = true;
  window.setTimeout(() => {
    submitInput.disabled = false;
    errorCard.style.transform = "translateX(500%)";
  }, errorTime);
}

function createInput(el, placeholder) {
  el.setAttribute("type", "text");
  el.setAttribute("required", "required");
  el.setAttribute("placeholder", placeholder);
}

// Creation of the form
const form = document.createElement("form");
form.style.display = "none";
form.setAttribute("action", "#");

// Input for the crypto pair
const nameInput = document.createElement("input");
createInput(nameInput, "Crypto pair (ex: BTCUSDT)");
const cryptoName = document
  .querySelector("h1")
  .textContent.trim();
const pairCrypto = cryptoName.replace("/", "");
nameInput.value = pairCrypto;

//Input for the amount to trade
const amountInput = document.createElement("input");
createInput(amountInput, "Amount");
amountInput.style.marginTop = "10px";

//Input for the current price
const priceInput = document.createElement("input");
createInput(priceInput, "Current Price");
priceInput.style.marginTop = "10px";
const priceCrypto = document.querySelector(".contractPrice").textContent;
const amountValueToChange = parseFloat(
  document.querySelector(".primary").textContent.trim()
);
const amountDecimal = amountValueToChange.toString().split(".")[1];
const amountDecimalLength = amountDecimal ? amountDecimal.length : 0;
priceInput.value = parseFloat(priceCrypto).toFixed(amountDecimalLength);

// Function when the price is change by the user
function changePriceFunc(input, isAugmented) {
  const amountValueToChange = parseFloat(
    document.querySelector(".primary").textContent.trim()
  );
  const amountDecimal = amountValueToChange.toString().split(".")[1];
  const amountDecimalLength = amountDecimal ? amountDecimal.length : 0;

  if (isAugmented) {
    input.value = (parseFloat(input.value) + amountValueToChange).toFixed(
      amountDecimalLength
    );
  } else {
    input.value = (parseFloat(input.value) - amountValueToChange).toFixed(
      amountDecimalLength
    );
  }
}
// Add event listeners to the price input
priceInput.addEventListener("mousedown", (ev) => {
  if (document.activeElement === priceInput) {
    if (ev.buttons === 1) {
      changePriceFunc(priceInput, true);
      calculPricesFunc();
    } else if (ev.buttons === 2) {
      changePriceFunc(priceInput, false);
      calculPricesFunc();
    }
  }
});
priceInput.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
priceInput.addEventListener("input", () => {
  calculPricesFunc();
});
priceInput.addEventListener("change", () => {
  if (priceInput.value === "") {
    priceInput.value = 0;
    calculPricesFunc();
  }
});
priceInput.addEventListener("wheel", (ev) => {
  ev.preventDefault();
  if (ev.wheelDeltaY > 0) {
    changePriceFunc(priceInput, true);
    calculPricesFunc();
  } else {
    changePriceFunc(priceInput, false);
    calculPricesFunc();
  }
});

// Div that contains inputs for buying and selling price
const pricesDiv = document.createElement("div");
pricesDiv.style.display = "flex";
pricesDiv.style.justifyContent = "center";
pricesDiv.style.marginTop = "10px";
const buyPriceInput = document.createElement("input");
pricesDiv.appendChild(buyPriceInput);
const sellPriceInput = document.createElement("input");
sellPriceInput.style.marginLeft = "2%";
pricesDiv.appendChild(sellPriceInput);

//We create an array with the placeholders for the inputs
//We use it as a param in the function createInput in the loop below
const placeholderArray = ["Buying price", "Selling price"];

for (let i = 0; i < pricesDiv.children.length; i++) {
  const el = pricesDiv.children[i];
  createInput(el, placeholderArray[i]);
  el.style.width = "28.7%";

  el.addEventListener("mousedown", (ev) => {
    if (document.activeElement === el) {
      if (ev.buttons === 1) {
        changePriceFunc(el, true);
      } else if (ev.buttons === 2) {
        changePriceFunc(el, false);
      }
    }
  });
  el.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  el.addEventListener("change", () => {
    if (el.value === "") {
      calculPricesFunc();
    }
  });
  el.addEventListener("wheel", (ev) => {
    ev.preventDefault();
    if (ev.wheelDeltaY > 0) {
      changePriceFunc(el, true);
    } else {
      changePriceFunc(el, false);
    }
  });
}

function calculPricesFunc() {
  const amountValueToChange = parseFloat(
    document.querySelector(".primary").textContent.trim()
  );
  const amountDecimal = amountValueToChange.toString().split(".")[1];
  const amountDecimalLength = amountDecimal ? amountDecimal.length : 0;

  let calculBuy = parseFloat(
    (parseFloat(priceInput.value) * (1 - parseFloat(0.2) / 100)).toFixed(
      amountDecimalLength
    )
  );
  let calculSell = parseFloat(  
    (parseFloat(priceInput.value) * (1 + parseFloat(0.3) / 100)).toFixed(
      amountDecimalLength
    )
  );
  if (isNaN(calculBuy)) {
    calculBuy = 0;
  }
  if (isNaN(calculSell)) {
    calculSell = 0;
  }

  buyPriceInput.value = calculBuy;
  sellPriceInput.value = calculSell;
}
calculPricesFunc();

//Creation of the submit input 
const submitInput = document.createElement("input");
submitInput.setAttribute("type", "submit");
submitInput.style.marginTop = "20px";
submitInput.style.cursor = "pointer";
submitInput.value = "Send";

function callAPI(side, amount, price) {
  let queryString = `symbol=${pairCrypto}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${amount}&price=${price}&recvWindow=20000&timestamp=${Date.now()}`;

  fetch(`${urlPhpSign}?${queryString}&secret=${binanceAPI.SKEY}`, {
    method: "GET",
  })
    .then((res) => res.text())
    .then((sign) => {
      let binanceURL = `${binanceAPI.baseUrl}${binanceAPI.orderEndpoint}?${queryString}&signature=${sign}`;
      fetch(binanceURL, {
        method: "POST",
        headers: {
          "X-MBX-APIKEY": binanceAPI.APIKEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.msg) {
            showErrorCard(`${data.msg}`);
            cardError();
          } else {
            cardSuccess();
          }
        });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value.replace(",", "."));
  const price = parseFloat(priceInput.value.replace(",", "."));
  const total = amount * price;

  let balances, balanceUSDT, balanceCrypto;
  // If the page contains this class then we are on the pro mode
  if (document.querySelector(".css-1g37knx")) {
    balances = document.querySelectorAll(".css-1iqe90x");
    balanceUSDT = parseFloat(
      balances[balances.length - 1].innerHTML.trim()
    ).toFixed(3);
    balanceCrypto = parseFloat(
      balances[balances.length - 2].innerHTML.trim()
    ).toFixed(3);
  }
  // Else we are on classique mode
  else {
    balances = document.querySelectorAll(".css-k4h8bj");
    balanceUSDT = parseFloat(balances[0].firstChild.textContent.trim()).toFixed(
      3
    );
    balanceCrypto = parseFloat(
      balances[1].firstChild.textContent.trim()
    ).toFixed(3);
  }

  const minUSDT = 10;
  if (total < minUSDT) {
    showErrorCard(`You need to trade a minimum of ${minUSDT} USDT`)
    cardError();
  } else if (!balanceUSDT || isNaN(balanceUSDT) || balanceUSDT < total) {
    showErrorCard("Not enough USDT");
    cardError();
  } else if (!balanceCrypto || isNaN(balanceCrypto) || balanceCrypto < amount) {
    showErrorCard(`Not enough ${pairCrypto.replace("USDT", "")}`);
    cardError();
  } else {
    callAPI("BUY", amount, buyPriceInput.value);
    callAPI("SELL", amount, sellPriceInput.value);
  }
});

form.appendChild(nameInput);
form.appendChild(amountInput);
form.appendChild(priceInput);
form.appendChild(pricesDiv);
form.appendChild(submitInput);

const plusSpan = document.createElement("span");
plusSpan.innerHTML = "+";
plusSpan.classList.add("plusSpan");
plusSpan.style.fontSize = "25px";
plusSpan.style.cursor = "pointer";
plusSpan.style.color = "black";
plusSpan.style.paddingBottom = "3px";
plusSpan.style.userSelect = "none";

let justClicked = false;
plusSpan.addEventListener("click", (e) => {
  // To avoid issues when opening and closing the pop-up, we prevent spam click
  if (justClicked) return;
  justClicked = true;
  setTimeout(() => {
    justClicked = false;
  }, 200);

  // If we haven't just move the pop-up, we open/close it
  if (!hasMoved) {
    const target = e.target;
    if (target.innerHTML === "+") {
      target.innerHTML = "-";
      target.style.position = "absolute";
      target.style.width = "5%";
      target.style.top = "1%";
      target.style.left = "4%";

      card.style.width = "240px";
      card.style.height = "200px";
      card.style.borderRadius = "5%";

      window.setTimeout(() => {
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.justifyContent = "center";
        form.style.alignItems = "center";
      }, 250);
    } else {
      target.style.display = "none";
      window.setTimeout(() => {
        target.style.display = "unset";
        target.style.position = "unset";
        target.style.top = "0";
        target.style.right = "0";
        target.style.width = "50%";
      }, 250);
      target.innerHTML = "+";

      form.style.display = "none";

      cardStyle();
    }
  }
});

let hasMoved = false;
let oldX, oldY;
// Function to move the card with the mouse
function moveCard(e) {
  card.style.top = `${e.clientY - 15}px`;
  card.style.left = `${e.clientX - 15}px`;
  // We check if we move the card to know if we open it or not
  if (oldY !== card.style.top || oldX !== card.style.left) {
    hasMoved = true;
  }
}
let isClicked = false;
plusSpan.addEventListener("mousedown", (e) => {
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
    hasMoved = false;
    oldY = card.style.top;
    oldX = card.style.left;
    isClicked = true;
    window.addEventListener("mousemove", moveCard);
  }
});
card.addEventListener("mouseup", () => {
  if (isClicked) {
    isClicked = false;
    window.removeEventListener("mousemove", moveCard);

    // We save the new position if the localStorage 
    if (hasMoved) {
      localStorage.setItem(
        "cardPosition",
        JSON.stringify({
          cardTop: card.style.top,
          cardLeft: card.style.left,
        })
      );
    }
  }
});

card.appendChild(plusSpan);
card.appendChild(form);
body.appendChild(card);
body.appendChild(errorCard);
