import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getusers } from 'service/user'
import CardTask from '../components/CardTask'
import Layout from '../components/Layout'
import MenuTask from '../components/MenuTask'

import { getUser } from '../service/credentials'
import getFile from '../service/getFile'
import { getTask, putTask } from '../service/task'

export default function Main() {
  const [user, setUser] = useState({})
  const [taks, setTaks] = useState([
    {
      id: 'dasdsadasdsadasd',
      nombreTask: 'CARGANDO',
      emailPara: 'charlie@utn.com',
      diaEntrega: '2022-12-13T07:00:00.000Z',
      status: '',
      descripcion: 'Extrallendo los datos',
      comentarios: []
    }
  ])
  const [flag, setFlag] = useState([])
  const [toggle, setToggle] = useState(false)
  const [selectTask, setSelectTask] = useState({})
  const [taskState, setTaskState] = useState(false)
  const [fileName, setFileName] = useState('cargando')
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  useEffect(() => {
    getTask()
      .then((response) => {
        const { data } = response
        const task = data.filter((data) => {
          if (user.role !== 'admin') {
            if (data.emailPara === user.email) {
              return data
            } else {
              return null
            }
          }
          return data
        })
        setTaks(task)
        setFlag(task)
      })
      .catch((error) => console.log(error))
  }, [user.email, user.role, taskState])

  function handleTask(data) {
    setTaskState(!taskState)
    if (!taskState) {
      setSelectTask(data)
      if (user.role === 'admin') {
        getFile(data.fileName)
          .then((res) => {
            setFileName(data.fileName)
          })
          .catch((err) => {
            console.log(err)
            setFileName(false)
          })
      }
    } else {
      setSelectTask({})
      setFileName('cargando')
    }
  }

  function filtro(text) {
    if (taks.length === 0) {
      setToggle(!toggle)
    }
    if (toggle) {
      setTaks(flag)
      setToggle(!toggle)
      return
    }
    const task = taks.filter((data) => {
      if (data.status == text) {
        setToggle(!toggle)
        return data
      } else if (text === 'todo') {
        setToggle(!toggle)
      }
    })
    setTaks(task)
  }

  return (
    <Layout user={user}>
      {taskState && (
        <div>
          <MenuTask
            onClick={handleTask}
            comentarios={selectTask.comentarios}
            status={selectTask.status}
            fileName={fileName}
            taskId={selectTask.id}
            user={user}
          />
        </div>
      )}
      <div className='flex items-center justify-start space-x-3 ml-8 '>
        <button
          onClick={() => filtro('pendiente')}
          className='text-yellow-500  font-extralight'
        >
          Pendientes
        </button>
        <button
          onClick={() => filtro('devuelto')}
          className='text-blue-400  font-extralight'
        >
          Devueltos
        </button>
        <button
          onClick={() => filtro('')}
          className='text-gray-300  font-extralight'
        >
          {user.role === 'admin' ? 'No enviandos' : 'Asignados'}
        </button>
      </div>
      <div className='grid place-items-center '>
        <div className='flex justify-between w-[90%] h-80 snap-x snap-mandatory overscroll-x-contain overflow-x-scroll bg-gray-800 rounded-lg pt-10'>
          {taks.map(
            (data) =>
              data.status !== 'revisado' && (
                <CardTask
                  key={data.id}
                  emailPara={data.emailPara}
                  nombreTask={data.nombreTask}
                  status={data.status}
                  nombre={data.nombre}
                  comentarios={data.comentarios}
                  area={data.area}
                  descripcion={data.descripcion}
                  user={user}
                  onClick={() => handleTask(data)}
                  diaEntrega={data.diaEntrega}
                />
              )
          )}
        </div>
      </div>

      <div className='grid place-items-center '>
        <p className='px-5 py-2 font-light '>Revisados</p>
        <div className='flex w-[90%] h-[25opx] overflow-x-auto bg-gray-800 rounded-lg py-2'>
          {flag.map(
            (data) =>
              data.status === 'revisado' && (
                <CardTask
                  key={data.id}
                  emailPara={data.emailPara}
                  nombreTask={data.nombreTask}
                  status={data.status}
                  nombre={data.nombre}
                  comentarios={data.comentarios}
                  area={data.area}
                  descripcion={data.descripcion}
                  user={user}
                  onClick={() => handleTask(data)}
                  diaEntrega={data.diaEntrega}
                />
              )
          )}
        </div>
      </div>
    </Layout>
  )
}
