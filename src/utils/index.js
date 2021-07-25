import axios from 'axios'
/// preguntar  por getPTofucts
export const getProducts = () => {
  return axios
    .get("/api/products/all")
    .then((res) => res.data)
    .then((products) => products)
}

export const getCatProd = (cat) => {
  return axios.get(`/api/products/${cat}`)
  .then((res) => res.data)
  .then((products) => products);
}

export const getOneProduct = (name) => {
  return axios
    .get(`/api/products/single/${name}`)
    .then((res) => res.data)
    .then((singleProduct) => singleProduct)
}

export const addProductToCartBD = (products) => {
  return axios
    .post(`/api/cart/add`, products)
    .then((res) => res.data)
    .then((response) => {
      return response
    })
}

export const clearCart = (userId) => {
  return axios
    .delete(`/api/cart/vaciarcarrito`, {
      data: { userId: userId },
    })
    .then((res) => res.data)
    .then((response) => {
      return response
    })
}
export const removeProduct = (userId, id) => {
  return axios
    .delete(`/api/cart/remove`, {
      data: { userId: userId, productid: id },
    })
    .then((res) => res.data)
    .then((response) => {
      return response
    })
}
export const confirmOrder = (orderInfo) => {
  return axios
    .post(`/api/order/checkout`, orderInfo)
    .then((res) => res.data)
    .then((response) => {
      alert('Orden de compra creada ok')
      return response
    })
}

// preguntar por estoooo

export const getAllProducts = () => {
  return axios
    .get(`/api/admin/allproducts`)
    .then((res) => res.data)
    .then((response) => response)
}

export const updateProduct = (products) => {
  const updatedProducts = products.map((product) =>
    axios.put(`/api/admin/update`, product)
  );

  return Promise.all(updatedProducts)
    .then((res) => res.data)
    .then((updatedProducts) => updatedProducts)
}

export const addProduct = (product) => {
  return axios
    .post(`/api/admin/add`, product)
    .then((res) => res.data)
    .then((response) => response)
}
export const removeProductFromBD = (products) => {
  return axios
    .delete(`/api/admin/delete`, {
      data: products,
    })
    .then((res) => res.data)
    .then((response) => response)
}

export const getAllUsersfromBD = () => {
  return axios
    .get(`/api/admin/allusers`)
    .then((res) => res.data)
    .then((response) => response)
}

export const updateUserfromBD = (users) => {
  const updatedusers = users.map((user) =>
    axios.put(`/api/admin/updateuser`, user)
  );

  return Promise.all(updatedusers)
    .then((res) => res.data)
    .then((updatedusers) => updatedusers)
}

export const removeUserfromBD = (users) => {
  return axios
    .delete(`/api/admin/deleteuser`, {
      data: users,
    })
    .then((res) => res.data)
    .then((response) => response)
}

export const addUserToBD = (user) => {
  return axios
    .post(`/api/auth/register`, user)
    .then((res) => res.data)
    .then((response) => response)
}

export const getOrdersFromBD = () => {
  return axios
    .get(`/api/admin/getorders`)
    .then((res) => res.data)
    .then((response) => response)
}

export const removeOrderfromBD = (orders) => {
  return axios
    .delete(`/api/admin/deleteorder`, {
      data: orders,
    })
    .then((res) => res.data)
    .then((response) => response)
}

export const updateOrderfromBD = (orders) => {
  const updatedOrder = orders.map((order) =>
    axios.put(`/api/admin/updateorder`, order)
  );

  return Promise.all(updatedOrder)
    .then((res) => res.data)
    .then((updatedusers) => updatedusers)
}

export const addOrderToBD = (order) => {
  return axios
    .post(`/api/admin/addorder`, order)
    .then((res) => res.data)
    .then((response) => response)
}

export const addCategoryToBD = (categoryName) => {
  return axios
    .post(`/api/category`, { name: categoryName })
    .then((res) => res.data)
    .then((response) => response)
}

export const getAllCategoriesfromBD = () => {
  return axios
    .get(`/api/category`)
    .then((res) => res.data)
    .then((response) => response)
}

export const removeCategoryfromBD = (namesCategories) => {
  return axios
    .delete(`/api/category`, { data: namesCategories })
    .then((res) => res.data)
    .then((response) => response)
}

//REVISAR  ivan
//esta axios le pega a  api/routers/categoryRoute a la ruta de put
export const updateCategoryfromBD = (categories) => {
  const updateCategories = categories.map((category) =>
    axios.put(`/api/category`, category)
  );
  return Promise.all(updateCategories)
    .then((res) => res.data)
    .then((updateCategories) => updateCategories)
}
