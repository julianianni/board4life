import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Navbar from '../Navbar'

import AdminSingleProduct from './AdminSingleProduct'

function AdminProducts() {
  const history = useHistory()

  return (
    <div>
      <Navbar transparent={false} />
      <AdminSingleProduct />

      <button className='admin-table-button' onClick={() => history.goBack()}>
        Volver
      </button>
    </div>
  )
}

export default AdminProducts
