let city = "";

function getLocation() {
  const url = "https://extreme-ip-lookup.com/json/?key=XyjcKh4Jb6gAcMbyqPRc";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        city = "Bucharest";
      }
      return response.json();
    })
    .catch(() => {
      city = "Bucharest";
    })
    .then(() => {
      city = data["city"];
    });
}
getLocation();

setTimeout(function () {
  getAPI();
}, 500);

const input = document.querySelector(".search > input");
const loc = document.querySelector(".location > h2");
const date = document.querySelector(".date > p");
const time = document.querySelector(".time > p > span");
const temp = document.querySelector(".temp");
const cond = document.querySelector(".cond");
const icon = document.querySelector(".icon");
const feel = document.querySelector(".feel");

input.addEventListener("keydown", function (listen) {
  if (listen.code === "Enter") {
    city = input.value;
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    getAPI();
  }
});

function getAPI() {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=d7db22f333fc4e6aaf3110311222601&q=" +
    city +
    "&aqi=no";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        loc.innerHTML = "😞 Try Again";
        date.innerHTML = "";
        temp.innerHTML = "0";
        cond.innerHTML = "";
        icon.src = "";
        feel.innerHTML = "0";
      }
      return response.json();
    })
    .then((data) => {
      let locData = data["location"]["name"];
      let dateData = data["location"]["localtime"];
      let tempData = data["current"]["temp_c"];
      tempData = Math.floor(tempData);
      let condData = data["current"]["condition"]["text"];
      let iconData = data["current"]["condition"]["icon"];
      let feelData = data["current"]["feelslike_c"];

      let dateOptionsD = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let dateOptionsT = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      dateDataD = new Date(dateData).toLocaleString("en-GB", dateOptionsD);
      dateDataT = new Date(dateData).toLocaleString("en-GB", dateOptionsT);

      loc.innerHTML = locData;
      date.innerHTML = dateDataD;
      time.innerHTML = dateDataT;
      temp.innerHTML = tempData;
      cond.innerHTML = condData;
      icon.src = iconData;
      feel.innerHTML = feelData;
    });
}

// TO DO:
//  1 - Github
//  2 - HTML dinamic din JS + remove temp, feel like, date, time, etc. when error
//  3 - Cookies?
