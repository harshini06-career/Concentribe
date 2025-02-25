const API_KEY = "f20504db5b4c48f38d21b752555ceb56"; // Replace with your API key
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// Function to fetch news
async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            console.error("Error fetching news:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to display news
function displayNews(articles) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear previous news

    articles.forEach((article) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <a href="${article.url}" target="_blank">${article.title}</a>
            <p>${article.description || "No description available."}</p>
        `;

        newsList.appendChild(listItem);
    });
}

// Load news on page load
fetchNews();
