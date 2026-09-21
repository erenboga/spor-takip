import { Dumbbell, History } from "lucide-react";

interface BottomNavProps
{
    activeTab: "workout" | "history"
    setActiveTab: (tab: "workout" | "history") => void
}

export function BottomNav({activeTab, setActiveTab}: BottomNavProps)
{
    return(
        <div className="fixed bottom-4 left-4 right-4 max-w-sm mx-auto bg-zinc-900/90 
        border border-zinc-800 backdrop-blur-md rounded-2xl p-2 flex justify-around
        items-center shadow-2xl z-50">

            <button
            onClick={() => setActiveTab("workout")}
            className={`flex flex-col items-center py-1 px-4 rounded-xl
            transition ${ activeTab === "workout" ? "text-purple-400 font-semibold" : "text-zinc-500 hover: hover:text-zinc-300"                
            }`}
            >
            <Dumbbell className="w-5 h-5 mb-1"/>
            <span className="text-xs">Antrenman</span>
            </button>


            <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center py-1 px-4 rounded-xl
            transition ${ activeTab === "history" ? "text-purple-400 font-semibold": "text-zinc-500 hover:text-zinc-300"
            }`}
            >
                <History className="h-5 w-5 mb-1"/>
                <span className="text-xs">Geçmiş</span>
            </button>
        </div>
    )
}