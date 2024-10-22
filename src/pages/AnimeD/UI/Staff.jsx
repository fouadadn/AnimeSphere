import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Staff = () => {
  const { id } = useParams()
  const [stuff, setStuff] = useState([])



  useEffect(() => {
    const fetchStuff = async () => {
      fetch(`https://api.jikan.moe/v4/anime/${id}/staff`)
        .then(res => res.json())
        .then(res => setStuff(res.data))
    };
    fetchStuff();
  }, [])

  return (
    <div className='px-4 lg:px-10 '>
      <h1 className='text-2xl font-bold text-white'>Staff</h1>
      <div className='flex gap-5 overflow-auto py-2 h-60
      [&::-webkit-scrollbar]:h-1
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full 
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
      dark:[&::-webkit-scrollbar-thumb]:bg-white'>
        {
          stuff.length > 0 ? stuff?.map((stuf, i) =>
            <div key={i} className='relative w-40 flex-shrink-0 rounded-xl overflow-hidden group '>
              <div className='  '>
                <img src={String(stuf?.person?.images.jpg.image_url).includes('questionmark') ? '/blank-profile-picture-973460_1280.png' : stuf?.person?.images.jpg.image_url} alt="" className='w-44 h-60 group-hover:brightness-50 duration-300' />
              </div>
              <div className='absolute text-white bottom-1 left-2 opacity-0 group-hover:opacity-100 duration-300'>
                <span>{stuf?.person?.name}</span>
              </div>
            </div>
          ) :
            <div className="flex gap-3 md:gap-6 h-56 w-full">
              {/* <div className="border-t-2 animate-spin border-white w-12 h-12 rounded-full">
          </div> */}
              {Array.from(Array(10), (v, i) =>
                <div className="relative h-56 rounded-xl animate-pulse bg-stone-600 overflow-hidden group flex-shrink-0 w-40">

                </div>
              )}
            </div>
        }
      </div>
    </div>
  )
}

export default Staff

