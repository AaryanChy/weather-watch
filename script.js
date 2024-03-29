const mainContainer = document.querySelector(".container");
const cityName = document.querySelector(".cityName");
const condition = document.querySelector(".condition");
const tempValue = document.querySelector(".tempValue");
const humidValue = document.querySelector(".humidValue");
const windValue = document.querySelector(".windValue");
const input = document.querySelector(".search");
const searchBtn = document.querySelector("button");
const toggle = document.querySelector(".check");
const errorContainer = document.querySelector(".errorMessage");

searchBtn.addEventListener("click", () => {
  fetchData(input.value);
  showLoading();
});
const fetchData = async (value) => {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=8e97ef37eede4374ae2112637233103&q=${value}`
  );
  let data = await response.json();

  console.log(data);
  if (!data.error) {
    errorContainer.innerHTML = "";
    showWeatherInfo(data);
  } else {
    errorContainer.innerHTML = "";
    mainContainer.style.display = "none";
    const p = document.createElement("p");
    p.textContent = data.error.message;
    errorContainer.appendChild(p);
  }
};

const showLoading = () => {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  mainContainer.style.display = "none";
};
const hideLoading = () => {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
  mainContainer.style.display = "block";
};
const showWeatherInfo = (data) => {
  hideLoading();
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
  toggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      tempValue.textContent = `${data.current.temp_f} °F`;
    } else {
      tempValue.textContent = `${data.current.temp_c} °C`;
    }
  });
};
