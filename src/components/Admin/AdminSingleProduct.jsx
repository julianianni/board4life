import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/index";
import AddProduct from "./AddProduct";
import { Styles } from "./Styles";
import Table from "./Table";
import { updateProduct } from "../../utils/index";
import { removeProductFromBD } from "../../utils/index";
import AddNewItem from "./AddNewItem";

function AdminSingleProduct() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Info general",
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Name",
            accessor: "name",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "description",
            accessor: "description",
          },
          {
            Header: "stock",
            accessor: "stock",
          },
          {
            Header: "size",
            accessor: "size",
          },
          {
            Header: "price",
            accessor: "price",
          },
          {
            Header: "color",
            accessor: "color",
          },
          {
            Header: "Categories",
            accessor: "Categories",
          },
        ],
      },
    ],
    []
  );
  const [data, setData] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  useEffect(() => {
    getAllProducts()
      .then((products) => {
        return products.map((product) => {
          product.Categories = product.Categories.reduce((acum, item) => {
            acum += " - " + item.name;
            return acum;
          }, "");
          return product;
        });
      })
      .then((filteredProducts) => {
        console.log(filteredProducts);
       return setData(filteredProducts)
      });
  }, []);

  /// PREGUNTAR
  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData((old) => {
      return old.map((row, index) => {
        if (index === rowIndex) {
          const returnVal = {
            ...old[rowIndex],
            [columnId]: value,
          };
          setUpdatedProduct(returnVal);

          return returnVal;
        }
        return row;
      });
    });
  };

  return (
    <div style={{overflowX:'auto'}}>
      <Styles>
        <AddNewItem
          handleRemoveFilter={getAllProducts}
          AddComponent={AddProduct}
          data={data}
          setData={setData}
          filterOption="name"
        />
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          handleUpdate={updateProduct}
          handleDelete={removeProductFromBD}
        />
      </Styles>
    </ div>
  );
}

export default AdminSingleProduct;
