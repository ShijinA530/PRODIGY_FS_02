import React, { useState, useRef, useEffect } from 'react'
import { useDataContext } from "../hooks/useDataContext"
import axios from '../axios/axios'
import PopupForm from './PopupForm'
import EditRow from './EditRow'

const Table = ({ data }) => {
  const { dispatch } = useDataContext()
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    email: '',
    hobbies: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const [selectedRows, setSelectedRows] = useState([])
  const [emailSent, setEmailSent] = useState(false)
  const [noDataError, setNoDataError] = useState(false)
  const [sentEmail,setSentEmail] = useState('')

  const emailSentRef = useRef(null)
  const noDataErrorRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailSentRef.current && !emailSentRef.current.contains(event.target)) {
        setEmailSent(false)
      }
      if (noDataErrorRef.current && !noDataErrorRef.current.contains(event.target)) {
        setNoDataError(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = async (info) => {
    try {
      const response = await axios.delete('/api/data/' + info._id)
      const json = response.data
      dispatch({ type: 'DELETE_DATA', payload: json })
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = (info) => {
    setShowConfirmation(true)
    setItemToDelete(info)
  }

  const handleConfirmDelete = () => {
    handleDelete(itemToDelete)
    setShowConfirmation(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setItemToDelete(null)
  }

  const handleEditClick = (info) => {
    setEditId(info._id)
    setEditData({
      name: info.name,
      phone: info.phone,
      email: info.email,
      hobbies: info.hobbies
    })
  }

  

  

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map(info => info._id))
    } else {
      setSelectedRows([])
    }
  }

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    }
  }

  const handleSend = async () => {
    const markedData = data.filter(info => selectedRows.includes(info._id))
    console.log(markedData);
    
    if (markedData.length === 0) {
      setNoDataError(true)
    } else {
      try {
        const response = await axios.post('/api/data/send-email', {
          email: sentEmail,
          data: markedData
        })
        console.log(response.data)
        setEmailSent(true)
      } catch (error) {
        console.error('Error sending email:', error)
        setEmailSent(false)
      }
    }
  }

  return (
    <div>
      {showConfirmation && (
        <div className="fixed top-0 z-50 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={data?.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAllChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Hobbies</th>
              <th scope="col" className="px-6 py-3">Update/Delete</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((info, index) => (
              <tr key={info._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {editId === info._id ? 
                  <EditRow info={info} index={index} handleCheckboxChange={handleCheckboxChange} selectedRows={selectedRows} editData={editData} setEditData={setEditData} setEditId={setEditId} />
                 : (
                  <>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          checked={selectedRows.includes(info._id)}
                          onChange={(e) => handleCheckboxChange(e, info._id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4">{info.name}</td>
                    <td className="px-6 py-4">{info.phone}</td>
                    <td className="px-6 py-4">{info.email}</td>
                    <td className="px-6 py-4">{info.hobbies}</td>
                    <td className="flex items-center px-6 py-4">
                      <span
                        onClick={() => handleEditClick(info)}
                        className="font-medium hover:cursor-pointer text-blue-600 dark:text-blue-500"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleRemove(info)}
                        className="font-medium hover:cursor-pointer text-red-600 dark:text-red-500 ms-3"
                      >
                        Remove
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center p-6">
        <PopupForm />
        <label
          className="text-base sm:text-lg font-medium mt-4 text-gray-700 dark:text-gray-300"
        >
          Enter email to which details are to be sent:
        </label>
        <input
          onChange={(e) => setSentEmail(e.target.value)}
          type="email"
          value={sentEmail}
          placeholder="Email"
          className="w-full sm:w-auto p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-colors duration-300"
        />
        <button
          onClick={handleSend}
          className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send Marked Details
        </button>
        {emailSent && (
          <div ref={emailSentRef} className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            Email sent successfully!
          </div>
        )}
        {noDataError && (
          <div ref={noDataErrorRef} className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
            Select row(s) to be sent
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
