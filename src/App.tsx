import { useState } from "react"
import { Dumbbell, Flame, Trophy, ChevronLeft } from "lucide-react"
import {db, type WorkoutSet} from "./db"

export default function App()
{
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [exerciseName, setExerciseName] = useState("")
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [completedSets, setCompletedSets] = useState<WorkoutSet[]>([])

  async function setiKaydet()
  {
      if(!weight || !reps || !exerciseName)  return;

      const myWorkoutSet: WorkoutSet = 
      {
        exerciseName: exerciseName,
        weight: Number(weight),
        reps: Number(reps),
        date: new Date().toISOString()
      }
      
  await db.sets.add(myWorkoutSet);
  setCompletedSets([...completedSets,myWorkoutSet])
  }


  if (isWorkoutActive) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-purple-400">Antrenman Başladı</h2>
          
          <div className="text-purple-400 font-semibold text-sm mb-2">
          {completedSets.length + 1}. Set
          </div>

          
          {/* Hareket Adı Girişi */}
          <input type="text" placeholder="Hareket Adı" value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)} 
          className="w-full bg-zinc-950 border border-zinc-700
          rounded-xl p-3 text-white mb-4"/>
            
          {/* Set Ağırlık Girişi */}
          <div className="grid grid-cols-2 gap-3 w-full">
              <input type="number" placeholder="Ağırlık" value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700
                rounded-xl p-3 text-white mb-4"/>
              <input type="number" placeholder="Tekrar" value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700
              rounded-xl p-3 text-white mb-4"/>
          </div>

          <button
          onClick={setiKaydet}
          className="bg-purple-600 hover:bg-purple-500 w-full
          text-white font-semibold py-3 rounded-xl active:scale-95
          transition mb-3">
            Seti Kaydet</button>
            
          {
            completedSets.map((item,index)=>
            (
              <div key={index}
              className="w-full bg-zinc-950/60
              border border-zinc-800 rounded-xl p-2.5 px-4 mb-2 flex items-center
              justify-between">
                <span>{index + 1}. Set</span>
                <span>{item.reps} Tekrar {item.weight} kg</span>
                
              </div>
            ))
            
          }


          {/* Geri Dönüş Butonu */}
          <button
            onClick={() => setIsWorkoutActive(false)}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5 text-purple-400 items-center mt-0.5"/>
            <span className="-ml-1.5">Ana Ekrana Dön</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      
      {/* 1. ANA KART ÇERÇEVESİ */}
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

        {/* Buton */}
        <button onClick = {() => setIsWorkoutActive(true)}
        className="w-full bg-purple-600 hover:bg-purple-500 active:scale-95 
        transition text-white font-semibold py-3.5 rounded-xl shadow-lg 
        shadow-purple-900/30">
          Antrenmana Başla
        </button>

      </div>

    </div>
  )
}

