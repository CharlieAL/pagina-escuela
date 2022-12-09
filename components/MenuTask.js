import Link from 'next/link'
import ChatText from './ChatText'
import Formulario from './Formulario'
import 'primeicons/primeicons.css'
import { useEffect, useState, useRef } from 'react'
import { Toast } from 'primereact/toast'

import getComentarios from 'service/comentarios'
import { putComentarios, putTaskStatus } from 'service/task'

export default function MenuTask({
  onClick,
  // comentarios = [],
  status,
  user,
  fileName,
  taskId,
  type
}) {
  const bottomRef = useRef(null)
  const toast = useRef(null)
  const [value, setValue] = useState('')

  const [comentarios, setComentarios] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    getComentarios(taskId)
      .then((res) => {
        setComentarios(res.data)
        // setCoutBefore(res.data.length)
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleUpload(e, mensaje, nombre, id) {
    e.preventDefault()
    setUpdate(!update)
    comentarios.push({ nombre, mensaje })
    setValue('')
    const data = {
      comentarios,
      id
    }
    putComentarios(data)
      .then((res) => {})
      .catch((err) => console.log(err))
  }

  function pulsar(e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      handleUpload(e, value, user.username, taskId)
      return false
    }
  }

  function handleStatus(id, status) {
    const data = {
      id,
      status
    }
    putTaskStatus(data)
      .then((res) => onBasicUpload())
      .catch((err) => onBasicUploadError())
  }

  const onBasicUpload = (text) => {
    toast.current.show({
      severity: 'info',
      summary: 'Exelente',
      detail: 'Se modifico correctamente'
    })
  }

  return (
    <>
      <div id='menuContainer' className='z-20 overflow-hidden '>
        <Toast ref={toast} />
        <section className='bg-gray-900 shadow-xl w-full mobile:w-3/4  h-3/4 relative  '>
          <div className='absolute top-1 left-1'>
            <button onClick={onClick}>❌</button>
          </div>

          <div className='flex mobile:flex-row flex-col justify-between '>
            {user.role === 'admin' ? (
              <div className=' mobile:w-[50%] w-full mobile:h-[420px] h-[200px] mobile:border-r mobile:border-b-0 border-b'>
                <div className='flex flex-col mobile:h-96 h-36 items-center justify-center '>
                  {fileName ? (
                    fileName === 'cargando' ? (
                      <div className='flex items-center space-x-2 pt-5'>
                        <p className='font-light text-gray-400'>Cargando</p>
                        <i
                          className='pi pi-spin pi-spinner text-gray-400'
                          style={{ fontSize: '2em' }}
                        ></i>
                      </div>
                    ) : (
                      <>
                        <p className='pb-4 font-extralight text-gray-300'>
                          Descargar
                        </p>
                        <Link
                          href={fileName}
                          download
                          className='bg-blue-500 py-2 px-6 rounded-lg'
                        >
                          <div className='flex items-center space-x-2 justify-center'>
                            <p className='text-center'>{type} </p>
                            <i
                              className='pi pi-download
                          items-center'
                              style={{ fontSize: '20px' }}
                            ></i>
                          </div>
                        </Link>
                      </>
                    )
                  ) : (
                    <div className='flex items-center space-x-2 pt-5'>
                      <p className='font-light text-gray-400'>
                        Aun no hay archivo
                      </p>
                      <i
                        className='pi pi-file text-gray-400'
                        style={{ fontSize: '1em' }}
                      ></i>
                    </div>
                  )}
                </div>
                {status !== 'revisado' &&
                user.role === 'admin' &&
                status !== '' &&
                status !== 'devuelto' ? (
                  <div className='flex justify-around  pt-3 '>
                    <button
                      onClick={() => handleStatus(taskId, 'devuelto')}
                      className='mobile:py-1 text-red-500 mobile:text-white mobile:px-4 mobile:bg-red-500/30 mobile:hover:bg-red-500/70 mobile:font-light font-bold  rounded-lg'
                    >
                      Devolver
                    </button>
                    <button
                      onClick={() => handleStatus(taskId, 'revisado')}
                      className='mobile:py-2 text-green-500 mobile:text-white  mobile:px-5 mobile:bg-green-500/30 mobile:hover:bg-green-500/70 mobile:font-light font-bold rounded-lg'
                    >
                      aceptar
                    </button>
                  </div>
                ) : status !== '' ? (
                  <div className='text-center'>
                    <button
                      onClick={() => handleStatus(taskId, 'pendiente')}
                      className='mobile:py-1 text-red-500 mobile:text-white mobile:px-4 mobile:bg-red-500/30 mobile:hover:bg-red-500/70 mobile:font-light font-bold  rounded-lg'
                    >
                      cancelar
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : status === 'devuelto' || status === '' ? (
              <Formulario id={taskId} />
            ) : status !== 'revisado' ? (
              <div className='flex items-center justify-center mobile:w-[50%] w-full mobile:h-[500px] h-[100px] space-x-4'>
                <p className='text-center text-gray-400 font-light'>
                  Esperado respuesta del Admin
                </p>
                <i
                  className='pi pi-spin pi-spinner
                        items-center text-gray-400'
                  style={{ fontSize: '20px' }}
                ></i>
              </div>
            ) : (
              <div className='flex items-center justify-center mobile:w-[50%] w-full mobile:h-[500px] h-[200px] space-x-4'>
                <p className='text-center text-gray-400 font-light'>
                  Tarea Completada
                </p>
                <i
                  className='pi pi-thumbs-up-fill
                        items-center text-gray-400'
                  style={{ fontSize: '20px' }}
                ></i>
              </div>
            )}
            <form
              onSubmit={(e) => {
                handleUpload(e, value, user.username, taskId)
              }}
              className='flex overflow-y-hidden justify-center items-end pb-10 mobile:w-[50%] w-full mobile:h-[500px] h-[440px] relative mt-5'
            >
              {comentarios.length === 0 && (
                <div className='absolute flex flex-row items-center  space-x-2 top-3'>
                  <p className='text-center text-gray-400 font-extralight'>
                    Agrega un comentario
                  </p>
                  <i
                    className='pi pi-comment text-gray-400 font-extralight'
                    style={{ fontSize: '20px' }}
                  ></i>
                </div>
              )}
              <div className='flex flex-col absolute top-0 mobile:h-[400px] overscroll-y-contain overflow-y-auto h-[325px] w-full'>
                {comentarios?.map((data, index) => (
                  <div key={index}>
                    <ChatText person={data.nombre} text={data.mensaje} />
                  </div>
                ))}
              </div>
              <div className='flex flex-row items-center space-x-1'>
                <textarea
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  cols={30}
                  rows={2}
                  onKeyUp={pulsar}
                  className='ml-1 rounded-lg w-full py-2 border-none outline-none break-words font-thin resize-none px-2 text-sm'
                ></textarea>
                <button className='h-10 right-2 top-1 bg-blue-500 py-1 px-2 font-thin rounded-lg '>
                  enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <style jsx>{`
        #menuContainer {
          height: 90vh;
          width: 100%;
          border-radius: 5px;
          display: flex;
          position: absolute;
          backdrop-filter: blur(3px);
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}
