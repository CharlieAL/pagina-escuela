import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

import { getUser } from '../service/credentials'
import { logOut } from '../service/logOut'

export default function Main() {
  const [user, setUser] = useState({})

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  const router = useRouter()

  return (
    <Layout user={user}>
      <h1>
        hola {user && user.username} tu gmail es {user.email}
      </h1>

      <p>tu rol es {user.role}</p>
      <button
        className='px-5 py-2 bg-red-300 m-5'
        onClick={() => {
          logOut()
          router.push('/login')
        }}
      >
        log out
      </button>
    </Layout>
  )
}
