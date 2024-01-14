import React, { useEffect } from 'react';
import useFetchWatchedMovie from '../hooks/fetchWatchedMovie.hooks';
import { useSelector } from 'react-redux';
import WatchedMovieCard from '../components/WatchMovieCard';

const WatchedMovies = () => {

    const { fetchWatchedMovie } = useFetchWatchedMovie()
    const watchedMovies = useSelector(state => state.movies.watchedMovies)
    const loading = useSelector(state => state.status.loading)
    const error = useSelector(state => state.status.error)

    useEffect(() => {
        fetchWatchedMovie()
    }, [fetchWatchedMovie])

    return (
        <div className='mt-[24px]'>
            <h1 className='text-center text-[42px]'>Watched Movies</h1>
            {/* {loading && <p className='text-center'>Loading...</p>}
            {error && <p className='text-center'>{error}</p>} */}
            <div className='flex justify-center flex-wrap gap-[36px] p-[36px]'>

                {
                    loading ? <h1 className='text-center text-[42px]'>Loading...</h1> :
                        error ? <h1 className='text-center text-[42px]'>{error}</h1> :
                            watchedMovies === null || watchedMovies.length === 0 ?
                                <p className='text-center'>No movies watched yet</p>
                                : watchedMovies.map((movie, index) => (
                                    <WatchedMovieCard key={index} movie={movie} />
                                ))

                }
            </div>
        </div>
    );
};

export default WatchedMovies;
