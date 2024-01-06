const mainContainer = document.querySelector(".container");
const cityName = document.querySelector(".cityName");
const condition = document.querySelector(".condition");
const tempValue = document.querySelector(".tempValue");
const humidValue = document.querySelector(".humidValue");
const windValue = document.querySelector(".windValue");
const toggle = document.querySelector(".optToggle");
const input = document.querySelector(".search");
const searchBtn = document.querySelector("button");

searchBtn.addEventListener("click", () => {
  fetchData(input.value);
});
const fetchData = async (value) => {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=8e97ef37eede4374ae2112637233103&q=${value}`
    );
    let data = await response.json();
    if (!data) {
      console.log("sorry there is no Data");
    } else {
      console.log(data);
      showWeatherInfo(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const showWeatherInfo = (data) => {
  const img = document.createElement("img");
  const p = document.createElement("p");
  cityName.textContent = data.location.name;
  condition.innerHTML = "";
  img.classList = "icon";
  img.src = data.current.condition.icon;
  p.textContent = data.current.condition.text;
  tempValue.textContent = `${data.current.temp_c} °C`;
  humidValue.textContent = `Humidity: ${data.current.humidity}`;
  windValue.textContent = `Wind: ${data.current.wind_kph} kph`;
  condition.appendChild(img);
  condition.appendChild(p);
};
