import { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { db, type WorkoutSet } from "../db";

interface WorkoutViewProps
{
    onFinishWorkout: () => void;
}

export function WorkoutView({ onFinishWorkout }: WorkoutViewProps)
{
    const [exerciseName, setExerciseName] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [completedSets, setCompletedSets] = useState<WorkoutSet[]>([]);
    const [currentExercise, setCurrentExercise] = useState<string | null>(null);

    function formatExerciseName(text: string)
    {
        const words = text.trim().split(" ");
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedWords.join(" ");
    }

    async function setiKaydet()
    {
        if (!weight || !reps || !exerciseName) return;

        const cleanExerciseName = formatExerciseName(exerciseName);
        setExerciseName(cleanExerciseName);

        const myWorkoutSet: WorkoutSet = 
        {
            exerciseName: cleanExerciseName,
            weight: Number(weight),
            reps: Number(reps),
            date: new Date().toISOString()
        };

        await db.sets.add(myWorkoutSet);
        setCompletedSets([...completedSets, myWorkoutSet]);
    }

    const uniqueExercises = Array.from(new Set(completedSets.map(s => s.exerciseName)));
    const currentExerciseSetCount = completedSets.filter(s => s.exerciseName === exerciseName).length;

    return(
        <div className="w-full max-w-sm bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-purple-400">Antrenman Başladı</h2>
            
            <div className="text-purple-400 font-semibold text-sm mb-2">
                {currentExerciseSetCount + 1}. Set
            </div>

            {/* Hareket Adı Girişi */}
            <input
                type="text"
                placeholder="Hareket Adı"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white mb-4"
            />
            
            {/* Set Ağırlık Girişi */}
            <div className="grid grid-cols-2 gap-3 w-full">
                <input
                    type="number"
                    placeholder="Ağırlık"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white mb-4"
                />
                <input
                    type="number"
                    placeholder="Tekrar"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white mb-4"
                />
            </div>

            <button
                onClick={setiKaydet}
                className="bg-purple-600 hover:bg-purple-500 w-full text-white font-semibold py-3 rounded-xl active:scale-95 transition mb-3"
            >
                Seti Kaydet
            </button>
            
            {
                uniqueExercises.map((exercise) =>
                {
                    const exerciseSets = completedSets.filter(s => s.exerciseName === exercise);
                    const isOpen = (currentExercise === exercise);
                    return(
                        <div key={exercise} className="w-full mb-3">
                            <button 
                                onClick={() => setCurrentExercise(isOpen ? null : exercise)}
                                className="w-full bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 p-3.5 rounded-xl flex items-center justify-between"
                            >
                                <span className="font-semibold text-sm text-zinc-200">
                                    {exercise} ({exerciseSets.length} Set)
                                </span>
                                {
                                    isOpen ? <ChevronUp className="w-4 h-4 text-purple-400" /> : 
                                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                                }
                            </button>

                            {
                                isOpen &&
                                (
                                    <div className="mt-2 flex flex-col gap-1.5">
                                        {
                                            exerciseSets.map((item, index) =>
                                            (
                                                <div
                                                    key={index} 
                                                    className="w-full bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-2.5 px-4 flex items-center justify-between"
                                                >
                                                    <span className="text-xs text-zinc-400">{index + 1}. Set</span>
                                                    <span className="text-xs text-zinc-200">
                                                        {item.weight} kg x {item.reps} Tekrar
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    );
                })
            }

            {/* Geri Dönüş Butonu */}
            <button
                onClick={onFinishWorkout}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
            >
                <ChevronLeft className="w-5 h-5 text-purple-400 items-center mt-0.5" />
                <span className="-ml-1.5">Ana Ekrana Dön</span>
            </button>
        </div>
    );
}