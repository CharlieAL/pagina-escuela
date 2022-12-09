import { useState, useEffect } from 'react'

export default function MyToggleButton({ onClick, active }) {
  const light =
    ' bg-gray-500 text-white rounded-md text-center flex text-gray-800 border px-3 py-1 relative cursor-pointer'

  const dark =
    'bg-gray-800 flex text-center border border-gray-700 text-gray-400  px-3 py-1 rounded-md relative cursor-pointer'

  return (
    <a onClick={onClick} className={`${active ? light : dark}`}>
      {active ? 'Si' : 'No'}
    </a>
  )
}
