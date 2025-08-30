import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import axios from 'axios';
import useFetch from '../components/hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData);
  // const [nowPlayingData, setNowPlayingData] = useState();
  const {data : nowPlayingData} = useFetch("/movie/now_playing");
  const {data : topRatedData} = useFetch("/movie/top_rated");
  const {data : popularTVshowData} = useFetch("/tv/popular");
  const {data : onAirShowData} = useFetch("/tv/on_the_air");
  // const {data : arivingtodayData} = useFetch("/tv/airing_today");

 
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"}  media_type={"movie"}/>
      <HorizontalScrollCard data={popularTVshowData} heading={"Popular TV Show"}  media_type={"tv"}/>
      <HorizontalScrollCard data={onAirShowData} heading={"On The Air"} media_type={"tv"}/>
      {/* <HorizontalScrollCard data={arivingtodayData} heading={"Ariving Today"}/> */}

    </div>
  )
}

export default Home