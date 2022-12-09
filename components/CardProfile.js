import React, { useState } from 'react'
import { putTask } from 'service/task'
import putUser from 'service/user'
import InputText from './InputText'
import MyToggleButton from './ToggleButton'

export default function CardProfile({
  username,
  email,
  role,
  password,
  active,
  id
}) {
  const [datos, setDatos] = useState({
    id,
    username: username,
    email: email,
    role: role,
    active: active,
    password: password
  })
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setDatos({
      ...datos,
      [name]: value
    })
  }
  const handleClick = (e) => {
    setDatos({
      ...datos,
      active: !datos.active
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    putUser(datos)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='grid place-content-center grid-cols-5 justify-items-center justify-center  grid-flow-row mb-5'
    >
      <div className=''>
        <InputText
          name={'username'}
          value={username}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <InputText
          name={'email'}
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <select
          name='role'
          onChange={(e) => handleChange(e)}
          defaultValue={role}
          className='text-center bg-gray-900 text-gray-400 font-extralight'
        >
          {role === 'profesor' && (
            <>
              <option value='profesor'>Profesor</option>
              <option value='admin'>Admin</option>
              <option value='laboratorista'>Laboratorista</option>
              <option value='profesor/laboratorista'>
                Profesor / Laboratorista
              </option>
            </>
          )}
          {role === 'admin' && (
            <>
              <option value='admin'>Admin</option>
              <option value='profesor'>Profesor</option>
              <option value='Laboratorista'>Laboratorista</option>
              <option value='profesor/laboratorista'>
                Profesor / Laboratorista
              </option>
            </>
          )}
          {role === 'laboratorista' && (
            <>
              <option value='laboratorista'>Laboratorista</option>
              <option value='admin'>Admin</option>
              <option value='profesor'>Profesor</option>
              <option value='profesor/laboratorista'>
                Profesor / Laboratorista
              </option>
            </>
          )}
          {role === 'profesor/laboratorista' && (
            <>
              <option value='profesor/laboratorista'>
                Profesor / Laboratorista
              </option>
              <option value='admin'>Admin</option>
              <option value='profesor'>Profesor</option>
              <option value='laboratorista'>Laboratorista</option>
            </>
          )}
        </select>
      </div>
      <div>
        <InputText
          name={'password'}
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <MyToggleButton onClick={() => handleClick()} active={datos.active} />
      </div>
      <button type='submit'></button>
    </form>
  )
}
