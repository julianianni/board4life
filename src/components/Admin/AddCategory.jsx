import React, { useState } from "react";
import { addCategoryToBD } from "../../utils/index";

function AddCategoy({ setNewProduct }) {
  const [categoryName, setCategoryName] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addCategoryToBD(categoryName).then(() => setNewProduct(false)); //fijarte donde va esto!!
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
        />
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          confirmar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setNewProduct(false);
          }}
        >
          cancelar
        </button>
      </form>
    </div>
  );
}

export default AddCategoy;
