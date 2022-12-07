import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import 'primereact/resources/themes/lara-dark-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
import { useState, useRef } from 'react'
import Layout from '../../components/Layout'
import { Input } from '../../components/Input'
import { postUser } from 'service/user'
export default function UserPage() {
  // const [date, setDate] = useState('')
  const toast = useRef(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [datos, setDatos] = useState({
    email: '',
    password: '',
    username: '',
    role: null,
    fechaDeSalida: ''
  })
  const roles = [
    { name: 'Administrador', code: 'admin' },
    { name: 'Profesor', code: 'profesor' },
    { name: 'Laboratorista', code: 'laboratorio' },
    { name: 'Profesor/Laboratorista', code: 'mixto' }
  ]

  const onRoleChange = (e) => {
    setSelectedRole(e.value)
    setDatos({ ...datos, role: e.value.code })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const { email, password, username, role, fechaDeSalida } = datos
    if (
      email === '' ||
      password === null ||
      username === '' ||
      role === '' ||
      fechaDeSalida === ''
    ) {
      showError('Todos los datos son obligatorios')
      return
    }

    postUser(datos)
      .then((res) => {
        setDatos({
          ...datos,
          username: '',
          fechaDeSalida: '',
          role: null,
          password: '',
          email: ''
        })
        setSelectedRole(null)
        showSuccess()
      })
      .catch((err) => {
        showError(err.response.data)
        console.log(err)
      })
  }
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Mensaje Exitoso',
      detail: 'Message Content',
      life: 3000
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
      <Toast ref={toast} style={{ width: 900, height: '5px' }} />
      <div className='flex h-[80vh] justify-center items-center'>
        {/* <Calendar
          id='buttonbar'
          value={date}
          onChange={(e) => setDate(e.value)}
          showButtonBar
        /> */}
        <form
          onSubmit={handleSubmit}
          className='bg-gray-800 mobile:w-1/3 w-full h-[500px] rounded-lg space-y-4 pt-10'
        >
          <div className='text-center'>
            <p className='font-extralight text-sm'>Nombre de Usuario</p>
            <Input
              id='buttonbar'
              value={datos.username}
              onChange={(e) => setDatos({ ...datos, username: e.target.value })}
              showButtonBar
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>Email</p>
            <Input
              id='buttonbar'
              type={'text'}
              value={datos.email}
              onChange={(e) => setDatos({ ...datos, email: e.target.value })}
              showButtonBar
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>Contraseña</p>
            <Input
              id='buttonbar'
              type={'text'}
              value={datos.password}
              onChange={(e) => setDatos({ ...datos, password: e.target.value })}
              showButtonBar
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>Rol para el usuario</p>
            <Dropdown
              value={selectedRole}
              options={roles}
              onChange={onRoleChange}
              optionLabel='name'
              placeholder='Seleccionar un Rol'
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>Fecha de Salida</p>
            <Calendar
              id='buttonbar'
              value={datos.fechaDeSalida}
              onChange={(e) => setDatos({ ...datos, fechaDeSalida: e.value })}
              showButtonBar
              showIcon
            />
          </div>
          <div className='text-center'>
            <button className='w-1/2 py-2 bg-green-500 rounded-lg'>
              Agregar
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .toast-demo button {
          min-width: 10rem;
          margin-right: 0.5rem;
        }

        @media screen and (max-width: 960px) {
          .toast-demo button {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </Layout>
  )
}
