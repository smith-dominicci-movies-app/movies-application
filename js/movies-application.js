document.addEventListener('DOMContentLoaded', function () {
	const loadingMessage = document.querySelector('#loading-message');
	const moviesContainer = document.querySelector('#movies-container');

	// Fetch movies data and display
	fetchMovies();

	function fetchMovies() {
		fetch('http://localhost:3000/movies')
			.then(response => response.json())
			.then(movies => {
				console.log('Fetched movies:', movies); // Check the console for the movie data
				loadingMessage.style.display = 'none';
				displayMovies(movies);
			})
			.catch(error => {
				console.error('Error fetching movies:', error);
				loadingMessage.textContent = 'Error fetching movies. Please try again later.';
			});
	}

	function displayMovies(movies) {
		movies.forEach(movie => {
			const movieCard = createMovieCard(movie);
			moviesContainer.appendChild(movieCard);
		});
	}

	function createMovieCard(movie) {
		const movieCard = document.createElement('div');
		movieCard.classList.add('card', 'movie-card', 'col-md-4'); // Added 'col-md-4' for Bootstrap grid layout

		const cardImage = document.createElement('img');
		cardImage.src = movie.image || ''; // Replace 'image' with the actual property in your movie data
		cardImage.classList.add('card-img-top');
		cardImage.alt = movie.title || ''; // Replace 'title' with the actual property in your movie data

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const cardTitle = document.createElement('h5');
		cardTitle.classList.add('card-title');
		cardTitle.textContent = movie.title || ''; // Replace 'title' with the actual property in your movie data

		const cardText = document.createElement('p');
		cardText.classList.add('card-text');
		cardText.textContent = movie.description || ''; // Replace 'description' with the actual property in your movie data

		// You can add more details based on your movie data

		cardBody.appendChild(cardTitle);
		cardBody.appendChild(cardText);

		movieCard.appendChild(cardImage);
		movieCard.appendChild(cardBody);

		return movieCard;
	}

	// Simple functions for movie CRUD operations
	async function getMovies() {
		const url = 'http://localhost:3000/movies';
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	async function getMovie(id) {
		const url = `http://localhost:3000/movies/${id}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	async function deleteMovie(id) {
		const url = `http://localhost:3000/movies/${id}`;
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	}

	async function postMovie(movie) {
		const url = 'http://localhost:3000/movies';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(movie),
		};
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	}

	async function patchMovie(movie) {
		const url = `http://localhost:3000/movies/${movie.id}`;
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(movie),
		};
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	}
});
