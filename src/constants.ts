// *
const CRYPTO_BTC = {
  id: "bitcoin",
  label: "Bitcoin",
};
const CURRENCY_USD = {
  id: "usd",
  label: "$",
};

const DELAY_TIME = 5;

// *
const URL_LIST_FOR_CRYPTO_INFO = {
  price: "https://api.coingecko.com/api/v3/simple/price",
};

// * persist to backend
const URL_LIST_FOR_PERSIST = {
  baseUrl: "http://localhost:8080",
  createAccount: "",
  getScore: "/%s",
  saveScore: "",
};

export {
  CRYPTO_BTC,
  CURRENCY_USD,
  DELAY_TIME,
  URL_LIST_FOR_CRYPTO_INFO,
  URL_LIST_FOR_PERSIST,
};
