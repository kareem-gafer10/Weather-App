let search = document.getElementById("search"),
  today = document.getElementById("today"),
  todayDate = document.getElementById("todayDate"),
  city = document.getElementById("locations"),
  degree = document.getElementById("degree"),
  todayIcon = document.getElementById("todayIcon"),
  todayDesc = document.getElementById("todayDesc"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass");
  find = document.getElementById("find");

let nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDayIcon"),
  maxDegree = document.getElementsByClassName("maxDegree"),
  minDegree = document.getElementsByClassName("minDegree"),
  nextDayDesc = document.getElementsByClassName("nextDayDesc"),
  apiResponse,
  responseData,
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthName = [
    "January",
    "Febraury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Spetemper",
    "October",
    "November",
    "December",
  ],
  currentCity="Cairo",
  dates = new Date();
const getWeatherData = async () => {
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=75394de0761c437d8f9124525231705&q=${currentCity}&days=3&aqi=no&alerts=no`
  );
  responseData = await apiResponse.json();
  displayWeather();
  displayNextDayWeathr();
};

getWeatherData();



const displayWeather = () => {
  today.innerHTML = days[dates.getDay()];
  todayDate.innerHTML = `${dates.getDate()} ${monthName[dates.getMonth()]}`;
  city.innerHTML = responseData.location.name;
  degree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
  todayDesc.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
};












const displayNextDayWeathr = () => {
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
    nextDayIcon[i].setAttribute("src" ,`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
    nextDayDesc[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
  }
};





find.addEventListener("click", () => {
  currentCity = search.value;
  if (currentCity.trim().length > 2) {
    getWeatherData();
  }
});