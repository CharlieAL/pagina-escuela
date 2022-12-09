import React from 'react'

export default function InputText({ value, name, onChange }) {
  return (
    <input
      className='text-center bg-gray-900 outline-none cursor-default focus:bg-gray-700 focus:py-1 focus:rounded-md text-gray-400 font-extralight '
      defaultValue={value}
      name={name}
      onChange={onChange}
    />
  )
}
