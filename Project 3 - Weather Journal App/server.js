let projectData = [];  // Initialize as an array

// server.js
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables from .env file

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website')); 

// API route to send API key to the client-side
app.get('/apiKey', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Get all data
app.get('/all', (req,res) => {
    res.send(projectData);
});

// POST request to add weather data
app.post('/add', async (req, res) => {
    const { zip, feelings } = req.body;
    const apiKey = process.env.API_KEY;  // Get the API key from environment variable
    
    try {
        // Use the fetch API to get weather data from OpenWeatherMap
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`);
        
        // Check if the response is successful
        if (!weatherResponse.ok) {
            throw new Error('Weather data fetch failed');
        }

        // Parse the response to JSON
        const weatherData = await weatherResponse.json();

        // Extract temperature from the response
        const temp = weatherData.main.temp;
        const date = new Date().toLocaleDateString();  
        
        // Store the fetched data into projectData
        projectData.push({
            name: weatherData.name,
            temp,
            content: feelings,
            date
        });
        
        res.send({ message: 'Data Added Successfully' });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send({ message: 'Failed to fetch weather data' });
    }
});
