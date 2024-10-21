import React, { useEffect, useState } from 'react'
import { useAnime } from '../animeDetails'
import { useParams } from 'react-router-dom'
import { Dot } from 'lucide-react'

const Overview = () => {
    const { id } = useParams()
    const [animeFull, setAnimeFull] = useState([])

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
                .then(res => res.json())
                .then(res => setAnimeFull(res.data))
        }

        fetchAnimeDetails();
    }, [id])


    return (
        <div className='text-white px-4 lg:px-10'>
            <div className='flex flex-col lg:flex-row  gap-10'>
                <div>
                    <h1 className='text-2xl font-bold'>Details</h1>
                    <table className='border-collapse '>
                        <tbody>
                            <tr >
                                <td className='p-[9.5px] text-start text-zinc-500'>Type</td>
                                <td className='p-[9.5px  '>{animeFull?.type}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Episodes</td>
                                <td className='p-[9.5px] '>{animeFull?.episodes}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Genres</td>
                                <td className='p-[9.5px] w-44 block '>
                                    {animeFull?.genres?.map((genre, i) =>
                                        <span key={i}>{genre.name} {animeFull?.genres?.length > i + 1 ? <Dot size={12} className='inline-block mx-0 px-0' /> : ''}</span>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Aired</td>
                                <td className='p-[9.5px] w-32 block'><span>{animeFull?.aired?.from ? String(animeFull?.aired?.from).slice(0, 10) : ''}</span> {animeFull?.aired?.to ? 'To' : ''}  <span>{animeFull?.aired?.to ? String(animeFull?.aired?.to).slice(0, 10) : ''}</span></td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Status</td>
                                <td className='p-[9.5px] '>{animeFull?.status}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Season</td>
                                <td className='p-[9.5px] '>{animeFull?.season} {animeFull?.year} </td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Studios</td>
                                <td className='p-[9.5px] '>{animeFull?.studios?.map((v, i) => <span key={i}>{v.name}</span>)}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Source</td>
                                <td className='p-[9.5px] '>{animeFull?.source}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Rating</td>
                                <td className='p-[9.5px] '>{String(animeFull?.rating?.split('+').slice(0, 1).join('-'))}</td>
                            </tr>
                            <tr>
                                <td className='p-[9.5px] text-start text-zinc-500'>Duration</td>
                                <td className='p-[9.5px] '>{String(animeFull?.duration)}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div>
                    <h1 className='text-2xl font-bold'>Description</h1>
                    <div className=''>
                        <p>{animeFull?.synopsis}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
