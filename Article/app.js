let articles = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            articles = data;
            populateFilterOptions();
            displayArticles(articles);
        })
        .catch(error => console.error('Error fetching articles:', error));
});

function populateFilterOptions() {
    const tagFilter = document.getElementById('tag-filter');
    const uniqueTags = new Set();

    articles.forEach(article => {
        article.tags.forEach(tag => {
            uniqueTags.add(tag);
        });
    });

    uniqueTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

function filterArticles() {
    const selectedTag = document.getElementById('tag-filter').value;
    let filteredArticles;

    if (selectedTag === '') {
        filteredArticles = articles;
    } else {
        filteredArticles = articles.filter(article => article.tags.includes(selectedTag));
    }

    displayArticles(filteredArticles);
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.img}" alt="${article.title}">
            <p>Tags: ${article.tags.join(', ')}</p>
            <button onclick="openArticle('${article.id}')">Read More</button>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

function openArticle(id) {
    const articleMap = {
        1: 'cookingforu.html',
        2: 'ilovegames.html'
        // Add more mappings as needed
    };

    const filename = articleMap[id];
    
    if (filename) {
        window.location.href = filename;
    } else {
        alert('Article not found!');
    }
}
