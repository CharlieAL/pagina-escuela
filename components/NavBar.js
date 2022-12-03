import { useRouter } from 'next/router'
import React from 'react'
import { logOut } from '../service/logOut'
import { ButtonRed } from './Button'

export default function NavBar({ user = '' }) {
  const router = useRouter()
  return (
    <div className='flex flex-col'>
      {/* // <!-- Navbar --> */}
      <nav
        className='flex justify-around py-4 bg-white/5
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10'
      >
        {/* <!-- Logo Container --> */}
        <div className='flex items-center'>
          {/* <!-- Logo --> */}
          <a className='cursor-pointer'>
            <h3 className='text-2xl font-bold text-green-500'>U T N</h3>
          </a>
        </div>

        {/* <!-- Links Section --> */}
        {user && (
          <div className='items-center hidden space-x-8 lg:flex'>
            <a
              className='flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300'
            >
              Home
            </a>
            {user.role === 'admin' && (
              <>
                <a
                  className='flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300'
                >
                  Developers
                </a>
              </>
            )}
          </div>
        )}

        {/* <!-- Icon Menu Section --> */}
        <div className='flex items-center space-x-5'>
          {/* <!-- Register --> */}
          {/* <a
            className='flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300'
          >
            Register
          </a> */}

          {/* <!-- Login --> */}
          <button
            onClick={() => {
              logOut()
              router.push('/login')
            }}
            className='flex cursor-pointer transition-colors duration-300 font-semibold text-green-600'
          >
            {user && 'salir'}
          </button>
        </div>
      </nav>
    </div>
  )
}
