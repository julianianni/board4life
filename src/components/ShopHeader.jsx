import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getQuery } from '../state/products'

export default function ShopHeader() {
  const dispatch = useDispatch();
  return (
    <div className='container-fluid bg-dark'>
      <div className='row d-flex justify-content-between pt-5 ms-5'>
        <div className=' ms-5 col-4'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb textoBlanco amatic ms-5'>
              <li className='breadcrumb-item nonActive fs-2'>
                <Link to='/shop'>ALL</Link>
              </li>
            </ol>
          </nav>
        </div>
        <div className='d-flex col-4 justify-content-end me-5'>
        <div className="container d-flex flex-wrap justify-content-center">
        <form
          className="col-12 mb-3 form-content"
          onChange={({ target }) => dispatch(getQuery(target.value))}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </div>
          {/* <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <span className='me-1 descripcionAU'>Sort by</span> 
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li>
                <a className='dropdown-item descripcionAU' href='#'>
                  Price: Low to High
                </a>
              </li>
              <li>
                <a className='dropdown-item descripcionAU' href='#'>
                  Price: High to Low
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  )
}
