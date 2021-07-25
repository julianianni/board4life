import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import CartTable from './CartTable'
import axios from 'axios'
import Navbar from './Navbar'

function CartProducts() {
  const history = useHistory()
  const { pathname } = useLocation()
  const lastChar = pathname.split('/')
  const userId = lastChar[lastChar.length - 1]
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(`/api/cart/mycart/${userId}`)
      .then((res) => res.data)
      .then((cart) => setData(cart.Products))
  }, [])

  return (
    <div>
      <Navbar transparent={false} />
      <CartTable data={data} />
      <button onClick={() => history.goBack()}>Go back</button>
    </div>
  )
}

export default CartProducts
