import { supabase } from "../lib/initSupabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClientOnboarding from "../components/auth-forms/ClientOnboarding";
import TrainerOnboarding from "../components/auth-forms/TrainerOnboarding";
import { logOut } from "../lib/helpers/auth";

export type AccountType = "trainer" | "client" | null
export interface TName {
    first_name: string;
    last_name: string;
}

// fix "any" types

export default function Onboard() {
    const router = useRouter();
    const [accountType, setAccountType] = useState<AccountType>();
    const [page, setPage] = useState<number>(1);
    const [userId, setUserId] = useState<string>("");
    const [name, setName] = useState<TName | null>(null)

    const selectTrainer = () => {
        setAccountType("trainer");
        setPage(2);
    }

    const selectClient = () => {
        setAccountType("client");
        setPage(2);
    }

    const updateSupabaseAccType: () => Promise<void> = async () => {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                last_name: name?.last_name,
                first_name: name?.first_name,
                accnt_type: accountType
            }
        })
        if (error) { console.log(error) };
        if (data) { console.log(data) };
    }

    useEffect(() => {
        supabase.auth.getSession().then(d => {
            console.log(d)
            if (d.data.session) {
                console.log("session is active")
                console.log(d.data.session.user.id)
                setUserId(d.data.session.user.id);
                setName(d.data.session.user.user_metadata as TName);
                supabase.from('clients')
                        .select()
                        .eq('id', d.data.session.user.id)
                        .then(d => {
                            if (d.data) {
                                if (d.data.length > 0) {
                                    console.log("already exists in clients");
                                    router.push("/dashboard")
                                }
                            }
                        });

                supabase.from('trainers')
                        .select()
                        .eq('id', d.data.session.user.id)
                        .then(d => {
                            if (d.data) {
                                if (d.data.length > 0) {
                                    console.log("already exists in trainers");
                                    router.push("/dashboard")
                                }
                            }
                        });
                
            } else {
                console.log("there was an error...")
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
                {/* <span>{userId}</span> */}
            </div>

            {
            accountType === "trainer" ? 
                <TrainerOnboarding accType={accountType} updateSupabaseAccType={updateSupabaseAccType} />
            : accountType === "client" ?
                <ClientOnboarding accType={accountType} userId={userId} updateSupabaseAccType={updateSupabaseAccType} />
            : null
            }

            <button onClick={() => logOut(router)} type="button">Log out</button>
        </div>
    )
}