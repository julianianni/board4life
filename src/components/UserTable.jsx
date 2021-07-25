import React from 'react'
import { Link } from 'react-router-dom'

function UserTable({ data }) {
  return (
    <table className='table' style={{ 'font-size': '25px' }}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((item) => {
            if (
              item !== 'createdAt' &&
              item !== 'updatedAt' &&
              item !== 'CartId'
            )
              return <th scope='col'>{item}</th>
          })}
          <th scope='col'>Productos</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const {
            id,
            state,
            address,
            date,
            paymentMethod,
            shipCost,
            telephone,
            additionalInfo,
            CartId,
          } = item
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{telephone}</td>
              <td>{address}</td>
              <td>{date.slice(0, 10)}</td>
              <td>{state}</td>
              <td>{shipCost}</td>
              <td>{paymentMethod}</td>
              <td>{additionalInfo}</td>
              <td>
                <Link to={`/orders/cart/${CartId}`}>ver productos</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UserTable
