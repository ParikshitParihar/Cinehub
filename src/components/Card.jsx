import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom'

const Card = ({ data, trending, index, media_type }) => {
    const imageURL = useSelector(state => state.movieData.imageURL);
    const mediaType = data.media_type ?? media_type

    return (
        <Link to={"/"+mediaType+"/"+data.id} className="w-full min-w-[230px] max-w-[230px] block hover:scale-110 transition-all">


            {/* Poster Card */}
            <div className="relative h-80 overflow-hidden rounded-lg">
                {/* <img
                    src={imageURL + data?.poster_path}
                    alt={data?.title || data?.name}
                    className="w-full h-full object-cover"
                /> */}

                {data?.poster_path ? (
                    <img
                        src={imageURL + data?.poster_path}
                        alt={data?.title || data?.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
                        No image found
                    </div>
                )}

                {/* Trending Number */}
                <div className='absolute top-4'>
                    {
                        trending && (
                            <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
                                #{index}
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Movie Details (Outside Card) */}
            <div className="mt-2">
                {/* Title */}
                <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
                    {data?.title || data?.name}
                </h2>

                {/* Date & Rating */}
                <div className="text-sm text-neutral-400 flex justify-between items-center mt-1">
                    <p>{moment(data.release_date).format("MMM Do YY")}</p>
                    <p className="bg-black px-2 py-0.5 rounded-full text-xs text-white">
                        ⭐ {Number(data.vote_average).toFixed(1)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
