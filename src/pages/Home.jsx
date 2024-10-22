import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AnimeInfo from "../components/AnimeInfo/Animeinfo";
import { Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer/Footer";

// Import Swiper styles
import 'swiper/css';

export default function Home() {
    const [Random, setRandom] = useState([]);
    const [trending, settrending] = useState([]);
    const [animeIndex, setAnimeIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        const fetchSpecialForYou = async () => {
            await fetch('https://api.jikan.moe/v4/seasons/now')
                .then(res => res.json())
                .then(res => setRandom(res.data))
        }
        fetchSpecialForYou();

        const fetchTrendingNow = async () => {
            await fetch('https://api.jikan.moe/v4/top/anime')
                .then(res => res.json())
                .then(res => settrending(res.data))
        }
        setTimeout(() => {
            fetchTrendingNow();
        }, 1100);
    }, []);

    const Random6 = Random.slice(0, 7);

    // Handle slide change with slight delay for smooth animation
    const handleSlideChange = (i) => {
        setShowInfo(false);  // Hide the current AnimeInfo
        setTimeout(() => {
            setAnimeIndex(i.activeIndex); // Change the anime index after the fade-out
            setShowInfo(true);  // Show the new AnimeInfo
        }, 300);  // Delay of 300ms (matching the transition duration)
    };

    return (
        <div className="">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000 }}
                onSlideChange={handleSlideChange}
            >
                {

                    Random6.map((animeBackdrop) =>
                        <SwiperSlide key={animeBackdrop.mal_id}>
                            <div className="max-h-[600px]">
                                <img src={animeBackdrop?.trailer?.images?.maximum_image_url} alt="" className="w-full brightness-75" />
                            </div>
                        </SwiperSlide>
                    )
                }
                {Random6.map((anime, i) => (
                    <div
                        key={anime.mal_id}
                        className={`absolute z-[99] text-white bottom-5 left-3 lg:left-10 transition-opacity duration-300 ease-in-out
                    ${animeIndex === i && showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        {animeIndex === i && (
                            <AnimeInfo title={anime?.titles[0]?.title} overview={anime?.synopsis} id={anime?.mal_id}/>
                        )}
                    </div>
                ))}
            </Swiper>
            <div className="px-4 xl:px-32 mt-3">
                <div>
                    <h1 className="text-white text-2xl font-bold">New released</h1>
                    <div className="flex gap-6 relative top-0  lg:bottom-20 z-50 overflow-auto py-3
                    [&::-webkit-scrollbar]:h-1
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
                    dark:[&::-webkit-scrollbar-thumb]:bg-white">

                        {
                            Random?.map((anime) =>
                                <NavLink to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="relative h-56 rounded-xl overflow-hidden group flex-shrink-0">
                                    <img src={`${anime.images.jpg.image_url}`} alt="" className="w-40 group-hover:brightness-50 duration-300" />
                                    <div className="absolute bottom-0 w-full opacity-0 hover:opacity-100 duration-300 h-full flex flex-col items-center justify-between">
                                        <div className="text-white flex gap-2 bg-slate-900 py-1 px-2 rounded-br-xl rounded-bl-xl items-center">
                                            <Star size={15} color="gray" />
                                            <span>{anime.score}</span>
                                        </div>
                                        <h1 className="text-white w-40 font-bold text-xl text-center">{anime?.titles[0]?.title}</h1>
                                    </div>
                                </NavLink>
                            )
                        }
                    </div>
                </div>

                <div className="mt-16">
                    <h1 className="text-white text-2xl font-bold">Trending Now</h1>
                    <div className="flex gap-6  relative top-0  lg:bottom-20 z-50 overflow-auto py-3
                    [&::-webkit-scrollbar]:h-1
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
                    dark:[&::-webkit-scrollbar-thumb]:bg-white">
                        {
                            trending?.map((anime) =>
                                <NavLink to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="relative h-56 rounded-xl overflow-hidden group flex-shrink-0">
                                    <img src={`${anime.images.jpg.image_url}`} alt="" className="w-40 group-hover:brightness-50 duration-300" />
                                    <div className="absolute bottom-0 w-full opacity-0 hover:opacity-100 duration-300 h-full flex flex-col items-center justify-between">
                                        <div className="text-white flex gap-2 bg-slate-900 py-1 px-2 rounded-br-xl rounded-bl-xl items-center">
                                            <Star size={15} color="gray" />
                                            <span>{anime.score}</span>
                                        </div>
                                        <h1 className="text-white w-40 font-bold text-xl text-center">{anime?.titles[0]?.title}</h1>
                                    </div>
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
