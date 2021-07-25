import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Navbar from '../Navbar'
import Table from './Table'
import {
  getOrdersFromBD,
  updateOrderfromBD,
  removeOrderfromBD,
  addUserToBD,
} from '../../utils/index'
import AddNewItem from './AddNewItem'
import AddOrder from './AddOrder'

function Orders() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Info general',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'telephone',
            accessor: 'telephone',
          },
          {
            Header: 'address',
            accessor: 'address',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'state',
            accessor: 'state',
          },
          {
            Header: 'shipCost',
            accessor: 'shipCost',
          },
          {
            Header: 'paymentMethod',
            accessor: 'paymentMethod',
          },
          {
            Header: 'additionalInfo',
            accessor: 'additionalInfo',
          },
          {
            Header: 'Fecha',
            accessor: 'date',
          },
        ],
      },
    ],
    []
  )

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) => {
      return old.map((row, index) => {
        if (index === rowIndex) {
          const returnVal = {
            ...old[rowIndex],
            [columnId]: value,
          }
          setUpdatedData(returnVal)

          return returnVal
        }
        return row
      })
    })
  }

  const [data, setData] = useState([])
  const [updatedData, setUpdatedData] = useState([])

  useEffect(() => {
    getOrdersFromBD().then((orders) => {
      console.log(orders)
      setData(orders)
    })
  }, [])

  const history = useHistory()
  return (
    <div>
      <Navbar transparent={false} />
      <AddNewItem
        handleRemoveFilter={getOrdersFromBD}
        AddComponent={AddOrder}
        data={data}
        setData={setData}
        filterOption='fecha'
      />
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        handleUpdate={updateOrderfromBD}
        handleDelete={removeOrderfromBD}
      />
      <button onClick={() => history.goBack()}>Volver</button>
    </div>
  )
}

export default Orders
