import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../redux/slices/statusSlice";
import { setWatchedMovieList } from "../redux/slices/movieSlice";
import { setRequests } from "../redux/slices/requestSlice";

const useAddWatchedMovie = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const isConnectedRef = useRef(isConnected);
    const requests = useSelector(state => state.request.requests);

    useEffect(() => {
        // This is for checking if the user is online or offline, without rerendering when isConnected changes
        isConnectedRef.current = isConnected;
    }, [isConnected])

    const addWatchedMovie = useCallback(async (movie) => {

        dispatch(setLoading(true));
        try {
            if (isConnectedRef.current) {
                // I commented this out because I'm using localStorage instead of the API
                // But if you want to use the API, you can uncomment this and comment the localStorage code below

                // const response = await addWatchedMovie(movie);
                // if (response.status === 201) {
                // Do modal or something here
                // }

                if (localStorage.getItem('watchedMovies') === null) {
                    localStorage.setItem('watchedMovies', JSON.stringify([]));
                }

                const response = localStorage.getItem('watchedMovies');
                const parsedResponse = JSON.parse(response);
                if (!parsedResponse.some(m => m.Title === movie.Title)) {
                    parsedResponse.push(movie);
                    localStorage.setItem('watchedMovies', JSON.stringify(parsedResponse));

                } else {
                    alert('Movie already in the list');
                }

                // I added this dispatch to update the movie list in the redux store. So it will trigger the rerender in WatchedMovies.js
                dispatch(setWatchedMovieList(parsedResponse));
                dispatch(setLoading(false));
                dispatch(setError(null));

            } else {
                if (!requests.some(req => (req.flag === 'add_watched') && (req.data.Title === movie.Title))) {
                    // Generate random ID
                    const generateRandomId = () => {
                        const timestamp = Date.now();
                        const randomNum = Math.floor(Math.random() * 1000);
                        return `${timestamp}-${randomNum}`;
                    };

                    const req = {
                        id: generateRandomId(),
                        flag: 'add_watched',
                        method: 'POST',
                        processed: false,
                        data: movie
                    };

                    dispatch(setRequests([...requests, req]));
                    alert('Waiting for network connection to add movie to watched list');

                }
            }

            dispatch(setLoading(false));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }, [dispatch, requests]);

    return { addWatchedMovie };
};

export default useAddWatchedMovie;