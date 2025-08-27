// import React from 'react'
// import { useSelector } from 'react-redux';
// import moment from 'moment'

// const Card = ({ data, trending, index }) => {
//     const imageURL = useSelector(state => state.movieData.imageURL);
//     return (
//         <div className='w-full max-w-[230px] h-80 overflow-hidden rounded relative'>
//             <img src={imageURL + data?.poster_path} alt="" />
// <div className='absolute top-4'>
//     {
//         trending && (
//             <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
//                 #{index}
//             </div>
//         )
//     }
// </div>

//             <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
//                 <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
//                 <div className='text-sm text-neutral-400 flex justify-between'>
//                     <p>{moment(data.release_date).format("MMM Do YY")}</p>
//                     <p className='bg-black px-1 rounded-full text-xs text-white'>Rating: {Number(data.vote_average).toFixed(1)}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Card



import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

const Card = ({ data, trending, index }) => {
    const imageURL = useSelector(state => state.movieData.imageURL);

    return (
        <div className="w-full min-w-[230px] max-w-[230px]">
            {/* Poster Card */}
            <div className="relative h-80 overflow-hidden rounded-lg">
                <img
                    src={imageURL + data?.poster_path}
                    alt={data?.title || data?.name}
                    className="w-full h-full object-cover"
                />

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
        </div>
    );
};

export default Card;
