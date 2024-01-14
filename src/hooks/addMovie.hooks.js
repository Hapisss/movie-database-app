import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { setError, setLoading } from "../redux/slices/statusSlice";
import { setMovieList } from "../redux/slices/movieSlice";
import { setRequests } from "../redux/slices/requestSlice";
import { setModalAddOpen } from "../redux/slices/modalSlice";

const useAddMovie = () => {

    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const requests = useSelector(state => state.request.requests);
    const isConnectedRef = useRef(isConnected);

    useEffect(() => {
        // This is for checking if the user is online or offline, without re-running addMovie when isConnected changes
        isConnectedRef.current = isConnected;
    }, [isConnected])

    const addMovie = useCallback(async (movie) => {
        dispatch(setLoading(true));

        try {
            if (isConnectedRef.current) {
                // I commented this out because I'm using localStorage instead of the API
                // But if you want to use the API, you can uncomment this and comment the localStorage code below

                // const response = await addMovie(movie);
                // if (response.status === 201) {
                //     dispatch(setModalOpen(false));
                //     dispatch(setError(null));
                //     dispatch(setLoading(false));
                // }

                const response = localStorage.getItem('movies');
                const parsedResponse = JSON.parse(response);
                parsedResponse.push(movie);
                localStorage.setItem('movies', JSON.stringify(parsedResponse));

                // I added this dispatch to update the movie list in the redux store. So it will trigger the rerender in AllMovies.js
                dispatch(setMovieList(parsedResponse));

                dispatch(setModalAddOpen(false));
                dispatch(setError(null));
                dispatch(setLoading(false));
            } else {
                if (!requests.some(req => (req.flag === 'add') && (req.data.Title === movie.Title))) {
                    // Generate random ID
                    const generateRandomId = () => {
                        const timestamp = Date.now();
                        const randomNum = Math.floor(Math.random() * 1000);
                        return `${timestamp}-${randomNum}`;
                    };

                    const req = {
                        id: generateRandomId(),
                        flag: 'add',
                        method: 'POST',
                        processed: false,
                        data: movie
                    }

                    dispatch(setRequests([...requests, req]));
                    dispatch(setModalAddOpen(false));
                    dispatch(setError(null));
                    dispatch(setLoading(false));
                    alert('Waiting for network connection to add movie');
                }
            }

        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }, [dispatch, requests]);

    return { addMovie };
};

export default useAddMovie;
