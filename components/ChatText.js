import React from 'react'

export default function ChatText({ text, person }) {
  return (
    <div className='bg-gray-800 rounded-xl mx-3 mt-2'>
      <h1 className='font-thin text-[10px] p-1 text-gray-400'>{person}</h1>
      <p className='pl-2 pb-1 font-extralight text-sm'>{text}</p>
    </div>
  )
}
