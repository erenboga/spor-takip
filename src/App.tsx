import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { WorkoutView } from "./components/WorkoutView";
import { HistoryView } from "./components/HistoryView";
import { BottomNav } from "./components/BottomNav";

export default function App()
{
    const [isWorkoutActive, setIsWorkoutActive] = useState(false);
    const [activeTab, setActiveTab] = useState<"workout" | "history">("workout");

    return(
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 pb-24">
            
            {/* 1. Antrenman Sekmesi (Giriş veya Aktif Antrenman) */}
            <div className={activeTab === "workout" ? "w-full flex justify-center" : "hidden"}>
                {isWorkoutActive ? (
                    <WorkoutView onFinishWorkout={() => setIsWorkoutActive(false)} />
                ) : (
                    <HomeScreen onStartWorkout={() => setIsWorkoutActive(true)} />
                )}
            </div>

            {/* 2. Geçmiş Sekmesi */}
            <div className={activeTab === "history" ? "w-full flex justify-center" : "hidden"}>
                <HistoryView />
            </div>

            {/* Sabit Alt Bar */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
    );
}
