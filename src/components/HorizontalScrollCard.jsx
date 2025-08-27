import React from 'react'
import Card from './Card'

const HorizontalScrollCard = ({data= [], heading}) => {
  return (
    <div className='container mx-auto px-12 my-10'>
        <h2 className='text-xl lg:text-2xl font-bold mb-2 text-white'>{heading}</h2>

        <div className='overflow-hidden'>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 grid-flow-col overflow-x-scroll'>
            {
              data.map((data, index) => {
                return (
                  <Card key={data.id+"heading"+index} data={data} index={index + 1} trending={true} />
                )
              })
            }
          </div>
        </div>
      </div>
  )
}

export default HorizontalScrollCard