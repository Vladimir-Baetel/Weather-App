const infoDomElement = document.querySelector(".info");
const input = document.querySelector(".search > input");

infoDomElement.innerHTML = "<h1>Loading... 😎</h1>";

async function getLocation() {
  try {
    const url = "https://extreme-ip-lookup.com/json/?key=XyjcKh4Jb6gAcMbyqPRc";
    const res = await fetch(url);
    const jsonRes = await res.json();
    city = await jsonRes.city;
  } catch (e) {
    city = "Bucharest";
    console.log(
      "Location could not be acessed automatically, default is Bucharest"
    );
  }
}
getLocation();

setTimeout(function () {
  getWeather();
}, 1000);

input.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    city = input.value;
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    input.value = "";

    infoDomElement.innerHTML = "<h1>Loading... 😎</h1>";

    setTimeout(function () {
      searchHistory();
      updateSearchHistoryUi();
      updateSearchBtn();
    }, 1500);

    setTimeout(function () {
      getWeather();
    }, 1000);
  }
});

function searchHistory() {
  const maxHistoryLength = 5;
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  const isHistoryMaxed = history.length === maxHistoryLength;
  const workingHistory = isHistoryMaxed ? history.slice(1) : history;

  if (city !== "") {
    const updatedHistory = workingHistory.concat(locationX);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }
}

function updateSearchHistoryUi() {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  let historySpot1 = "";
  let historySpot2 = "";
  let historySpot3 = "";
  let historySpot4 = "";
  let historySpot5 = "";

  if (history[0] === null) {
    historySpot1 = "Invalid location";
  } else {
    historySpot1 = history[0];
  }

  if (history[1] === null) {
    historySpot2 = "Invalid location";
  } else {
    historySpot2 = history[1];
  }

  if (history[2] === null) {
    historySpot3 = "Invalid location";
  } else {
    historySpot3 = history[2];
  }

  if (history[3] === null) {
    historySpot4 = "Invalid location";
  } else {
    historySpot4 = history[3];
  }

  if (history[4] === null) {
    historySpot5 = "Invalid location";
  } else {
    historySpot5 = history[4];
  }

  document.querySelector(".search-history").innerHTML =
    "<div class='search-btn'>" +
    historySpot5 +
    "</div>" +
    "<div class='search-btn'>" +
    historySpot4 +
    "</div>" +
    "<div class='search-btn'>" +
    historySpot3 +
    "</div>" +
    "<div class='search-btn'>" +
    historySpot2 +
    "</div>" +
    "<div class='search-btn'>" +
    historySpot1 +
    "</div>";
}
updateSearchHistoryUi();

async function getWeather() {
  try {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=d7db22f333fc4e6aaf3110311222601&q=" +
      city +
      "&aqi=no";
    const res = await fetch(url);
    const jsonRes = await res.json();

    locationX = await jsonRes.location.name;
    let datetime = await jsonRes.location.localtime;
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
    };
    let date = new Date(datetime).toLocaleString("en-GB", optionsDate);
    let time = new Date(datetime).toLocaleString("en-GB", optionsTime);
    let icon = await jsonRes.current.condition.icon;
    let condition = await jsonRes.current.condition.text;
    let temperature = await jsonRes.current.temp_c;
    temperature = Math.floor(temperature);
    let feelslike = await jsonRes.current.feelslike_c;
    feelslike = Math.floor(temperature);

    infoDomElement.innerHTML =
      "<div class='location'><h2>" +
      locationX +
      "</h2></div>" +
      "<div class='date'><p>" +
      date +
      "</p></div>" +
      "<div class='time'><p>Local time: " +
      time +
      "</p></div>" +
      "<div class='condition flex'><img src='" +
      icon +
      "'/><p>" +
      condition +
      "</p></div>" +
      "<div class='temperature flex'><h3><span>" +
      temperature +
      "</span><sup>°</sup></h3><h3>C</h3></div>" +
      "<div class='feels-like'><p>Feels like <span>" +
      feelslike +
      "</span><sup>°</sup>C</p></div>";
  } catch (e) {
    infoDomElement.innerHTML = "<h1>Location not found 😞</h1>";
    locationX = undefined;
    console.log("Try searching again and pressing enter");
  }
}

function updateSearchBtn() {
  let searchBtn = document.getElementsByClassName("search-btn");

  for (let i = 0; i < searchBtn.length; i++) {
    searchBtn[i].addEventListener("click", function getSearchWeather() {
      let searchLoc = searchBtn[i].innerHTML;
      if (searchLoc !== "Invalid location") {
        city = searchLoc;
        getWeather();
        console.log(searchLoc);
      } else {
        city = "";
      }
    });
  }
}
updateSearchBtn();
