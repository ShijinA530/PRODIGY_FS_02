import React, { useEffect, useState } from 'react'
import axios from '../axios/axios'
import PopupForm from '../components/PopupForm'
import Table from '../components/Table'
import { useDataContext } from '../hooks/useDataContext'
import { ClipLoader } from 'react-spinners'


export default function Home() {
  const { data, dispatch } = useDataContext()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data')
        const json = response.data
        
        dispatch({type: 'SET_DATA', payload: json})
        setLoading(false)

      } catch (err) {
        console.log({error: err.message});
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color="#3498db" loading={true} size={50} />
      </div>
    )
  }  

  return (
    <>
      <Table data={data}/>
    </>
  );
}
