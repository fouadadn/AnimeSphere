import { X, Menu, Search } from "lucide-react"
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Nav() {
    const [displayNav, setDisplayNav] = useState(false)
    const [displaySearch, setdisplaySearch] = useState(false)
    const [searchResults, setsearchResults] = useState([])
    const location = useLocation()

    const handleNavDisplay = () => {
        setDisplayNav(!displayNav)
    }


    const handleSearch = (e) => {
        const searchvalue = e.target.value
        setdisplaySearch(searchvalue === '' ? false : true)

        if (searchvalue.length >= 3) {

            fetch(`https://api.jikan.moe/v4/anime?q=${searchvalue}`)
                .then(res => res.json())
                .then(res => setsearchResults(res.data))
        }

    }

    return (
        <>
            <header className="relative lg:fixed z-[999] flex flex-col flex-wrap items-center lg:justify-start px-2 lg:px-10  lg:flex-nowrap text-sm py-2 text-white w-full">
                <nav className={`max-w-[95rem] w-full   px-4 lg:flex md:items-center md:justify-between backdrop-blur-xl bg-[#58585861] rounded-xl  overflow-hidden transition-all duration-700 ease-in-out h-16  ${displayNav ? 'h-[190px] lg:h-16' : ''} py-4`}>
                    <div className={`flex items-center justify-between duration-500`}>
                        <NavLink to='/'>
                            <h1 className="text-2xl font-bold caesar-dressing-regular text-nowrap">Anime Shpere</h1>
                        </NavLink>
                        <button className='lg:hidden border-[1px] border-stone-400 rounded-lg p-1 hover:bg-stone-500 duration-200' onClick={handleNavDisplay}>
                            {displayNav ? < X color='white' className='t9iil' size={20} /> : <Menu color='white' className='t9iil' size={20} />}
                        </button>
                    </div>
                    <div className="flex justify-between flex-col lg:flex-row w-full gap-5 lg:gap-0">
                        <div className="text-white  flex flex-col gap-5 pb-2 mt-5 lg:flex-row lg:items-center lg:justify-end lg:mt-0 md:ps-5 ">
                            <div className="flex gap-4 text-lg justify-around">
                                <NavLink to={'/'} className={`hover:text-stone-400 duration-300 ${location.pathname === '/' ?'border-b-[1px] ' : ''}`} href="">Home</NavLink>
                                <a className="hover:text-stone-400 duration-300" href="">Catalog</a>
                                <a className="hover:text-stone-400 duration-300" href="">News</a>
                                <a className="hover:text-stone-400 duration-300" href="">Collection</a>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex bg-[#4f4f4f77] items-center pl-2 rounded-lg  gap-2 border-[1px] border-gray-400 ">
                                <Search color="white" size={18} />
                                <input onFocus={() => { setdisplaySearch(true) }} onChange={handleSearch} type="search" name="" id="search" className="bg-transparent outline-none py-[10px] px-3 w-48 lg:w-96 text-white" placeholder="Search" />
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-stone-800 px-4 py-3 rounded-xl text-nowrap">Log in</button>
                                <button className="bg-white rounded-xl px-4 py-3 text-black text-nowrap hidden sm:block ">Get Started</button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={`h-96 lg:w-[51%] z-50 rounded-bl-xl rounded-br-xl lg:absolute top-[72px] px-3 right-10 overflow-auto ${displaySearch ? 'black' : 'hidden'}  backdrop-blur-xl bg-[#58585861]  
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full 
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-[#7300FF10]
                    dark:[&::-webkit-scrollbar-thumb]:bg-white`} >
                    {
                        searchResults?.map((anime =>
                            <NavLink to={`/anime/${anime?.mal_id}`} >
                                <div className="flex gap-2 my-3" onClick={() => { setdisplaySearch(false); document.querySelector('#search').value = '' }}>
                                    <img src={anime?.images?.jpg?.large_image_url} alt="" className="w-32 rounded-xl" />
                                    <h1 className="text-2xl font-medium">{anime?.title}</h1>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
                <div className={` w-lvw h-lvh absolute top-0 left-0 ${displaySearch ? 'black' : 'hidden'} `} onClick={() => { setdisplaySearch(false) }}>

                </div>
            </header>
        </>
    )
}