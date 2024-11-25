/* Global Variables */
// Personal API Key for OpenWeatherMap API
let apiKey;
fetch('/apiKey')
  .then(response => response.json())
  .then(data => {
    apiKey = data.apiKey;
  })
  .catch(error => {
    console.error("Failed to load API key", error);
  });

  
  // Event listener to add function to existing HTML DOM element
const btn = document.getElementById('generate');
btn.addEventListener('click', handleClickfn);

const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        // Make sure the properties exist before trying to access them
        if (allData && allData.length > 0) {
            const entryHolder = document.getElementById('entryHolder');
            entryHolder.innerHTML = "";  // Clear the previous entries before adding new ones

            // Loop through the data and add it to the DOM
            allData.forEach(data => {
                const ele = `
                    <div class="border">
                        <div id="name">${data.name}</div>
                        <div id="date">${Math.round(data.temp)}°</div>
                        <div id="temp">${data.content}</div>
                        <div id="content">${data.date}</div>
                    </div>`;
                entryHolder.innerHTML += ele;  // Append each entry to the entry holder
            });
        } else {
            console.error("Data structure is missing expected properties.");
        }
    } catch (error) {
        console.log('error', error);
    }
}

retrieveData();
  
function handleClickfn(event) {
    event.preventDefault(); 

    // Data to send in the POST request
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    
    const data = {
        zip,
        feelings
    };

    // Function to send data using POST
    const sendData = async () => {
        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();  
                console.log('Response from server:', result);
                retrieveData();  // Call to retrieve data after the POST is successful
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Network Error:', error);
        }
    };

    // Call the sendData function to send the request
    sendData();
}

