import Link from 'next/link'
import { useEffect, useState } from 'react'
import useTimeAgo from '../hook/useTimeAgo'

export default function CardTask({
  emailPara,
  nombreTask,
  status,
  comentarios,
  area,
  descripcion,
  onClick,
  diaEntrega
}) {
  const [color, setColor] = useState('bg-gray-500')
  useEffect(() => {
    if (status === 'pendiente') {
      setColor('bg-yellow-600')
    } else if (status === 'revisado') {
      setColor('bg-green-500')
    } else if (status === 'erroneo') {
      setColor('bg-[#e10]')
    } else if (status === 'devuelto') {
      setColor('bg-blue-500')
    }
  }, [status])
  const date = useTimeAgo(diaEntrega)
  return (
    <>
      <a
        onClick={onClick}
        className={`${color} min-w-[240px] w-[240px] mobile:my-5 m-1 mx-3 h-52 relative rounded-lg cursor-pointer snap-always snap-center`}
      >
        {/* card header */}
        <div className='absolute right-0 top-1 font-extralight text-sm  px-2'>
          {status === '' ? 'Asignado' : status}
        </div>
        <div className='absolute left-0 top-1 font-extralight text-sm  px-2'>
          {status !== 'revisado' && <p>{date}</p>}
        </div>
        <div className='pt-6 text-center font-bold  '>
          <div className='h-10 items-center text-center font-bold break-words '>
            <h1 className=''>{nombreTask}</h1>
          </div>
          <div className='border-dashed border-gray-200/25 border h-16 mx-2 rounded-md'>
            <p className='font-light text-sm p-1'>{descripcion}</p>
          </div>
          <p className='font-light text-sm'>{area}</p>
          <p className='font-light text-sm'>{emailPara}</p>
          <p className='font-light text-sm text-gray-300 pt-2'>
            {comentarios.length + ' '}
            comentarios
          </p>
        </div>
        {/* {status !== 'revisado' && (
          <div className='flex justify-between px-5'>
            <button className='text-red-600 font-bold'>Devolver</button>
            <button>aceptar</button>
          </div>
        )} */}
      </a>
    </>
  )
}
