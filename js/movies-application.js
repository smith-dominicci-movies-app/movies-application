// Global functions
const createMovieCard = (movie) => {
	const card = document.createElement('div');
	card.classList.add('movie-card');

	// Header: Options Button, Movie Title, and Year
	const header = document.createElement('div');
	header.classList.add('card-header');
	header.innerHTML = `
	<div class="options-dropdown">
    <button class="options-button" onclick="toggleOptionsDropdown(event, ${movie.id})">...</button>
    <div class="options-content" id="options-content-${movie.id}">
        <a href="#" onclick="showEditPopup(${movie.id})">
    <img src="../img/pencil.png" alt="Edit Icon" width="20" height="20">Edit Movie
</a>
        <div class="options-divider"></div> <!-- Divider -->
        <a href="#" onclick="deleteMovie(${movie.id})">
            <img src="../img/trash.png" alt="Delete Icon" width="20" height="20">Delete Movie
        </a>
    </div>
</div>`;

	// Title and Year Container
	const titleAndYear = document.createElement('div');
	titleAndYear.classList.add('title-year');

	// Title
	const title = document.createElement('div');
	title.classList.add('card-title');
	title.innerHTML = `${movie.title}`;

	// Year
	const year = document.createElement('div');
	year.classList.add('card-year');
	year.textContent = `${movie.year}`;

	// Appending Options Button, Title, and Year to the Header
	titleAndYear.appendChild(title);
	titleAndYear.appendChild(year);
	header.appendChild(titleAndYear);

	// Body: Description and Rating Bar
	const body = document.createElement('div');
	body.classList.add('card-body');

	const description = document.createElement('div');
	description.classList.add("desc");
	description.textContent = movie.description;

	body.appendChild(description);


	// Footer: Genres
	const footer = document.createElement('div');
	footer.classList.add('card-footer');
	footer.innerHTML = `
        <div class="rating-split">
            <label>Rating</label>
            <label>${movie.rating}/10</label>
        </div>
    `;
	const ratingBar = document.createElement('div');
	ratingBar.classList.add('rating-bar');
	ratingBar.innerHTML = `<div class="rating-value" style="width: ${(movie.rating / 10) * 100}%;"></div>`;

	footer.appendChild(ratingBar);

	if (movie.genres) {
		const genresContainer = document.createElement('div');
		genresContainer.classList.add('card-genres-container');

		movie.genres.forEach(genre => {

			const genreBox = document.createElement('div');
			genreBox.classList.add('card-genres');
			genreBox.textContent = genre;
			genresContainer.appendChild(genreBox);
		});

		footer.appendChild(genresContainer);
	}

	// Append everything to the card
	card.appendChild(header);
	card.appendChild(body);
	card.appendChild(footer);

	return card;
};

const displayMovies = async (movies) => {
	const moviesContainer = document.querySelector('#movies-container');
	moviesContainer.innerHTML = '';
	movies.forEach(movie => {
		const movieCard = createMovieCard(movie);
		moviesContainer.appendChild(movieCard);
	});
};

const deleteMovie = async (movieId) => {
	try {
		const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			fetchMovies();
		} else {
			console.error('Failed to delete movie:', response.status);
		}
	} catch (error) {
		console.error('Error deleting movie:', error);
	}
};

const fetchMovies = () => {
	const loadingMessage = document.querySelector('#loading-message');
	loadingMessage.style.display = 'block';

	fetch('http://localhost:3000/movies')
		.then(response => response.json())
		.then(movies => {
			loadingMessage.style.display = 'none';
			displayMovies(movies);
		})
		.catch(error => console.error('Error fetching movies:', error));
};

const showEditPopup = async (movieId) => {
	const editPopup = document.getElementById('edit-popup');

	try {
		// Fetch the movie details using the movieId
		const response = await fetch(`http://localhost:3000/movies/${movieId}`);

		if (response.ok) {
			const movieDetails = await response.json();

			// Pre-fill input fields
			document.getElementById('edit-movie-id').value = movieDetails.id;
			document.getElementById('edit-title').value = movieDetails.title;
			document.getElementById('edit-year').value = movieDetails.year;
			document.getElementById('edit-description').value = movieDetails.description;
			document.getElementById('edit-rating').value = movieDetails.rating;
			// Add similar lines for other movie properties

			editPopup.style.display = 'block';
		} else {
			console.error('Failed to fetch movie details:', response.status);
		}
	} catch (error) {
		console.error('Error fetching movie details:', error);
	}
};


function closeEditPopup() {
	const editPopup = document.getElementById('edit-popup');
	editPopup.style.display = 'none';
}

const updateMovie = async () => {
	try {
		const editPopup = document.getElementById('edit-popup');
		const movieId = document.getElementById('edit-movie-id').value; // Get the movie ID from an input field
		const updatedTitle = document.getElementById('edit-title').value;
		const updatedYear = document.getElementById('edit-year').value;
		const updatedDescription = document.getElementById('edit-description').value;
		const updatedRating = document.getElementById('edit-rating').value;

		const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: updatedTitle,
				year: updatedYear,
				description: updatedDescription,
				rating: updatedRating,
				// Include other movie properties in the body
			}),
		});

		if (response.ok) {
			const updatedMovie = await response.json();
			closeEditPopup();
			fetchMovies(); // Refresh movie list
		} else {
			console.error('Failed to update movie:', response.status);
		}
	} catch (error) {
		console.error('Error updating movie:', error);
	}
};


const toggleOptionsDropdown = (event, movieId) => {
	event.stopPropagation();
	const dropdown = document.getElementById(`options-content-${movieId}`);
	dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};

document.addEventListener('click', () => {
	// Close all dropdowns when clicking outside
	document.querySelectorAll('.options-content').forEach((content) => {
		content.style.display = 'none';
	});
});
//Searchbar function
const searchMovies = async (query) => {
	try {
		const response = await fetch(`http://localhost:3000/movies?q=${query}`);
		if (response.ok) {
			const data = await response.json();
			displayMovies(data);
		} else {
			console.error('Failed to search movies:', response.status);
		}
	} catch (error) {
		console.error('Error searching movies:', error);
	}
};
// ... your existing JavaScript code ...

const openAddMoviePopup = () => {
	const addMoviePopup = document.getElementById('add-movie-popup');
	addMoviePopup.style.display = 'block';
};

const closeAddMoviePopup = () => {
	const addMoviePopup = document.getElementById('add-movie-popup');
	addMoviePopup.style.display = 'none';
};

const addMovie = async () => {
	const addMovieForm = document.getElementById('add-movie-form');
	const title = document.getElementById('add-title').value;
	const rating = parseFloat(document.getElementById('add-rating').value);

	// You can get values for other input fields here

	try {
		const response = await fetch('http://localhost:3000/movies', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				rating: rating,
				// Include other movie properties in the body
			}),
		});

		if (response.ok) {
			const newMovie = await response.json();
			closeAddMoviePopup();
			fetchMovies(); // Refresh movie list
		} else {
			console.error('Failed to add movie:', response.status);
		}
	} catch (error) {
		console.error('Error adding movie:', error);
	}
};

// ... rest of your JavaScript code ...





// Immediately Invoked Function Expression (IIFE)
(function () {
	document.addEventListener('DOMContentLoaded', () => {
		fetchMovies();
	});
	///For searchbar
	document.getElementById('search-bar').addEventListener('input', (event) => {
		const searchTerm = event.target.value.trim();
		searchMovies(searchTerm);
	});



})();