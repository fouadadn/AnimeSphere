import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReveiws] = useState([])

  useEffect(() => {
    const fetchAnimeCaracters = async () => {
      await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`)
        .then(res => res.json())
        .then(res => setReveiws(res.data))
    }
    fetchAnimeCaracters();
  }, [])

  console.log(reviews)
  return (
    <div className='px-4 lg:px-10'>
      <h1 className='text-white font-bold text-2xl'>Reviews</h1>
      <div className={`space-y-10 ${reviews.length > 0 ? 'lg:w-[60%]' : '' }  mt-6`}>
        {
          reviews.length > 0 ? reviews.map((review , i) => 
          <div className='flex gap-3'>
            <div className='w-14 rounded-full h-14 overflow-hidden shrink-0'>
                <img src={review?.user?.images.jpg.image_url} className='w-14'  alt="" />
            </div>
            <div className='text-white'>
              <div className='flex gap-3 '>
                  <h1>{review?.user.username}</h1>
                  <span className='text-stone-500'>{String(review?.date).slice(0,10)}</span>
              </div>
              <div>
                <p>{String(review?.review).split(' ').slice(0 , 40).join(' ')} {String(review?.review).split(' ').length > 40 ? <a className='text-stone-500' href={review?.url}>Read more</a> : ''}</p>
                
                
              </div>
            </div>
          </div>
          ) : <div className='text-white text-2xl font-bold text-center'>No reviews found</div>
        }
      </div>
    </div>
  )
}

export default Reviews
