import { useState } from 'react';
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);

    return (
        <div
            id='navigation-container'
            style={{ zIndex: 999 }}
            className={`${
                showSidebar ? 'hidden' : 'flex'
            } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
        >

            <div className='flex flex-col justify-center space-y-4'>
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{' '}
                </Link>

                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Shop</span>{' '}
                </Link>

                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Cart</span>{' '}
                </Link>

                <Link to='/favorite' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{' '}
                </Link>
            </div>

            <ul>
                <li>
                <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Login</span>{' '}
                </Link>
                </li>
                <li>
                <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Sign Up</span>{' '}
                </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
