import React, { useState } from 'react'
import { addOrderToBD } from '../../utils/index'

function AddOrder({ setNewProduct }) {
  const [order, setOrder] = useState({})
  const handleChange = (e) => {
    const { value, name } = e.target
    setOrder({ ...order, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addOrderToBD(order).then(() => setNewProduct(false))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Telefono'
          name='telephone'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Direccion_de_Envio'
          name='address'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Fecha'
          name='date'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Estado'
          name='state'
          onChange={handleChange}
        />
        <input
          placeholder='Costo de Envio'
          name='shipCost'
          onChange={handleChange}
        />
        <input
          placeholder='Medio_De_Pago'
          name='paymentMethod'
          onChange={handleChange}
        />
        <input
          placeholder='+ Info'
          name='additionalInfo'
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

export default AddOrder
