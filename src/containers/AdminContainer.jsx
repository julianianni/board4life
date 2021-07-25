import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
function AdminContainer() {
  return (
    <div className='admin-view-container'>
      <Navbar transparent={false} />

      <Link to='/admin/productos'>Productos</Link>
      <Link to='/admin/users'>Usuarios</Link>
      <Link to='/admin/orders'>Ordenes de Compra</Link>
      <Link to='/admin/categories'>Categorias</Link>
    </div>
  )
}

export default AdminContainer
