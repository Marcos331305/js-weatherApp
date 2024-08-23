// Preloader Handling
const Preloader = document.querySelector("#preloader");
setTimeout(()=>{
  Preloader.style.display = "none";
},1000);

// Fetching Elements

const input = document.querySelector("#input");
const search = document.querySelector("#search");
const image = document.querySelector("#image");
const temprature = document.querySelector("#temprature");
const cityName = document.querySelector("#cityname");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windspeed");
const dataPart = document.querySelector("#dataPart");
const invalidPara = document.querySelector("#invalid-para");

// function for apiRequest with IIFE
async function apiRequest() {
  let city = input.value;
  // Defining api url's and key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const apiId = "95fd9db19b87656b087e355a42b27c8b";

  // Make api request
  const response = await fetch(apiUrl + `&appid=${apiId}`);
  // Handle the client errors of an api request
  if (response.status >= 400 && response.status <= 499) {
    dataPart.style.display = "none";
    invalidPara.style.display = "block";
  } else {
    const data = await response.json();

    // adding the data received from api into appropriate places
    temprature.innerHTML = Math.round(data.main.temp);
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity;
    windSpeed.innerHTML = Math.round(data.wind.speed);

    // update the images based on the weather condition
    if (data.weather[0].main === "Clouds") {
      image.src = "./assets/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      image.src = "./assets/clear.png";
    } else if (data.weather[0].main === "Rain") {
      image.src = "./assets/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      image.src = "./assets/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      image.src = "./assets/mist.png";
    }
    dataPart.style.display = "flex";
    invalidPara.style.display = "none";
  }
}

// adding functanility in search button and input-field
search.addEventListener("click", () => {
  apiRequest();
});
