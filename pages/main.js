import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CardTask from '../components/CardTask'
import Layout from '../components/Layout'
import MenuTask from '../components/MenuTask'

import { getUser } from '../service/credentials'
import { getTask } from '../service/task'

export default function Main() {
  const [user, setUser] = useState({})
  const [taks, setTaks] = useState([])
  const [selectTask, setSelectTask] = useState({})
  const [taskState, setTaskState] = useState(false)

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  useEffect(() => {
    getTask()
      .then((response) => (setTaks(response.data), console.log(response.data)))
      .catch((error) => console.log(error))
  }, [])

  function handleTask(data) {
    setTaskState(!taskState)
    if (!taskState) {
      setSelectTask(data)
    } else {
      setSelectTask({})
    }
  }

  return (
    <Layout user={user}>
      {taskState && (
        <div>
          <MenuTask
            onClick={handleTask}
            comentarios={selectTask.comentarios}
            status={selectTask.status}
          />
        </div>
      )}

      <div className='grid place-items-center '>
        <p className='px-5 py-2 font-light '>Pendientes o devueltos</p>
        <div className='flex w-[90%] h-96 overflow-x-auto bg-gray-800 rounded-lg pt-10'>
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
                />
              )
          )}
        </div>
      </div>

      <div className='grid place-items-center '>
        <p className='px-5 py-2 font-light '>Revisados</p>
        <div className='flex w-[90%] h-96 overflow-x-auto bg-gray-800 rounded-lg pt-10'>
          {taks.map(
            (data) =>
              data.status === 'revisado' && (
                <CardTask
                  key={data.emailPara}
                  emailPara={data.emailPara}
                  nombreTask={data.nombreTask}
                  status={data.status}
                  nombre={data.nombre}
                  comentarios={data.comentarios}
                  area={data.area}
                  descripcion={data.descripcion}
                  user={user}
                  onClick={() => handleTask(data)}
                />
              )
          )}
        </div>
      </div>
    </Layout>
  )
}
