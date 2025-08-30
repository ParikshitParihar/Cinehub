import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const location = useLocation();
  const [data,setData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/collection`, {
        params: {
          query:location?.search?.slice(3),
          page: 1
        }
      })

      setData((prev) => {
        return [
          ...prev,
          ...response.data.results
        ]
      })
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[location?.search])

  console.log("Location",);
  return (
    <div className='pt-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
      </div>
    </div>
  )
}

export default SearchPage