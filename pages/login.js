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
    <Layout>
      <form className='pt-44' onSubmit={handleSubmit}>
        <div className='text-center  '>
          <h1 className='text-6xl font-extrabold text-green-600 font-serif'>
            UTN
          </h1>
        </div>
        <div className='my-3 text-center '>
          <Input
            type={'email'}
            placeholder='email'
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='my-3 text-center'>
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
      <div className='flex justify-center'>
        <p className='w-60 text-center break-words font-extralight text-[12px] text-gray-400 pt-16'>
          su cuenta permanesera abierta en este dispositivo, usted tendra salir
        </p>
      </div>
    </Layout>
  )
}
