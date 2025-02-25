const API_KEY = "f20504db5b4c48f38d21b752555ceb56"; // Replace with News API key
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
let focusModeEnabled = false;
let userTopics = [];

// Fetch News Articles
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
        console.error("Error fetching news:", error);
    }
}

// Display News Articles
function displayNews(articles) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = ""; // Clear previous news

    articles.forEach((article) => {
        const summary = summarizeContent(article.description || article.content);

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <a href="${article.url}" target="_blank">${article.title}</a>
            <p>${summary}</p>
        `;

        newsList.appendChild(listItem);
    });
}

// AI-Powered Summarization (Placeholder Function)
function summarizeContent(content) {
    // A mockup for AI summarization - replace with an AI API if available
    if (!content) return "No content available.";
    const words = content.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : content;
}

// Focus Mode Toggle
document.getElementById("focus-mode-toggle").addEventListener("click", () => {
    focusModeEnabled = !focusModeEnabled;
    document.body.style.filter = focusModeEnabled ? "grayscale(100%)" : "none";
    alert(`Focus Mode ${focusModeEnabled ? "Enabled" : "Disabled"}`);
});

// Set User Topics (Personalization)
document.getElementById("set-topics").addEventListener("click", () => {
    const topics = prompt("Enter your favorite topics (comma-separated):", "Technology, Business, Health");
    userTopics = topics.split(",").map((t) => t.trim());
    document.getElementById("user-topics").innerText = userTopics.join(", ");
    alert("Topics updated successfully!");
});

// Google Sign-In Integration
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("User signed in:", profile.getName());
    alert(`Welcome, ${profile.getName()}!`);
}

// Load News on Page Load
fetchNews();

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
function validateInput(input) {
    const sanitizedInput = input.replace(/<[^>]+>/g, ""); // Removes HTML tags
    return sanitizedInput.trim(); // Removes extra spaces
}
