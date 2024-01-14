import React from 'react';
import { useSelector } from 'react-redux';

const RequestQueue = () => {

    const requests = useSelector(state => state.request.requests)
    const postRequest = requests.filter(req => req.method === 'POST').length
    const deleteRequest = requests.filter(req => req.method === 'DELETE').length;

    return (
        <div className='min-w-screen sm:h-[25px] bg-red-500 text-white flex justify-center items-center gap-[12px]'>
            {
                postRequest > 0 ?
                    <p>Pending add movie: {postRequest}</p> :
                    ''
            }
            {
                deleteRequest > 0 ?
                    <p>Pending delete movie: {deleteRequest}</p> :
                    ''
            }
        </div>
    );
};

export default RequestQueue;
