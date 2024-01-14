import { useDispatch } from "react-redux";
import { resetModalDetail } from "../../redux/slices/modalSlice";

const DetailModal = ({ isOpen, movie }) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(resetModalDetail());
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-gray-200 rounded-lg z-[60] w-full sm:w-[768px] h-full sm:h-[500px] p-[24px] flex flex-col sm:flex-row gap-[24px] overflow-auto">
                        {
                            movie.Poster ? (
                                <div className="w-full sm:w-[300px] h-[400px]">
                                    <img
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ) : ''
                        }
                        <div className="flex flex-col justify-between">
                            <h2 className="text-xl font-bold">{movie.Title}</h2>
                            <div className="h-full overflow-auto">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni in nostrum quo adipisci labore inventore non? Est, officiis odio deleniti, fuga sit nulla, esse maiores assumenda excepturi modi numquam quos?
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-blue-500 bg-white py-2 px-4 rounded"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailModal;