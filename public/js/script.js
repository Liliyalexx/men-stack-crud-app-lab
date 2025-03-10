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

         // Check if there's an hdurl, otherwise use the regular url
    const imageUrl = data.hdurl || data.url;

  
      // Display NASA APOD information in the DOM
      const contentElement = document.querySelector(".content");
      contentElement.innerHTML += `
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
  