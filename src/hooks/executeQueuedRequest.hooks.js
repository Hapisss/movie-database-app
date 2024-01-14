// hooks/useExecuteQueuedRequests.js

import { useEffect } from 'react';
import { clearRequests, markRequestAsProcessed } from '../redux/slices/requestSlice';
import useAddMovie from './addMovie.hooks';
import useDeleteMovie from './deleteMovie.hooks';
import { useDispatch, useSelector } from 'react-redux';
import useAddWatchedMovie from './addWatchedMovie.hooks';
import useDeleteWatchedMovie from './deleteWatchedMovie.hooks';


export const useExecuteQueuedRequests = () => {
    const { addMovie } = useAddMovie();
    const { deleteMovie } = useDeleteMovie();
    const { addWatchedMovie } = useAddWatchedMovie();
    const { deleteWatchedMovie } = useDeleteWatchedMovie();
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connection.isConnected);
    const requests = useSelector(state => state.request.requests);

    useEffect(() => {
        if (isConnected) {
            for (let i = 0; i < requests.length; i++) {
                const request = requests[i];

                // Preventing the loop from running when all of the sudden the user is offline again
                if (!isConnected) {
                    break;
                }

                // Check if the request hasn't been processed
                // If it has been processed, then skip it
                if (!request.processed) {
                    if (request.method === 'POST' && request.flag === 'add') {
                        // Add movie
                        addMovie(request.data);
                    } else if (request.method === 'DELETE' && request.flag === 'delete') {
                        // Delete movie
                        deleteMovie(request.data);
                    } else if (request.method === 'POST' && request.flag === 'add_watched') {
                        // Add watched movie
                        addWatchedMovie(request.data);
                    } else if (request.method === 'DELETE' && request.flag === 'delete_watched') {
                        // Delete watched movie
                        deleteWatchedMovie(request.data);
                    }

                    dispatch(markRequestAsProcessed(request.id));
                }
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    useEffect(() => {
        if (requests.length !== 0 && requests.every(req => req.processed)) {
            dispatch(clearRequests());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requests])
};