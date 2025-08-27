import React from 'react'
import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData);
  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard data={trendingData} heading={"Trending"}/>

    </div>
  )
}

export default Home