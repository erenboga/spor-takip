import { Dumbbell, Flame, Trophy } from "lucide-react";

interface HomeScreenProps
{
    onStartWorkout: () => void;
}

export function HomeScreen({ onStartWorkout }: HomeScreenProps)
{
    return(
        <div className="w-full max-w-sm bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            
            {/* İkon Kutusu */}
            <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-2xl mb-4">
                <Dumbbell className="w-8 h-8 text-purple-400" />
            </div>

            {/* Başlık ve Açıklama */}
            <h1 className="text-2xl font-bold tracking-tight mb-1">Spor Takip</h1>
            <p className="text-zinc-400 mb-6 text-center text-xs">
                Kişisel antrenman ve gelişim günlüğün hazır!
            </p>

            {/* 2. YAN YANA İKİ İSTATİSTİK KARTI (Grid) */}
            <div className="w-full grid grid-cols-2 gap-3 mb-6">
                
                {/* Sol Kart (Alev - Seri) */}
                <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-2xl p-3 flex items-center gap-3">
                    <Flame className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                        <span className="text-[10px] text-zinc-500 block font-medium">Bu Hafta</span>
                        <span className="text-sm font-bold text-zinc-200">3 Gün</span>
                    </div>
                </div>

                {/* Sağ Kart (Kupa - PR) */}
                <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-2xl p-3 flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                        <span className="text-[10px] text-zinc-500 block font-medium">PR</span>
                        <span className="text-sm font-bold text-zinc-200">85 kg</span>
                    </div>
                </div>

            </div>

            {/* Antrenmana Başla Butonu */}
            <button
                onClick={onStartWorkout}
                className="w-full bg-purple-600 hover:bg-purple-500 active:scale-95 transition text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-900/30"
            >
                Antrenmana Başla
            </button>

        </div>
    )
}
