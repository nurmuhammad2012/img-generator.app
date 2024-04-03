const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const form = document.getElementById('searchForm');
const showMoreBtn  = document.getElementById('showmore');
showMoreBtn.style.display = 'none';

showMoreBtn.addEventListener('click', function () {
  page += 10;
  performSearch();
});

searchButton.addEventListener('click', performSearch);
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission and page reload
  performSearch();
});

let page = 10

async function performSearch() {
  showMoreBtn.style.display = 'block';
  const query = searchInput.value.trim();
  if (query === '') return;

  const apiKey = 'QKo1c1hqCkeattzMIm3fixDPPV6eNBueOPta-ABBoFo';
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${page}&client_id=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    displayResults(data.results);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayResults(results) {
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    console.log(result);
    const resultElement = document.createElement('div');
    resultElement.classList.add('col-lg-4', 'col-sm-6', 'my-3', 'shadow');

    resultElement.innerHTML = `
      <div class="card">
        <img class="card-img-top" src="${result.urls.small}" alt="Card image">
        <div class="card-body">
          <p class="card-text">${result.alt_description}</p>
        </div>
      </div>
    `;

    resultsContainer.appendChild(resultElement);
  });
}