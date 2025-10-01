// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-3.5'>

//       <div className='flex items-center justify-center gap-4'>
//         <Link to="/">About</Link>
//         <Link to="/">Contact</Link>
//       </div>

//       <div>
//         <p>Made with {'<div>ine'} inspiration!!</p>
//       </div>

//     </footer>
//   )
// }

// export default Footer



import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-800 text-neutral-300 py-3.5'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='flex gap-4'>
          <Link 
            to="/" 
            className="text-sm hover:text-white transition-colors duration-200 ease-in-out"
          >
            About
          </Link>
          <Link 
            to="/" 
            className="text-sm hover:text-white transition-colors duration-200 ease-in-out"
          >
            Contact
          </Link>
        </div>

        <p className="text-sm mt-1">
          Made with <span className="font-semibold text-blue-400">{'<div>ine'}</span> inspiration!
        </p>
      </div>
    </footer>
  );
};

export default Footer;