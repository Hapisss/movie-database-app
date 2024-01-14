import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../redux/slices/statusSlice";
import { setWatchedMovieList } from "../redux/slices/movieSlice";

const useFetchWatchedMovie = () => {

    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const isConnectedRef = useRef(isConnected);

    const fetchWatchedMovie = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            if (isConnectedRef.current) {
                // This part will be very modified because i'm just getting the movies from the local storage
                // not like fetchMovie.hooks.js, but the real thing probably will be like this:
                // const response = await getWatchedMovie();
                // dispatch(setMovieList(response.data))
                // localStorage.setItem('watched', JSON.stringify(response.data));

                if (localStorage.getItem('watchedMovies') === null) {
                    localStorage.setItem('watchedMovies', JSON.stringify([]));
                }
                const response = localStorage.getItem('watchedMovies');
                dispatch(setWatchedMovieList(JSON.parse(response)));

                console.log(response)


            } else {
                const response = localStorage.getItem('watchedMovies');
                dispatch(setWatchedMovieList(JSON.parse(response)));
            }

            dispatch(setLoading(false));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }, [dispatch]);


    return { fetchWatchedMovie };
};

export default useFetchWatchedMovie;