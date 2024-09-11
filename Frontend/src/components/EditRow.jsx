import React, { useContext } from 'react'
import axios from 'axios'
import { useDataContext } from './../hooks/useDataContext';

const EditRow = ({ info, index, handleCheckboxChange, selectedRows, editData, setEditData, setEditId }) => {
  const { dispatch } = useDataContext()

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({ ...editData, [name]: value })
      }
      
    const handleSaveClick = async (info) => {
        try {
          const response = await axios.patch('https://personal-data-collection.onrender.com/api/data/' + info._id, editData)
          const json = response.data
          dispatch({ type: 'UPDATE_DATA', payload: json })
          setEditId(null)
        } catch (err) {
          console.log(err)
        }
      }


  return (
    <>
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={selectedRows.includes(info._id)}
            onChange={(e) => handleCheckboxChange(e, info._id)}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="name"
          value={editData.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="phone"
          value={editData.phone}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="hobbies"
          value={editData.hobbies}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </td>
      <td className="flex items-center px-6 py-4">
        <span
          onClick={() => handleSaveClick(info)}
          className="font-medium hover:cursor-pointer text-green-600 dark:text-green-500"
        >
          Save
        </span>
        <span
          onClick={() => setEditId(null)}
          className="font-medium hover:cursor-pointer text-gray-600 dark:text-gray-500 ms-3"
        >
          Cancel
        </span>
      </td>
    </>
  )
}

export default EditRow
