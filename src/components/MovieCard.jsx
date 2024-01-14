import React from 'react';
import { setModalDetail } from '../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';
import useDeleteMovie from '../hooks/deleteMovie.hooks';
import useAddWatchedMovie from '../hooks/addWatchedMovie.hooks';

const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();
    const { deleteMovie } = useDeleteMovie();
    const { addWatchedMovie } = useAddWatchedMovie();

    return (
        <div className='flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md sm:w-[300px] h-[510px]'>
            <div className='w-full h-[450px] group relative'>
                <div className='bg-black opacity-0 group-hover:opacity-50 rounded-t-lg transition-all duration-300 w-full h-[445px] absolute top-0 left-0'></div>
                <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 w-full h-full absolute top-0 left-0 flex items-center justify-center flex-col gap-[24px]'>
                    <button className='bg-sky-600 text-white w-[88px] h-[48px] rounded shadow' onClick={() => addWatchedMovie(movie)}>Watched</button>
                    <button className='bg-red-600 text-white w-[88px] h-[48px] rounded shadow' onClick={() => deleteMovie(movie.Title)}>Delete</button>
                    <button className='bg-transparent text-sky-300 underline w-[88px] h-[48px] rounded' onClick={() => dispatch(setModalDetail({ open: true, movie: movie }))}>Detail</button>
                </div>
                <img src={movie.Poster} alt={movie.Title} className='bg-gray-500' width={300} height={450} />
            </div>
            <div className='flex flex-col items-center justify-center h-[60px]'>
                <h2 className='text-xl'>{movie.Title}</h2>
                <p className='text-sm'>{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;