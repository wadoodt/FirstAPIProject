// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = '2da8cb98d6d883dd078036bc831fafc4';

// Function to fetch weather data from the API
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found! Please check the city name and try again.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Failed to fetch weather data. Please try again later.');
    }
}

// Function to display weather information on the page
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p>Temperature: ${Math.round(data.main.temp - 273.15)} °C</p>
    <p>Feels like: ${Math.round(data.main.feels_like - 273.15)} °C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Last update at ${(new Date(data.dt * 1000)).getHours()}:${Math.floor((new Date(data.dt * 1000)).getMinutes() / 10) * 10}</p>
  `;
}

// Function to handle the 'Get Weather' button click
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    try {
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData);
    } catch (error) {
        // The catch block handles the error locally and shows an error message to the user
        alert(error.message);
    }
}



// Function to send an email using Gmail
async function sendEmail(senderEmail, senderPassword, recipientEmail, subject, text) {
    // Create a Nodemailer transporter object
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: senderEmail,
            pass: senderPassword,
        },
    });

    // Email content
    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: subject,
        text: text,
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.log("Error sending email:", error);
    }
}

