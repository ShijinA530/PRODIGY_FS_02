import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PopupForm from '../components/PopupForm'
import Table from '../components/Table'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data')
        const json = response.data
        console.log(json)
        setData(json)

      } catch (err) {
        console.log({error: err.message});
      }
    }

    fetchData()
  }, [data])

  return (
    <>
      <PopupForm/>
      <Table data={data}/>
    </>
  );
}
