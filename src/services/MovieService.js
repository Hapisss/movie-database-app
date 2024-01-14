import axios from "axios";
import { MOVIEAPI } from "../api/MovieApi";

export async function getMovies() {
    return await axios.get(MOVIEAPI).then((response) => {
        return response
    });
}

// All below functions are not available because there is no real API
// If there is a real API, we can use this function search movies by title
// And there is no ID in the dummy API, so i'm using title instead
export async function searchMovies(movieName) {
    const params = {
        title: movieName
    }
    return await axios.get(MOVIEAPI, { params }).then((response) => {
        return response
    });
}

// If there is a real API, we can use this function to add a movie
export async function addMovie(movie) {
    return await axios.post(MOVIEAPI, movie).then((response) => {
        return response
    });
}

// If there is a real API, we can use this function to delete a movie
export async function deleteMovie(id) {
    const params = {
        id: id
    }
    return await axios.delete(MOVIEAPI, { params }).then((response) => {
        return response
    });
}

// If there is a real API, we can use this function to add a movie to watchted list