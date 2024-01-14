import React, { useEffect } from 'react';
import useFetchMovie from '../hooks/fetchMovie.hooks';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { setModalAddOpen } from '../redux/slices/modalSlice';

const AllMovies = () => {
    const { fetchMovies } = useFetchMovie();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const loading = useSelector(state => state.status.loading);
    const error = useSelector(state => state.status.error);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className='mt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center px-8 md:px-16'>
                <h1 className='text-4xl md:text-6xl'>All Movies</h1>
                <button className='bg-sky-600 text-white py-3 px-6 rounded shadow mt-4 md:mt-0' onClick={() => dispatch(setModalAddOpen(true))}>Add Movie</button>
            </div>
            <div className='flex justify-center flex-wrap gap-8 p-8'>
                {
                    loading ? <h1 className='text-center text-4xl'>Loading...</h1> :
                        error ? <h1 className='text-center text-4xl'>{error}</h1> :
                            movies?.map((movie, index) => <MovieCard key={index} movie={movie} />)
                }
            </div>
        </div>
    );
};

export default AllMovies;
