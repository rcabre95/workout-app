import { MergeDeep } from "type-fest"
import { Database as DatabaseGenerated } from "./database-generated.types"
export type { Json } from './database-generated.types';

export type Database = MergeDeep<DatabaseGenerated, {
  public: {
    Tables: {
      clients: {
        Row: {
          bodyfat: number | null
          coach_id: string | null
          created_at: string
          email: string | null
          first_name: string
          height: number
          id: string
          last_name: string
          max_bench: number
          max_deadlift: number
          max_ohp: number
          max_squat: number
          phone_number: string | null
          pro_member: boolean
          profile_photo: string | null
          sex: string | null
          weight: number
        }
        Insert: {
          bodyfat?: number | null
          coach_id?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          height: number
          id: string
          last_name: string
          max_bench?: number
          max_deadlift?: number
          max_ohp?: number
          max_squat?: number
          phone_number?: string | null
          pro_member?: boolean
          profile_photo?: string | null
          sex?: string | null
          weight: number
        }
        Update: {
          bodyfat?: number | null
          coach_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          height?: number
          id?: string
          last_name?: string
          max_bench?: number
          max_deadlift?: number
          max_ohp?: number
          max_squat?: number
          phone_number?: string | null
          pro_member?: boolean
          profile_photo?: string | null
          sex?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "clients_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      exercises: {
        Row: {
          exercise_id: number
          id: number
          notes: string | null
          user_id: string | null
          workout_id: number
        }
        Insert: {
          exercise_id: number
          id?: number
          notes?: string | null
          user_id?: string | null
          workout_id: number
        }
        Update: {
          exercise_id?: number
          id?: number
          notes?: string | null
          user_id?: string | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            referencedRelation: "exercises-list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      "exercises-list": {
        Row: {
          exercise_name: string
          id: number
          muscles_worked: string[]
          steps: string[] | null
          video: string | null
        }
        Insert: {
          exercise_name: string
          id?: number
          muscles_worked: string[]
          steps?: string[] | null
          video?: string | null
        }
        Update: {
          exercise_name?: string
          id?: number
          muscles_worked?: string[]
          steps?: string[] | null
          video?: string | null
        }
        Relationships: []
      }
      sets: {
        Row: {
          attempted_reps: number | null
          exercise_id: number
          id: number
          performed_at: string
          reps: number
          rpe: number
          user_id: string | null
          weight: number
          workout_id: number
        }
        Insert: {
          attempted_reps?: number | null
          exercise_id: number
          id?: number
          performed_at?: string
          reps: number
          rpe: number
          user_id?: string | null
          weight: number
          workout_id: number
        }
        Update: {
          attempted_reps?: number | null
          exercise_id?: number
          id?: number
          performed_at?: string
          reps?: number
          rpe?: number
          user_id?: string | null
          weight?: number
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sets_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      trainers: {
        Row: {
          clients: string[]
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          pro: boolean
          profile_photo: string | null
          sex: string | null
        }
        Insert: {
          clients: string[]
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          pro?: boolean
          profile_photo?: string | null
          sex?: string | null
        }
        Update: {
          clients?: string[]
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          pro?: boolean
          profile_photo?: string | null
          sex?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          ended_at: string | null
          focus: string | null
          id: number
          notes: string | null
          program: string | null
          started_at: string
          user_id: string | null
        }
        Insert: {
          ended_at?: string | null
          focus?: string | null
          id?: number
          notes?: string | null
          program?: string | null
          started_at?: string
          user_id?: string | null
        }
        Update: {
          ended_at?: string | null
          focus?: string | null
          id?: number
          notes?: string | null
          program?: string | null
          started_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
>