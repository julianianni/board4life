import React, { useEffect, useState } from 'react'
import { addProduct } from '../../utils/index'
import { getAllCategoriesfromBD } from '../../utils/index'
const arr = []

function AddProduct({ setNewProduct }) {
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState([])

  // este useEffect es para traer todas las categorias y poder utilizarlos en el select del form
  useEffect(() => {
    getAllCategoriesfromBD().then((categories) => setCategories(categories))
  }, [])

  const handleChange = (e) => {
    const { value, name } = e.target
    console.log(name)
    if (name === 'picture') setProduct({ ...product, picture: Array(value) })
    else {
      setProduct({ ...product, [name]: value })
    }
  }

  const handleOnclick = (e) => {
    const { value, name } = e.target
    if (arr.includes(value)) {
      for (var i = arr.length; i--; ) {
        if (arr[i] === value) {
          arr.splice(i, 1)
        }
      }
    } else {
      arr.push(value)
    }

    setProduct({ ...product, categorias: arr })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(' PRODUCTOS  CREADOOOO-->>', product)
    addProduct(product).then(() => setNewProduct(false))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='nombre'
          name='name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='descripcion'
          name='description'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='stock'
          name='stock'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='talle'
          name='size'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='precio'
          name='price'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='color'
          name='color'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='brand'
          name='brand'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='imageURLS'
          name='picture'
          defaultValue='https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
          onChange={handleChange}
        />
        <br />
        <div>
          {categories.map((category) => (
            <label>
              <input
                className='ms-2'
                type='checkbox'
                name={category.name}
                value={category.name}
                onChange={handleOnclick}
              />
              {category.name}
            </label>
          ))}
        </div>
        <br />

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

export default AddProduct
