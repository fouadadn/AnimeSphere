import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Characters = () => {
  const { id } = useParams();
  const [Characters, setCaracters] = useState([])

  useEffect(() => {
    const fetchAnimeCaracters = async () => {
      await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
        .then(res => res.json())
        .then(res => setCaracters(res.data))
    }
    fetchAnimeCaracters();
  }, [])


  console.log(Characters)
  return (
    <div className='mx-4 lg:mx-10'>
      <h1 className='text-2xl text-white font-bold'>Charaters</h1>
      <div className='text-white flex gap-3 overflow-auto overflow-y-hidden py-2
        [&::-webkit-scrollbar]:h-1
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
        dark:[&::-webkit-scrollbar-thumb]:bg-white'>
        {
          Characters.map((character, i) =>
            <div key={i} className='relative group duration-300 w-44 h-56'>
              <div>
                <div key={i} className='flex-shrink-0 w-44 h-56 text-center rounded-xl overflow-hidden '>
                  <img src={character.character.images.jpg.image_url ? character?.character?.images?.jpg.image_url : '/posternotFound.jpg'} alt="" className='w-44 brightness-75' />
                </div>
                <div className='relative bottom-6 left-2'>
                  {character?.character?.name}
                </div>
              </div>
              <div className='absolute top-0 opacity-0 group-hover:opacity-100 duration-300'>
                <div key={i} className='flex-shrink-0 w-44 h-56 text-center rounded-xl overflow-hidden '>
                  {
                    character?.voice_actors.map((v ,i)=> <img key={i} src={v.person.images.jpg.image_url} className='brightness-75' />)
                  }
                </div>
                <div className='relative bottom-6 left-2 '>
                  {
                    character?.voice_actors.map((v ,i) => <span key={i}>{v.language === "Japanese" ? v.person.name : ''}</span>)
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>)
}



export default Characters;
