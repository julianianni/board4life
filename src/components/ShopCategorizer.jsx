import React, { useEffect, useState } from 'react'
import Card from './Card'

import { getCatProd } from '../utils'

export default function ShopCategorizer({match, products, query}) {

  const [prodcat, setProdcat] = useState([])

  useEffect(() =>{
    getCatProd(match.params.category)
    .then(products => setProdcat(Object.keys(products)));
  }, [match])

  return prodcat.filter(names => names.match(query))
  .map((product, index) => (
    <Card item={product} key={index} products={products} />
  ))
}
