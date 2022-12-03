import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUser } from '../service/credentials'
const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser() {
  const router = useRouter()
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    getUser().then((data) => setUser(data))
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/login')
  }, [user, router])

  return user
}
