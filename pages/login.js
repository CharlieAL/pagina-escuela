import { useRouter } from 'next/router'
import 'primereact/resources/themes/lara-dark-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
import React, { useEffect, useState, useRef } from 'react'
import { ButtonGreen, ButtonRed } from '../components/Button'
import { Input } from '../components/Input'
import Layout from '../components/Layout'
import useUser from '../hook/useUser'
import { Credentials, getUser, post } from '../service/credentials'
import { Toast } from 'primereact/toast'

export default function Login() {
  const router = useRouter()
  const user = useUser()
  const toast = useRef(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  useEffect(() => {
    if (user) {
      router.push('/')
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
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = credentials
    if (email === '' || password === '') {
      showError('Datos Obligatorios')
      return
    }
    post(credentials)
      .then((res) => {
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        console.log('error')
        showError('Credenciales incorrectas')
      })
  }
  const showError = (text) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: text,
      life: 3000
    })
  }
  return (
    <Layout>
      <Toast ref={toast} />
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
          <ButtonGreen>Entrar</ButtonGreen>
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
