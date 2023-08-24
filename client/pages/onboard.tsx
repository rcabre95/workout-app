import { supabase } from "../lib/initSupabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClientOnboarding from "../components/auth-forms/ClientOnboarding";
import TrainerOnboarding from "../components/auth-forms/TrainerOnboarding";

export type AccountType = "trainer" | "client" | null

// fix "any" types

export default function Onboard() {
    const router = useRouter();
    const [accountType, setAccountType] = useState<AccountType>();
    const [page, setPage] = useState<number>(1);
    const [userId, setUserId] = useState<any>();
    const [name, setName] = useState<any>(null)

    const selectTrainer = () => {
        setAccountType("trainer");
        setPage(2);
    }

    const selectClient = () => {
        setAccountType("client");
        setPage(2);
    }

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log("there was a problem logging you out.")
        } else {
            console.log("logged out successfully");
            router.push("/")
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(d => {
            if (d.error) {
                console.log("user not logged in...")
                router.push("/")
            }
            if (d.data) {
                setUserId(d.data.session?.user.id)
                setName(d.data.session?.user.user_metadata)
            }
        })
    }, [])

    return (
        <div>
            <div>
                <h4 >Are you a trainer or a client?</h4>
                <button className="border-1 border-blue-300 bg-slate-400 p-3" type="button" onClick={selectTrainer}>
                    Trainer
                </button>
                <button className="border-1 border-blue-300 bg-slate-400 p-3" type="button" onClick={selectClient}>
                    Client
                </button>
            </div>

            {
            accountType === "trainer" ? 
                <TrainerOnboarding />
            : accountType === "client" ?
                <ClientOnboarding />
            : null
            }

            <button onClick={logOut} type="button">Log out</button>
        </div>
    )
}