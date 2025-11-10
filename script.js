const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchButton.addEventListener('click', searchUniversities);

async function searchUniversities() {
    const query = searchInput.value;

    if (query.trim() === "") {
        resultsContainer.innerHTML = '<p>Please enter a name to search first.</p>';
        return;
    }

    resultsContainer.innerHTML = '<p>...Searching</p>';

    const apiUrl = `https://universities.hipolabs.com/search?name=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        displayResults(data);

    } catch (error) {
        resultsContainer.innerHTML = `<p>An error occurred while fetching data: ${error.message}</p>`;
    }
}

function displayResults(universities) {
    resultsContainer.innerHTML = '';

    if (universities.length === 0) {
        resultsContainer.innerHTML = '<p>No matching results found.</p>';
        return;
    }

    const ul = document.createElement('ul');

    universities.forEach(uni => {
        const li = document.createElement('li');
        
        const website = uni.web_pages[0] 
            ? `<a href="${uni.web_pages[0]}" target="_blank">Visit Website</a>` 
            : 'No website available';
        
        li.innerHTML = `<strong>${uni.name}</strong> (Country: ${uni.country}) - ${website}`;
        
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}