import { supabase } from "../lib/initSupabase"
import { useForm } from "react-hook-form"

export default function Onboard() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const submitOnboard = async () => {

    }

    return (
        <div>
            <form onSubmit={() => handleSubmit(submitOnboard)}>
                
            </form>
        </div>
    )
}
