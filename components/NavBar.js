import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getUser } from '../service/credentials'
import { logOut } from '../service/logOut'
import { ButtonRed } from './Button'

export default function NavBar({ user = '' }) {
  const router = useRouter()
  async function handleLogout(params) {
    try {
      await logOut()
      router.push('/login')
    } catch (error) {
      router.push('/login')
    }
  }
  return (
    <>
      <div className='flex flex-col relative '>
        {/* // <!-- Navbar --> */}
        <nav
          className='flex justify-around h-16  bg-white/5
            backdrop-blur-md shadow-md w-full
             top-0 left-0 right-0 z-40 '
        >
          {/* <!-- Logo Container --> */}
          <div className='absolute items-center  top-4 left-2 mobile:left-10 lg:flex hidden '>
            {/* <!-- Logo --> */}
            <a className='cursor-pointer'>
              <h3 className='text-2xl  le font-bold text-green-500 '>U T N</h3>
            </a>
          </div>
          {/* <!-- Links Section --> */}
          {user && (
            <div className='flex flex-row items-center mobile:ml-10 ml-2 justify-start mobile:w-[540px]  space-x-6 w-full'>
              <Link
                href={'/'}
                className=' text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extrabold mobile:text-sm text-xs'
              >
                Menu
              </Link>
              {user.role === 'admin' ? (
                <>
                  <Link
                    href={'/compose/user'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight mobile:text-sm text-xs'
                  >
                    Nuevo U
                  </Link>
                  <Link
                    href={'/compose/task'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight mobile:text-sm text-xs'
                  >
                    Nuevo T
                  </Link>

                  <Link
                    href={'/status/profile'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight mobile:text-sm text-xs'
                  >
                    Usuarios
                  </Link>
                  <p
                    className='mobile:flex hidden text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight mobile:text-sm text-xs'
                  >
                    {user.username} / {user.role}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          )}

          {/* <!-- Icon Menu Section --> */}
          <div className='mobile:flex hidden items-center space-x-5 relative'>
            {/* <!-- Register --> */}
            {/* <a
            className='flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300'
          >
            Register
          </a> */}

            {/* <!-- Login --> */}
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className=' absolute mobile:right-10 right-1 top-5  cursor-pointer transition-colors duration-300 font-semibold px-3 rounded-sm bg-red-600 mobile:text-lg'
            >
              salir
            </button>
          )}
        </nav>
      </div>
    </>
  )
}
