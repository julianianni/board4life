import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Navbar from '../Navbar'
import Table from './Table'
import {
  getAllUsersfromBD,
  updateUserfromBD,
  removeUserfromBD,
  addUserToBD,
} from '../../utils/index'
import AddNewItem from './AddNewItem'
import AddUser from './AddUser'
import { useSelector } from 'react-redux'

function Users() {
  const user = useSelector((state) => state.user)
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
            Header: 'firstName',
            accessor: 'firstName',
          },
          {
            Header: 'lastName',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'email',
            accessor: 'email',
          },
          {
            Header: 'isAdmin',
            accessor: 'isAdmin',
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
    getAllUsersfromBD().then((users) => {
      return users.filter((BDUSER) => BDUSER.id !== user.id)
      
    }).then((filteredUsers) => {
      console.log(filteredUsers);
      setData(filteredUsers)
    })
  }, [user])

  const history = useHistory()
  return (
    <div>
      <Navbar transparent={false} />
      <AddNewItem
        handleRemoveFilter={getAllUsersfromBD}
        AddComponent={AddUser}
        data={data}
        setData={setData}
        filterOption='email'
      />
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        handleUpdate={updateUserfromBD}
        handleDelete={removeUserfromBD}
      />
      <button onClick={() => history.goBack()}>Volver</button>
    </div>
  )
}

export default Users
