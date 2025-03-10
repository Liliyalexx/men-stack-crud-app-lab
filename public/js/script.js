document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Fetch the API key from the backend
      const configRes = await fetch("/api/config");
      const configData = await configRes.json();
      const apiKey = configData.nasaApiKey;
  
      if (!apiKey) {
        throw new Error("API key is missing");
      }
  
      // Now fetch the NASA API data
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      console.log("NASA API Response:", data); 
  
      document.querySelector(".content").innerHTML += `
      <h2>${data.title}</h2>
      <img src="${data.url}" alt="${data.title}" class="nasa-image" />
      <div class="inform-container">
        <p class="inform">${data.explanation}</p>
      </div>
    `;
    } catch (error) {
      console.error("Error:", error);
    }
  });