import {  useEffect, useState } from "react"
import { useParams, Outlet, NavLink, useLocation } from "react-router-dom"
import { Star, Bookmark, Eye, Check } from "lucide-react"
import Footer from "../../components/Footer/Footer"
export default function AnimeDetails() {

    const { id } = useParams()
    const [animeFull, setAnimeFull] = useState([])
    const [Recommandations, setRecommandations] = useState([])
    const [episode, setepisode] = useState(1)
    const [delayMessage, setdelayMessage] = useState('')

    const location = useLocation()
    const [aniListId, setAnilistId] = useState(null)



    useEffect(() => {
        const fetchAnimeDetails = async () => {
            await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
                .then(res => res.json())
                .then(res => setAnimeFull(res.data))
        }
        fetchAnimeDetails();

        const fetchAnimeRecommandation = async () => {
            await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
                .then(res => res.json())
                .then(res => setRecommandations(res.data.slice(0, 20)))
        }
        fetchAnimeRecommandation();
        setTimeout(() => {
            setdelayMessage('Something went wrong please reload the page')
        }, 5000);

        // Step 2: Fetch AniList ID using AniList GraphQL API
        async function fetchAniListId(malId) {
            const anilistApiUrl = "https://graphql.anilist.co/";

            // GraphQL query to fetch AniList ID based on MyAnimeList ID
            const query = `
    query ($idMal: Int) {
      Media(idMal: $idMal, type: ANIME) {
        id
        title {
          romaji
          english
        }
      }
    }
    `;

            const variables = {
                idMal: malId
            };

            try {
                const response = await fetch(anilistApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                });

                const data = await response.json();
                return data.data.Media.id;  // Return AniList ID

            } catch (error) {
                console.error("Error fetching AniList ID:", error);
                return null;
            }
        }
        fetchAnimeFromJikan(id);


        async function fetchAnimeFromJikan(malId) {
            try {
                // Step 2: Fetch the corresponding AniList ID using AniList GraphQL API
                const anilistId = await fetchAniListId(malId);
                setAnilistId(anilistId)
            } catch (error) {
                console.error("Error fetching anime from Jikan API:", error);
            }
        }

        // window.scroll(0, 0)

    }, [id])

    const handleEpisodeschange = (e) => {
        setepisode(e.target.value)
    }

    const handleTypeEpisodeChange = (e)=>{
        setepisode(e.target.value)
    }

    console.log(animeFull)
    console.log('anilistId : ', aniListId)
    return (
        <>
            <div className="relative overflow-hidden  ">
                <div className="lg:h-96 relative flex justify-center items-center text-center lg:top-0 lg:overflow-hidden ">
                    {
                        animeFull?.trailer?.images?.maximum_image_url !== 'https://img.youtube.com/vi/hRPHiQKJVk0/maxresdefault.jpg' && animeFull?.trailer?.images?.maximum_image_url ?
                            <img src={animeFull?.trailer?.images?.maximum_image_url} alt="" className="w-full relative lg:bottom-44 brightness-50" />
                            : <h1 className="caesar-dressing-regular text-3xl px-4 lg:px-10 text-white font-bold ">{animeFull?.background}</h1>
                    }
                </div>
                <div className="px-4 lg:px-10 flex items-end sm:items-start gap-10 absolute bottom-3 sm:bottom-10 lg:static">
                    <div className="w-32 lg:w-64">
                        <img src={animeFull?.images?.jpg?.large_image_url} alt="" className="w-44 lg:w-64 rounded-xl relative lg:bottom-32  shadow-lg shadow-[#6c6c6cc2]" />
                    </div>
                    <div className="text-white space-y-2 mt-6 ">
                        <div className="relative right-9 sm:right-0">
                            <h1 className=" md:text-3xl font-medium">{animeFull?.title_english}</h1>
                            <div className="text-white flex gap-2 py-1 px-2 items-center">
                                <Star size={15} color="white    " />
                                <span>{animeFull?.score}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 relative right-9 sm:right-0">
                            <a href="#videoplay" className="text-nowrap bg-stone-800 rounded-lg px-2 sm:px-5 py-2 sm:py-3 text-white flex items-center gap-1">
                                <Eye />
                                <span>Watch<span className="opacity-0">.</span>Now</span>
                            </a>
                            <button className="text-nowrap bg-stone-800 rounded-lg px-2 sm:px-5 py-2 sm:py-3 text-white flex items-center gap-1">
                                <Bookmark color="white" />
                                <span> To<span className="opacity-0">.</span>Watch</span>
                            </button>
                            <button className="text-nowrap  bg-stone-800 rounded-lg px-5 py-3 text-white hidden sm:flex items-center gap-1">
                                <Check />
                                <span>Watched</span>
                            </button>
                        </div>
                    </div>
                </div>


            </div>

            <div className="mx-2 lg:mx-10 rounded-xl relative mt-4 lg:bottom-20 text-xl font-medium flex justify-center backdrop-blur-xl bg-stone-50 py-1">
                <div className="border-gray-500  w-fit">
                    <div className="text-white flex gap-5 text-sm md:text-2xl py-1">
                        <NavLink to={`/anime/${id}/Overview`} className={` p-3 text-black ${location.pathname.includes('Overview') ? 'text-white bg-stone-800' : ''} hover:text-white hover:bg-stone-800 rounded-xl duration-300`}>
                            <span className="text-center" to={`/anime/${id}/Overview`} href="">Overview</span>   
                        </NavLink>
                        <NavLink to={`/anime/${id}/Characters`} className={` p-3 text-black ${location.pathname.includes('Characters') ? 'text-white bg-stone-800' : ''} hover:text-white hover:bg-stone-800 rounded-xl duration-300`}>
                            <span to={`/anime/${id}/Characters`}>Characters</span>
                        </NavLink>
                        <NavLink to={`/anime/${id}/Staff`} className={` p-3 text-black ${location.pathname.includes('Staff') ? 'text-white bg-stone-800' : ''} hover:text-white hover:bg-stone-800 rounded-xl duration-300`}>
                            <span to={`/anime/${id}/Staff`}>Staff</span>
                        </NavLink>
                        <NavLink to={`/anime/${id}/Reviews`} className={` p-3 text-black ${location.pathname.includes('Reviews') ? 'text-white bg-stone-800' : ''} hover:text-white hover:bg-stone-800 rounded-xl duration-300`}>
                            <span to={`/anime/${id}/Reviews`}>Reviews</span>
                        </NavLink>
                    </div>
                    <hr className="border-gray-800" />
                </div>
            </div>
            <div className="mt-10 lg:mt-0">
                <Outlet />
            </div>

            <div className="text-white px-4 lg:px-10 py-6 space-y-5">
                <div id="videoplay" className="flex justify-between">
                    <h1 className="text-2xl font-bold">Watch Now </h1>

                    <span className="text-2xl font-bold">
                        1-{animeFull?.episodes ? animeFull?.episodes : '?'}
                    </span>
                    <div>
                        <select onChange={handleEpisodeschange} name="" id="" className="outline-none bg-stone-700 px-4 py-2 rounded-lg ">
                            <option value="">Episods</option>
                            {Array.from(Array(animeFull?.episodes), (v, i) => <option key={i} value={i + 1} >{i + 1}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex  justify-end">
                    <input onChange={handleTypeEpisodeChange} type="number" min={1} placeholder="Type EP" name="" id="" className="outline-none px-4 py-1 rounded-lg bg-stone-700 text-white w-28" />
                </div>
                <div >
                    <div className="relative overflow-hidden w-[100%] pt-[56.25%]">
                        {
                            aniListId ? <iframe className="absolute top-0 bottom-0 right-0 left-0 w-[100%] h-[100%] border-[#ffffff9a] border-2 rounded-3xl py-4 "
                                src={`https://vidsrc.icu/embed/anime/${aniListId ? aniListId : id}/${episode}/0`}
                                scrolling="no" frameBorder="0" allowFullScreen ></iframe>
                                : <div className="absolute top-0 bottom-0 right-0 left-0 w-[100%] h-[100%] border-[#ffffff9a] border-2 rounded-3xl py-4 flex flex-col gap-3 justify-center items-center">
                                    <div className="h-16 w-16 border-r-0 border-t-0 animate-spin border-4 rounded-full">
                                    </div>
                                    <h1 className="text-white">{delayMessage}</h1>
                                </div>
                        }

                    </div>
                </div>
            </div>

            <div className="text-white px-4 lg:px-10 mt-6">
                <h1 className="text-2xl font-bold">Similare Anime </h1>
                <div className="flex gap-3 overflow-auto mt-6  py-2
                    [&::-webkit-scrollbar]:h-1
                   [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
                    dark:[&::-webkit-scrollbar-thumb]:bg-white">
                    {
                       Recommandations.length > 0 ? Recommandations.map((anime, i) =>
                            <NavLink to={`/anime/${anime?.entry?.mal_id}`} key={i} className="relative flex-shrink-0 h-52 overflow-hidden rounded-xl group ">
                                <img src={anime?.entry?.images?.jpg?.large_image_url} className="w-40 group-hover:brightness-50 duration-300" alt="" />
                                <div className="absolute bottom-0 w-full opacity-0 hover:opacity-100 duration-300 h-full flex flex-col items-center justify-end">
                                    <h1 className="text-white w-40 font-bold text-lg text-center">{anime?.entry?.title}</h1>
                                </div>
                            </NavLink>
                        ) : <div className='text-white text-2xl font-bold text-center w-full'>No Simiare found</div>
                    }
                </div>
            </div>


            <div>
                <Footer />
            </div>
        </>
    )
}

