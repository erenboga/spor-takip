import Dexie from "dexie";
import { type Table } from "dexie";

export interface WorkoutSet
{
    id?: number
    exerciseName: string
    weight: number
    reps: number
    date: string
}

export class GymDatabase extends Dexie
{
    sets!: Table<WorkoutSet>    
    constructor()
    {
        super("SporTakipDB")
        this.version(1).stores
        (
        {
            sets: "++id, exerciseName, date"
        }
        )    
    }
}

export const db = new GymDatabase()