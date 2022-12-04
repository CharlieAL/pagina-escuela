import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CardTask({
  emailPara,
  nombreTask,
  status,
  nombre,
  comentarios,
  area,
  descripcion,
  user,
  onClick
}) {
  const [color, setColor] = useState('bg-gray-900')
  useEffect(() => {
    if (status === 'pendiente') {
      setColor('bg-yellow-600')
    } else if (status === 'revisado') {
      setColor('bg-green-500')
    } else if (status === 'noEntregado') {
      setColor('bg-[#e10]')
    } else {
      setColor('bg-blue-500')
    }
  }, [status])

  return (
    <>
      <button
        onClick={onClick}
        className={`${color} mx-2 w-60 h-48 relative rounded-lg`}
      >
        {/* card header */}
        <div className='absolute right-0 font-extralight text-sm  px-2'>
          {status}
        </div>
        <div className='pt-6 text-center font-bold break-words '>
          <h1>{nombreTask}</h1>
          <p className='font-light text-sm p-2'>
            {descripcion} asdasdasdasdlnfaldnflansflasnlfnlasnflasnfl
          </p>
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
      </button>
    </>
  )
}
