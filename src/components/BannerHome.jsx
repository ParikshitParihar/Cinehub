import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";

const BannerHome = () => {

    const bannerData = useSelector(state => state.movieData.bannerData);
    const imageURL = useSelector(state => state.movieData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext=()=>{
        if(currentImage < bannerData.length - 1){
            setCurrentImage(prev => prev + 1);
        }
    }

    const handlePrevious=()=>{
        if(currentImage > 0){
            setCurrentImage(prev => prev - 1);
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentImage < bannerData.length - 1){
            handleNext();
            }
            else{
                setCurrentImage(0);
            }
        },4000)

        return ()=>clearInterval(interval)
    },[bannerData, imageURL, currentImage])

    // console.log("Banner Home", bannerData);

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, idx) => {
                        // console.log("Data", data);
                        return (
                            <div key={data.id+"bannerHome"+idx}className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <div className='w-full h-full'>
                                    <img src={imageURL + data.backdrop_path} className='h-full w-full object-cover' />
                                </div>

                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer'>
                                        <FaAngleLeft/>
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-xl z-10 text-black cursor-pointer'>
                                        <FaAngleRight/>
                                    </button>
                                </div>

                                <div className='absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>

                                <div className='container mx-auto'>
                                    <div className='w-full absolute bottom-0 left-10 max-w-md px-3'>
                                        <h2 className='font-b text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                                            {data.title || data.name || data.original_title || data.original_name || "Untitled"}
                                        </h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>

                                        <div className='flex items-center gap-4'>
                                            <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>View : {Number(data.popularity).toFixed(0)}</p>
                                        </div>

                                        <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                            Play Now
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome