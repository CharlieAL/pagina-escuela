import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ButtonGreen, ButtonRed } from '../components/Button'
import { Input } from '../components/Input'
import Layout from '../components/Layout'
import useUser from '../hook/useUser'
import { Credentials, getUser } from '../service/credentials'

export default function Login() {
  const router = useRouter()
  const user = useUser()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    if (user) {
      router.push('/main')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await Credentials.post(credentials)
    if (response.status === 200) {
      router.push('/main')
    }
  }
  return (
    <Layout title={'Inicio de Sesion'}>
      <form className='flex-col justify-center' onSubmit={handleSubmit}>
        <div className='my-3'>
          <Input
            type={'email'}
            placeholder='email'
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='my-3'>
          <Input
            name='password'
            type={'password'}
            placeholder='password'
            onChange={handleChange}
          />
        </div>
        <div className='text-center'>
          <ButtonGreen>Save</ButtonGreen>
        </div>
      </form>
    </Layout>
  )
}
