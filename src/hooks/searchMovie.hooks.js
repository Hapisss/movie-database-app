import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieList } from "../redux/slices/movieSlice";
import { searchMovies } from "../services/MovieService";
import { setError, setLoading } from "../redux/slices/statusSlice";

const useSearchMovie = () => {

    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);

    const searchMovie = useCallback(async (movieName) => {
        if (movieName.length >= 3 || movieName.length === 0) {
            dispatch(setLoading(true));
            try {
                // There is no real API, so I switched the isConnected to false so it can search in the local storage
                // But if there is a real API, we can use this function search movies by title
                if (!isConnected) { //Should be isConnected when there is a real API
                    const response = await searchMovies(movieName);
                    dispatch(setMovieList(response.data));
                    localStorage.setItem('movies', JSON.stringify(response.data));
                } else {
                    const response = localStorage.getItem('movies');
                    const parsedResponse = JSON.parse(response);
                    dispatch(setMovieList(parsedResponse.filter(movie => movie.Title.toLowerCase().includes(movieName.toLowerCase()))));
                }

                dispatch(setLoading(false))
                dispatch(setError(null));
            } catch (error) {
                dispatch(setError(error.message));
                dispatch(setLoading(false));
            }
        }
    }, [dispatch, isConnected]);

    return { searchMovie };
};

export default useSearchMovie;
