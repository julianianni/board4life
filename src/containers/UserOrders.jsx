import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import UserTable from '../components/UserTable'

export default function UserOrders() {
  const user = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios
      .get(`/api/order/misordenes/${user.id}`)
      .then((res) => res.data)
      .then((orders) => setOrders(orders))
  }, [user.id])

  return (
    <div>
      <Navbar transparent={false} />
      {orders.length ? (
        <div className='py-5 mx-2'>
        <UserTable data={orders}/>
        </div>
      ) : (
        <h1>You have no orders...</h1>
      )}
    </div>
  )
}
