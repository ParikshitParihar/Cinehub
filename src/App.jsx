import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import axios from 'axios'
import { useEffect } from 'react'

function App() {

  const fetchTrendingData = async()=>{
    try {
      const response = await axios.get('/trending/all/week')
      console.log("response",response);
    } 

    catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    fetchTrendingData()
  },[])

  return (
    <div className='pb-14 lg:pb-0'>
      <Header/>
        <div className='pt-16'>
          <Outlet/>
        </div>
      <Footer/>
      <MobileNav/>
    </div>
  )
}

export default App
