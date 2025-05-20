const BASE_URL = "https://webp-project-one.vercel.app/api/movie";

export const fetchPopularMovies = async () => {
    const res = await fetch(`${BASE_URL}/popular`);
    const data = await res.json();
    return data.results;
};

export const fetchMovieDetail = async (movieId) => {
    const res = await fetch(`${BASE_URL}/detail/${movieId}`);
    const data = await res.json();
    return data;
};

export const searchMovie = async (query) => {
    const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results;
};
