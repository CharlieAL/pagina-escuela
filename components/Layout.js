import Head from 'next/head'
import React from 'react'
import NavBar from './NavBar'

export default function Layout({ children, user = '' }) {
  return (
    <>
      <Head>
        <title>UTN</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <NavBar user={user} />
      </div>
      <div className='grid place-items-center h-[80vh]'>
        <main>{children}</main>
      </div>
      <style jsx>{`
        main {
          height: 80vh;
          overflow-y: hidden;
          width: 100%;
        }
      `}</style>
    </>
  )
}
