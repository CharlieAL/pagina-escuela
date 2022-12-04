import { useRouter } from 'next/router'
import React from 'react'
import { logOut } from '../service/logOut'
import { ButtonRed } from './Button'

export default function NavBar({ user = '' }) {
  const router = useRouter()
  return (
    <>
      <div className='flex flex-col'>
        {/* // <!-- Navbar --> */}
        <nav
          className='flex justify-around py-4 bg-white/5
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10'
        >
          {/* <!-- Logo Container --> */}
          <div className='flex items-center space-x-5'>
            {/* <!-- Logo --> */}
            <a className='cursor-pointer'>
              {user === '' ? (
                <h3 className='text-2xl font-bold   text-green-500'>
                  Universidad Tecnologica de Nogales
                </h3>
              ) : (
                <h3 className='text-2xl font-bold text-green-500'>U T N</h3>
              )}
            </a>
          </div>
          {/* <!-- Links Section --> */}
          {user && (
            <div className='items-center hidden space-x-8 lg:flex'>
              <a
                className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
              >
                Home
              </a>
              {user.role === 'admin' && (
                <>
                  <a
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  >
                    Crear una Tarea
                  </a>
                  <a
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  >
                    Crear un Usuario
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
            <a className='flex  hover:text-green-500 cursor-pointer transition-colors duration-300 items-center space-x-5 font-extralight text-gray-500 text-xs'>
              <h5 className='flex '>{user.username}</h5>
            </a>
            <p className='flex cursor-default transition-colors duration-300 items-center space-x-5 font-extralight text-gray-500 text-xs '>
              {user.role}
            </p>

            {/* <!-- Login --> */}
            <button
              onClick={() => {
                logOut()
                router.push('/login')
              }}
              className='flex cursor-pointer transition-colors duration-300 font-semibold text-red-600'
            >
              {user && 'salir'}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
