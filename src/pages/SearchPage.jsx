// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import Card from '../components/Card';
// import axios from 'axios';

// const SearchPage = () => {
//   const location = useLocation();
//   const [data,setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`/search/multi`, {
//         params: {
//           query:location?.search?.slice(3),
//           page: 1
//         }
//       })

//       setData((prev) => {
//         return [
//           ...prev,
//           ...response.data.results
//         ]
//       })
//       // setTotalPageNo(response.data.total_pages)
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   useEffect(()=>{
//     fetchData()
//   },[location?.search])

//   console.log("Location",);
//   return (
//     <div className='pt-16'>
//       <div className='container mx-auto'>
//         <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

//         <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6'>
//           {
//             data.map((searchData, idx) => {
//               return (
//                 <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
//               )
//             })
//           }
//         </div>

//       </div>
//     </div>
//   )
// }

// export default SearchPage

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const query = location?.search?.slice(3)
   const decodedQuery = decodeURIComponent(query || "");

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });

      setData(response.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      fetchData()
    }
  }, [location?.search]);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='py-16'>

      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input type="text" placeholder='Search here...' onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>

      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Search Results
        </h3>
{data.length === 0 ? (
          <p className="text-center text-neutral-400 text-lg my-10">
            No results found for <span className="font-semibold">"{decodedQuery}"</span>
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
            {data.map((searchData) => (
              <Card
                data={searchData}
                key={searchData.id + 'search'}
                media_type={searchData.media_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
