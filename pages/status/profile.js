import CardProfile from 'components/CardProfile'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import { getUsers } from 'service/users'

export default function Profile() {
  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsuarios(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <Layout>
      <div className='flex mobile:justify-center justify-start overflow-x-scroll'>
        <div className='min-w-[750px] pt-10'>
          <div className='grid place-content-center grid-cols-5 justify-items-center justify-center  bg-gray-800 grid-flow-row mb-3 py-4 font-light text-gray-500 rounded-lg '>
            <p>Nombre</p>
            <p>Mail</p>
            <p>Rol</p>
            <p>Contraseña</p>
            <p>Activo</p>
          </div>
          {usuarios.map((user) => (
            <CardProfile
              key={user.id}
              id={user.id}
              username={user.username}
              email={user.email}
              role={user.role}
              password={user.password}
              active={user.active}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
