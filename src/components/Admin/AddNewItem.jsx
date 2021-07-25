import React, { useState } from "react";

//tengo q pasarle para traeer:
// para traer todos los productos
// componente de agregar el producto
//handler action
function AddNewItem({
  handleRemoveFilter,
  AddComponent,
  data,
  setData,
  filterOption,
}) {
  const [newProduct, setNewProduct] = useState(false);

  const handleAddProduct = () => {
    setNewProduct(true);
  };

  const handleAction = (e) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      const newData = data.filter((items) => {
        if (items[filterOption].toUpperCase().includes(value.toUpperCase()))
          return true;
        else return false;
      });
      setData(newData);
    }
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Agregar Item</button>
      <button
        onClick={() =>
          handleRemoveFilter().then((products) => setData(products))
        }
      >
        Remover filtro
      </button>
      <input type="text" onKeyPress={handleAction} />
      {newProduct && (
        <div>
          <AddComponent setNewProduct={setNewProduct} newProduct={newProduct} />
        </div>
      )}
    </div>
  );
}

export default AddNewItem;
