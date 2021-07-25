import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Navbar from "../Navbar";
import Table from "./Table";
import {
  getAllCategoriesfromBD,
  updateCategoryfromBD,
  removeCategoryfromBD,
  addUserToBD,
} from "../../utils/index";
import AddNewItem from "./AddNewItem";
import AddCategory from "./AddCategory";

function Category() {
  const columns = React.useMemo(
    () => [
      {
        Header: "CATEGORIES",
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "name",
            accessor: "name",
          },
        ],
      },
    ],
    []
  );

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) => {
      return old.map((row, index) => {
        if (index === rowIndex) {
          const returnVal = {
            ...old[rowIndex],
            [columnId]: value,
          };
          setUpdatedData(returnVal);

          return returnVal;
        }
        return row;
      });
    });
  };

  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    getAllCategoriesfromBD().then((categories) => setData(categories));
  }, []);

  console.log("ESTO TRAEE DATAA ->> ", data);
  const history = useHistory();
  return (
    <div>
      <Navbar transparent={false} />
      <AddNewItem
        handleRemoveFilter={getAllCategoriesfromBD}
        AddComponent={AddCategory}
        data={data}
        setData={setData}
        filterOption="email"
      />
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        handleUpdate={updateCategoryfromBD}
        handleDelete={removeCategoryfromBD}
      />{" "}
      <button onClick={() => history.goBack()}>Volver</button>
    </div>
  );
}

export default Category;
