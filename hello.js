const API_KEY = "53be1a911c2593f736c6c99a649371c9";

 // Replace with your API key from OpenWeatherMap

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const weatherInfo = document.querySelector("#weather-info");

searchForm.addEventListener("submit", e => {
  e.preventDefault(); // Prevent form submission from refreshing the page
  const location = searchInput.value;
  getWeather(location);
});

function getWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data,"fayaz")
      const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      weatherInfo.innerHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Weather App</title>
          <link rel="stylesheet" href="style.css">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          
        </head>
      <section class="vh-100" style="background-color: #f5f6f7;">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-10 col-lg-8 col-xl-6">
        
                <div class="card bg-dark text-white" style="border-radius: 40px;">
                  <div class="bg-image" style="border-radius: 35px;">
                    <img src="https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_960_720.jpg"
                    
                      class="card-img" alt="weather" />
                    <div class="mask" style="background-color: rgba(190, 216, 232, .5);"></div>
                  </div>
                  <div class="card-img-overlay text-dark p-5">
                  <br>
                  <br>
                  <br> 
                    <h4 class="mb-0">${description}</h4>
                    <p class="display-2 my-3">${temperature}°C</p>
                    <p class="mb-2">Feels Like: <strong>${temperature + 1}°C</strong></p>
                  </div>
                </div>
        
              </div>
            </div>
          </div>
        </section>
      </html>
      `;
    })
    .catch(error => {
      console.error(error);
      weatherInfo.textContent = "Error fetching weather data. Please try again later.";
    });
}
