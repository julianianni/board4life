import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CartTable({ data }) {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const TotalReduce = data.reduce((acum, item) => {
      acum += item.CartItem.quantity * item.price
      return acum
    }, 0)
    setTotal(TotalReduce)
  }, [data])
  return (
    <>
      <h1>Mi compra</h1>
      <table className='table' style={{ 'font-size': '25px' }}>
        <thead>
          <tr>
            <th scope='col'>Producto</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Marca</th>
            <th scope='col'>Talle</th>
            <th scope='col'>Color</th>
            <th scope='col'>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const { id, brand, CartItem, color, name, picture, price, size } =
              item

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{CartItem.quantity}</td>
                <td>$ {price}</td>
                <td>{brand}</td>
                <td>{size}</td>
                <td>{color}</td>
                <td>$ {CartItem.quantity * price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h1>Total compra: $ {total}</h1>
    </>
  )
}

export default CartTable
