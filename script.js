              const weatherContainer = document.querySelector('.weather-container');
              const locationText = document.querySelector('.location');
              const descriptionText = document.querySelector('.description');
              const temperatureText = document.querySelector('.temperature');
              const windSpeedText = document.querySelector('.wind-speed');

              function getLocation() {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }

              function showPosition(position) {
                const userLocation = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                locationText.textContent = userLocation;
                fetchWeather(userLocation);
              }

              function showError(error) {
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                  case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                  case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                  case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
                }
                // Optionally display a default location or allow manual input here
              }

              function fetchWeather(location) {
                const apiKey = 'CENSORED'; // Replace with your WeatherAPI.com API key

                fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
                  .then(response => response.json())
                  .then(data => {
                    const weather = data.current.condition.text;
                    const temperature = data.current.temp_c; // Celsius temperature
                    const windSpeed = data.current.wind_kph; // Wind speed in kilometers per hour

                    descriptionText.textContent = weather;
                    temperatureText.textContent = `${temperature}°C`; // Display Celsius temperature
                    windSpeedText.textContent = windSpeed + ' km/h';

                    // Set background color based on weather (consider adding more conditions)
                    const weatherType = weather.toLowerCase();
                    switch (weatherType) {
                      case 'sunny':
                        weatherContainer.style.backgroundColor = '#f0d99f'; // Light yellow
                        break;
                      case 'cloudy':
                        weatherContainer.style.backgroundColor = '#d3d3d3'; // Light gray
                        break;
                      case 'rainy':
                        weatherContainer.style.backgroundColor = '#a2a2d0'; // Light blue
                        break;
                      case 'snowy':
                        weatherContainer.style.backgroundColor = '#d7e8f0'; // Light blue
                        break;
                      default:
                        weatherContainer.style.backgroundColor = '#fff'; // White (default)
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherDescription.textContent = 'Error: Unable to fetch weather data.'; // Informative message
                  });
              }

              getLocation();
