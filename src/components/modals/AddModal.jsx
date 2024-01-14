import React from 'react';
import { getBase64 } from '../../utils';
import { useDispatch } from 'react-redux';
import useAddMovie from '../../hooks/addMovie.hooks';
import { setModalAddOpen } from '../../redux/slices/modalSlice';

const AddModal = ({ isOpen }) => {

    const dispatch = useDispatch();
    const { addMovie } = useAddMovie();


    const onSave = async (e) => {
        e.preventDefault();
        const movie = {
            Title: e.target.title.value,
            Year: e.target.year.value,
            Poster: e.target.poster.files[0] ? await getBase64(e.target.poster.files[0]) : ''
        }
        addMovie(movie);

        // If there is a real API, we can use this code. If we use this code it will get the data from the API and set it to redux and will not show the data from the localstorage, resulting no UI change. So i'm just going set the data to localstorage and set it to redux. Check addMovie.hooks.jsx on the else block for more info.
        // fetchMovies();
    }

    const onClose = () => {
        dispatch(setModalAddOpen(false));
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-gray-200 rounded-lg p-4 z-[60] w-[400px] h-[400px]">
                        <h2 className="text-xl font-bold mb-4">Add Movie</h2>
                        <form className='flex flex-col gap-[24px]' onSubmit={(e) => onSave(e)}>
                            <div>
                                <div>
                                    <label className="block mb-2">Title</label>
                                    <input
                                        type="text"
                                        className="h-[35px] px-[12px] rounded-md border w-full"
                                        name='title'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Year</label>
                                    <input
                                        type="text"
                                        className="h-[35px] px-[12px] rounded-md border w-full"
                                        name='year'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Poster</label>
                                    <input
                                        type="file"
                                        className="h-[35px] rounded-md border w-full"
                                        name='poster'
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                            <div className='flex gap-[12px] items-center'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="text-blue-500 bg-white py-2 px-4 rounded"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddModal;
