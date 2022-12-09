import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import 'primereact/resources/themes/lara-dark-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
import { useState, useRef, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Input } from '../../components/Input'
import { getusers, postUser } from 'service/user'
import { getUser } from 'service/credentials'
import { useRouter } from 'next/router'
import { InputTextarea } from 'primereact/inputtextarea'
import { postTask } from 'service/task'

export default function UserPage() {
  // const [date, setDate] = useState('')
  const router = useRouter()

  const toast = useRef(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedRole2, setSelectedRole2] = useState(null)
  const [docentes, setDocentes] = useState([])
  const [datos, setDatos] = useState({
    nombre: '',
    nombreTask: '',
    emailPara: null,
    diaEntrega: '',
    area: '',
    descripcion: ''
  })
  useEffect(() => {
    getUser()
      .then((user) => {
        setDatos({ ...datos, nombre: user.username })
        if (user.role !== 'admin') {
          router.push('/')
        }
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    getusers()
      .then((res) => {
        const { data } = res
        const datos = data.filter((user) => {
          if (user.role !== 'admin') {
            return user
          }
          return
        })
        const users = datos.map((user) => {
          return { name: user.username, code: user.email, area: user.role }
        })
        setDocentes(users)
      })
      .catch((err) => console.log(err))
  }, [])

  const onRoleChange = (e) => {
    setSelectedRole(e.value)
    setDatos({ ...datos, emailPara: e.value.code, area: e.value.area })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { nombreTask, emailPara, diaEntrega, area, descripcion } = datos

    if (
      nombreTask === '' ||
      emailPara === null ||
      diaEntrega === '' ||
      area === '' ||
      descripcion === ''
    ) {
      showError('Todos los datos son obligatorios')
      return
    }

    postTask(datos)
      .then((res) => {
        setDatos({
          ...datos,
          nombreTask: '',
          emailPara: null,
          diaEntrega: '',
          area: '',
          descripcion: ''
        })
        setSelectedRole(null)
        showSuccess()
      })
      .catch((err) => {
        showError('Algo salio mal. Intetelo de nuevo')
        console.log(err)
      })
  }
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Bien',
      detail: 'Tarea creada con exito',
      life: 3000
    })
  }
  const showError = (text) => {
    toast.current.show({
      severity: 'error',
      summary: 'Mensaje Error',
      detail: text,
      life: 3000
    })
  }

  return (
    <Layout>
      <Toast ref={toast} />
      <div className='flex flex-col   h-[90vh] justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='bg-gray-800 mobile:w-1/3 w-full h-[560px] rounded-lg space-y-4 pt-10'
        >
          <div className='text-center'>
            <p className='font-extralight text-sm'>Nombre de la tarea</p>
            <Input
              value={datos.nombreTask}
              onChange={(e) =>
                setDatos({ ...datos, nombreTask: e.target.value })
              }
              placeholder='Nombre'
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>descripcion</p>
            <InputTextarea
              maxLength={55}
              placeholder='Caracteristicas de esa tarea'
              style={{
                backgroundColor: '#4B5563',
                fontSize: 15,
                fontWeight: 'lighter'
              }}
              value={datos.descripcion}
              onChange={(e) =>
                setDatos({ ...datos, descripcion: e.target.value })
              }
              rows={3}
              cols={30}
              autoResize
            />
          </div>

          <div className='text-center'>
            <p className='font-extralight text-sm'>para</p>
            <Dropdown
              style={{ backgroundColor: '#4B5563', fontWeight: 'lighter' }}
              value={selectedRole}
              options={docentes}
              onChange={onRoleChange}
              optionLabel='name'
              placeholder='Seleccionar un Docente'
              panelStyle={{ backgroundColor: '#4B5563', fontWeight: 'lighter' }}
            />
          </div>
          <div className='text-center'>
            <p className='font-extralight text-sm'>Dia de entrega</p>
            <Calendar
              inputStyle={{ backgroundColor: '#4B5563', fontWeight: 'lighter' }}
              id='buttonbar'
              value={datos.diaEntrega}
              onChange={(e) => setDatos({ ...datos, diaEntrega: e.value })}
              showButtonBar
              showIcon
              placeholder='Eliga la fecha'
              panelStyle={{ backgroundColor: '#4B5563', fontWeight: 'lighter' }}
              minDate={new Date()}
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
