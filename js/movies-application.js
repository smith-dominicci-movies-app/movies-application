document.addEventListener('DOMContentLoaded', function () {
	const loadingMessage = document.querySelector('#loading-message');
	const moviesContainer = document.querySelector('#movies-container');

	// Fetch movies data and display
	fetch('http://localhost:3000/movies')
		.then(response => response.json())
		.then(movies => {
			loadingMessage.style.display = 'none';
			displayMovies(movies);
		})
		.catch(error => console.error('Error fetching movies:', error));

	function displayMovies(movies) {
		// Implement logic to display movies on the page
		// You can create HTML elements dynamically for each movie
	}
});