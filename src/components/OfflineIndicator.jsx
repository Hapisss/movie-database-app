import React from 'react';

const OfflineIndicator = () => {
    return (
        <div className='min-w-screen sm:h-[25px] bg-gray-600 text-white flex justify-center items-center'>
            <p className='text-center'>You are currently offline. Please check your internet connection.</p>
        </div>
    );
};

export default OfflineIndicator;
