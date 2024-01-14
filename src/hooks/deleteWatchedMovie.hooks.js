import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../redux/slices/statusSlice";
import { setWatchedMovieList } from "../redux/slices/movieSlice";
import { setRequests } from "../redux/slices/requestSlice";

const useDeleteWatchedMovie = () => {

    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const isConnectedRef = useRef(isConnected);
    const requests = useSelector(state => state.request.requests);

    useEffect(() => {
        // This is for checking if the user is online or offline, without rerendering when isConnected changes
        isConnectedRef.current = isConnected;
    }, [isConnected])

    const deleteWatchedMovie = useCallback(async (title) => {
        dispatch(setLoading(true));
        try {
            if (isConnectedRef.current) {
                // I commented this out because I'm using localStorage instead of the API

                // const response = await deleteMovie(id);
                // if (response.status === 200) {
                //     dispatch(setError(null));
                //     dispatch(setLoading(false));
                // }

                // Delete item from localStorage by ID
                const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
                const updatedMovies = watchedMovies.filter(movie => movie.Title !== title);
                localStorage.setItem('watchedMovies', JSON.stringify(updatedMovies));

                // Set it to redux so UI change
                dispatch(setWatchedMovieList(updatedMovies))

                // Should call fetchMovie if there is real API


            } else {
                if (!requests.some(req => (req.flag === 'delete_watched') && (req.data.Title === title))) {
                    // Generate random ID
                    const generateRandomId = () => {
                        const timestamp = Date.now();
                        const randomNum = Math.floor(Math.random() * 1000);
                        return `${timestamp}-${randomNum}`;
                    };

                    const req = {
                        id: generateRandomId(),
                        flag: 'delete_watched',
                        method: 'DELETE',
                        processed: false,
                        data: title
                    };

                    dispatch(setRequests([...requests, req]));
                    dispatch(setError(null));
                    dispatch(setLoading(false));
                    alert('Waiting for network connection to delete movie');
                }
            }

            dispatch(setLoading(false));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }, [dispatch, requests]);


    return { deleteWatchedMovie };
};

export default useDeleteWatchedMovie;