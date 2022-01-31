const infoDomElement = document.querySelector(".info");
const input = document.querySelector(".search > input");
let city = "";

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
  getAPI();
}, 1000);

input.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    city = input.value;
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    infoDomElement.innerHTML = "<h1>Loading</h1>";

    setTimeout(function () {
      getAPI();
    }, 1000);
  }
});

async function getAPI() {
  try {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=d7db22f333fc4e6aaf3110311222601&q=" +
      city +
      "&aqi=no";
    const res = await fetch(url);
    const jsonRes = await res.json();

    let location = await jsonRes.location.name;
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
      second: "numeric",
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
      location +
      "</h2></div>" +
      "<div class='date'><p>" +
      date +
      "</p></div>" +
      "<div class='time'><p>" +
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
    console.log("Try searching again and pressing enter");
  }
}
