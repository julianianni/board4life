import React, { useState } from 'react'
import { addUserToBD } from '../../utils/index'

function AddUser({ setNewProduct }) {
  const [user, setUser] = useState({})
  const handleChange = (e) => {
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addUserToBD(user).then(() => setNewProduct(false))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nombre'
          name='firstName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Apellido'
          name='lastName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='email'
          name='email'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
        <input
          checked
          placeholder='isAdmin'
          name='isAdmin'
          onChange={handleChange}
        />

        <button
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          confirmar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            setNewProduct(false)
          }}
        >
          cancelar
        </button>
      </form>
    </div>
  )
}

export default AddUser
