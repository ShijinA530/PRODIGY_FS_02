import React, { useEffect } from 'react'
import axios from 'axios'
import PopupForm from '../components/PopupForm'
import Table from '../components/Table'
import { useDataContext } from '../hooks/useDataContext'

export default function Home() {
  const { data, dispatch } = useDataContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://personal-data-collection.onrender.com/api/data')
        const json = response.data
        
        dispatch({type: 'SET_DATA', payload: json})

      } catch (err) {
        console.log({error: err.message});
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Table data={data}/>
    </>
  );
}
