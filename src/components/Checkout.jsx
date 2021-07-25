import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder } from '../utils/index'
import Navbar from './Navbar'
import Table from './Table'
import ShopState from './ShopState'
import { statusShopClass } from './../utils/globals'
import { changeShopState } from '../utils/changeIcons'
import main from '../utils/emailSent'
import { counterProducts } from '../state/Counter'

function Checkout() {
  const { cart, user, counter } = useSelector(state => state);
  const dispatch = useDispatch()
  const [medioDePago, setMedioDePago] = useState("mercadopago");
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});
  const history = useHistory();

  const handlePayment = e => {
    const { value } = e.target;
    setMedioDePago(value);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSumbit = e => {
    e.preventDefault();
    return confirmOrder({ ...order, userId: user.id })
      .then(()=> dispatch(counterProducts(0)))
      .then(() => history.push("/home"))
      .then(() => alert("Gracias por su compra"));
  };

  useEffect(() => {
    if (cart.Products) {
      const totalCart = cart.Products.reduce((acum, item) => {
        acum += item.price * item.CartItem.quantity
        return acum
      }, 0)
      setTotal(totalCart)
    }
    if (cart.Products && cart.Products.length !== 0)
      changeShopState({
        ...statusShopClass,
        id: 'status02',
      })
  }, [cart])
  return (
    <>
      <Navbar transparent={false} />

      <div className='container-fluid'>
        <div className='row mx-3 my-5'>
          <ShopState />
          <div className='col-8 bg-light border px-4'>
            <h1 className='form-label fs-4 text-center py-4'>
              <strong>Mis productos</strong>
            </h1>
            <Table items={cart.Products} user={cart.UserId} total={total} envio={500} />
          </div>
          <div className='col-4 bg-light border px-4'>
            <h1 className='form-label  fs-4 text-center py-4'>
              <strong>Informacion del pedido</strong>
            </h1>
            <form
              className='form-style justify-content-between'
              onChange={handleChange}
              // onSubmit={submitHandler}
            >
              <div className='mb-3'>
                <label htmlFor='telephone' className='form-label  fs-6'>
                  Telefono*
                </label>

                <input type="text" className="form-control  fs-6" id="telephone" name="telephone" />
              </div>
              <div className='mb-3'>
                <label htmlFor='address' className='form-label  fs-6'>
                  Direccion *
                </label>
                <input type="text" className="form-control " id="address" name="address" />
              </div>
              <div class='mb-3'>
                <label htmlFor='info' className='form-label  fs-6'>
                  Informacion adicional
                </label>
                <textarea
                  className='form-control  '
                  id='info'
                  name='additionalInfo'
                  rows='3'
                ></textarea>
              </div>

              <div class='mb-3'>
                <label htmlFor='info' className='form-label  fs-6 mx-2'>
                  Elegi un metodo de pago
                </label>

                <select
                  onChange={e => {
                    handlePayment(e);
                  }}
                  name='paymentMethod'
                  className='form-label  fs-6'
                >
                  <option value='mercadopago'>MercadoPago</option>
                  <option value='tarjeta'>Tarjeta</option>
                  <option value='contado'>Efectivo/Transferencia</option>
                </select>
                {medioDePago === 'contado' && (
                  <div className=' fs-6 rounded bg-info text-white p-3 my-3'>
                    <h5 className='text-center'>Datos bancarios</h5>
                    <p>
                      <strong>CBU:</strong> 129312498438294392
                    </p>
                    <p>
                      <strong>CUIT:</strong> 2099999999
                    </p>
                    <p>
                      <strong>Alias:</strong> p5test
                    </p>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-dark" onClick={handleSumbit}>
                Confirmar compra
              </button>
              <Link to="/shop">
                <button className="btn btn-dark my-5">Volver al shop</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
