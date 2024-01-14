import { useCallback, useEffect, useRef } from 'react';
import { getMovies } from '../services/MovieService';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList } from '../redux/slices/movieSlice';
import { setError, setLoading } from '../redux/slices/statusSlice';

const useFetchMovie = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const isConnectedRef = useRef(isConnected);

    useEffect(() => {
        // This is for checking if the user is online or offline, without rerendering when isConnected changes
        isConnectedRef.current = isConnected;
    }, [isConnected])

    const fetchMovies = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            if (isConnectedRef.current) {
                const response = await getMovies();
                dispatch(setMovieList(response.data))
                localStorage.setItem('movies', JSON.stringify(response.data));
            } else {
                const response = localStorage.getItem('movies');
                dispatch(setMovieList(JSON.parse(response)))
            }

            dispatch(setLoading(false));
            dispatch(setError(null));
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
        }
    }, [dispatch]);


    return { fetchMovies };
};

export default useFetchMovie;
