import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { WorkoutView } from "./components/WorkoutView";
import { HistoryView } from "./components/HistoryView";
import { BottomNav } from "./components/BottomNav";

export default function App()
{
    const [hasActiveWorkout, setHasActiveWorkout ] = useState(false);
    const [isWorkoutViewOpen, setIsWorkoutViewOpen ] = useState(false);
    const [activeTab, setActiveTab] = useState<"workout" | "history">("workout");

    return(
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col 
        items-center justify-center p-4 pb-24">

            <div className={activeTab === "workout" ? "w-full flex justify-center" : "hidden"}>
                
                <div className={!isWorkoutViewOpen ? "w-full flex justify-center" : "hidden"}>
                    <HomeScreen
                        hasActiveWorkout={hasActiveWorkout}
                            onStartWorkout={() => {
                                setHasActiveWorkout(true);
                                setIsWorkoutViewOpen(true);
                            }}/>
                </div>
                
                <div className={isWorkoutViewOpen ? "w-full flex justify-center" : "hidden"}>
                    <WorkoutView
                    onMinimize={() => setIsWorkoutViewOpen(false)}
                    />
                </div>
            </div>

            <div className={activeTab === "history" ? "w-full flex justify-center" : "hidden"} >      
                <HistoryView/>
            </div>
            
            <BottomNav activeTab={activeTab}
            setActiveTab={setActiveTab}/>

        </div>
    );
}
