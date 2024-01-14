import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSearchMovie from '../hooks/searchMovie.hooks';

const Navbar = () => {
    const { searchMovie } = useSearchMovie();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='min-w-screen h-[75px] bg-sky-600 flex flex-wrap items-center sm:justify-between justify-center px-[24px] text-white'>
            <div className='hidden sm:flex items-center gap-[24px]'>
                <div className=''>
                    <Link to="/">All Movies</Link>
                </div>
                <div className=''>
                    <Link to="/watched">Watched Movies</Link>
                </div>
            </div>
            <div className='flex items-center'>
                <input type="text" placeholder="Search" className='bg-white border border-grey-50 rounded-md px-[12px] py-[6px] outline-none text-black' onChange={(e) => searchMovie(e.target.value)} />
                <button className='sm:hidden ml-[12px] bg-transparent border border-white rounded-md px-[12px] py-[6px] text-white' onClick={toggleMenu}>
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            <div className={`w-full absolute top-[75px] bg-sky-600 shadow ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className='flex flex-col items-center gap-[24px] py-[24px]'>
                    <div className=''>
                        <Link to="/">All Movies</Link>
                    </div>
                    <div className=''>
                        <Link to="/watched">Watched Movies</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
