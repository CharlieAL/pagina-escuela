import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getUser } from '../service/credentials'
import { logOut } from '../service/logOut'
import { ButtonRed } from './Button'

export default function NavBar() {
  const [user, setUser] = useState({})
  useEffect(() => {
    getUser().then(setUser)
  }, [])
  const router = useRouter()
  return (
    <>
      <div className='flex flex-col '>
        {/* // <!-- Navbar --> */}
        <nav
          className='flex justify-around py-4 bg-white/5
            backdrop-blur-md shadow-md w-full
             top-0 left-0 right-0 z-40'
        >
          {/* <!-- Logo Container --> */}
          <div className='flex items-center space-x-5'>
            {/* <!-- Logo --> */}
            <a className='cursor-pointer'>
              <h3 className='text-2xl absolute top-3 mobile:left-10 left-2 font-bold text-green-500'>
                U T N
              </h3>
            </a>
          </div>
          {/* <!-- Links Section --> */}
          {user.username && (
            <div className='items-center  space-x-3 flex'>
              <Link
                href={'/'}
                className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
              >
                Home
              </Link>
              {user.role === 'admin' ? (
                <>
                  <Link
                    href={'/compose/task'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  >
                    Crear una Tarea
                  </Link>
                  <Link
                    href={'/compose/user'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  >
                    Crear un Usuario
                  </Link>
                </>
              ) : (
                <>
                  <a
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  ></a>
                  <Link
                    href={'/compose/user'}
                    className='flex text-gray-400 hover:text-green-500
                    cursor-pointer transition-colors duration-300 font-extralight text-xs'
                  ></Link>
                </>
              )}
            </div>
          )}

          {/* <!-- Icon Menu Section --> */}
          <div className='mobile:flex hidden items-center space-x-5'>
            {/* <!-- Register --> */}
            {/* <a
            className='flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300'
          >
            Register
          </a> */}
            <a className='flex  hidd hover:text-green-500 cursor-pointer transition-colors duration-300 items-center space-x-5 font-extralight text-gray-500 text-xs'>
              <h5 className='flex '>{user.username}</h5>
            </a>
            <p className='flex cursor-default transition-colors duration-300 items-center space-x-5 font-extralight text-gray-500 text-xs '>
              {user.role}
            </p>

            {/* <!-- Login --> */}
            <button
              onClick={() => {
                logOut()
                  .then(() => router.push('/login'))
                  .catch(router.push('/login'))
              }}
              className='flex cursor-pointer transition-colors duration-300 font-semibold text-red-600'
            >
              {user.role && 'salir'}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
