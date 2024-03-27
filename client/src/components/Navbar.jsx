"use client"
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import Button from "./Button";
import Logo from "./Logo";
import ThemeSwitch from "./Switch";
import Link from "next/link";
import useStore from "@/store";



const MobileMenu = ({ user, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  {console.log(user)}
  return (
    <div className='flex '>
      <button
        onClick={toggleMenu}
        className='lg:hidden p-2 text-gray-600 hover:text-gray-800'
      >
        <img src="https://res.cloudinary.com/dqpjoki72/image/upload/v1710771648/avatar_xp9qzc.webp" alt="" />
      </button>
      {isMenuOpen && (
        <div className='fixed top-0 left-0 w-full h-fit bg-white dark:bg-[#020b19] z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-8'>
          <Logo />
          <ul className='flex flex-col gap-4 text-base text-black dark:text-gray-300'>
            <li onClick={toggleMenu}>
              <Link href='/'>Home</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href='/'>Contact</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href='/'>About</Link>
            </li>
          </ul>
          <div className='flex gap-2 items-center'>
            {user?.token ? (
              <div className='w-full flex  flex-col items-center justify-center '>
                <div className='flex gap-1 items-center mb-5'>
                  {user?.user.image ? (
                    <img
                      src={user?.user.image}
                      alt='Profile'
                      className='w-8 h-8 rounded-full'
                    />
                  ) : (
                    <span className='text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center'>
                     {console.log(user)}
                    </span>
                  )}
                  <span className='font-medium text-black dark:text-gray-500'>
                    {user?.user.name}
                  </span>
                </div>

                <button
                  className='bg-black dark:bg-rose-600 text-white dark:text-white px-8 py-1.5 rounded-full text-center outline-none'
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href='/sign-in'>
                <Button
                  label='Sign in'
                  styles='flex items-center justify-center bg-black dark:bg-rose-600 text-white dark:text-white text-white px-4 py-1.5 rounded-full'
                />
              </Link>
            )}
          </div>

          {/* theme switch */}
          <ThemeSwitch />

          <span
            className='cursor-pointer text-xl font-semibold dark:text-white'
            onClick={toggleMenu}
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, signOut } = useStore();
  const [showProfile, setShowProfile] = useState(false);

  

  return (
    <nav className='flex flex-col md:flex-row w-full py-5  items-center justify-between gap-4 md:gap-0'>
      

      <Logo />
      <div className='hidden md:flex gap-14 items-center'>
        <ul className='flex gap-8 text-inherit'>
          <Link href='/'>Home</Link>
          <Link href='/'>Contact</Link>
          <Link href='/'>About</Link>
        </ul>

        {/* theme switch */}
        <ThemeSwitch />

        <div className='flex gap-2 items-center cursor-pointer'>
          {/* {user?.token ? (
            <div
              className='relative'
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <div className='flex gap-1 items-center cursor-pointer'>
                {user?.user.image ? (
                  <img
                    src={user?.user.image}
                    alt='Profile'
                    className='w-8 h-8 rounded-full'
                  />
                ) : (
                  <span className='text-white w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center'>
                    {getInitials(user?.user.name)}
                  </span>
                )}
                <span className='font-medium text-black dark:text-gray-500'>
                  {user?.user?.name?.split(" ")[0]}
                </span>
              </div>

              {showProfile && (
                <div className='absolute bg-white dark:bg-[#2f2d30] py-6 px-6 flex flex-col shadow-2xl z-50 right-0 gap-3 rounded'>
                  <span className='dark:text-white'>Profile</span>
                  <span
                    className='border-t border-slate-300 text-rose-700'
                    onClick={handleSignOut}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link href='/sign-in'>
              <Button
                label='Sign in'
                styles='flex items-center justify-center bg-black dark:bg-rose-600 text-white dark:text-white px-4 py-1.5 rounded-full'
              />
            </Link>
          )} */}
          <AccountMenu />
        </div>
      </div>
      <div className='block md:hidden'>
        <MobileMenu user={user} signOut={handleSignOut} />
      </div>
    </nav>
  );
};

export default Navbar;
