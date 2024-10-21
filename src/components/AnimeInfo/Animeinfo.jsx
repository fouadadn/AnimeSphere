import { Bookmark } from "lucide-react"

export default function AnimeInfo({title , overview , mal_id}) {
    return (
        <div className="w-[400px] ">

            <h1 className="text-3xl font-bold">{title}</h1>
            <p>
                {String(overview).split(' ').slice(0 , 20).join(' ')}
            </p>

            <div className="flex gap-3 mt-3">
                <button className="px-4 py-2 rounded-xl font-bold bg-white text-black ">learn More</button>
                <button className="flex bg-stone-800 text-white font-bold px-4 py-2 rounded-lg">
                    <Bookmark color="white" />
                    <span>To Watch</span>
                </button>
            </div>
        </div>
    )
}