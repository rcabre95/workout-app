import { useRouter } from "next/router";
import { supabase } from "../lib/initSupabase";
import { useEffect, useState } from "react";
import type { Database } from "../lib/database.types";

export default function ClientDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<Database['public']['Tables']['clients']['Row']['id']>();
    const [userData, setUserData] = useState<any>();

    useEffect(() => {
        supabase.auth.getSession().then(d => {
            if (d.data) {
                setUser(d.data.session?.user.id)
            }
            if (d.error) {
                console.log("error retrieving id")
            }
        }).then(d => {
            supabase.from('clients').select().eq("id", user).then(u => {
                if (u.data) {
                    console.log(u.data)
                }

                if (u.error) {
                    router.push("/onboard")
                }
            })
        })
    }, [])

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log("there was a problem logging you out.")
        } else {
            console.log("logged out successfully");
            router.push("/")
        }
    }

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={logOut} type="button">Log out</button>
            <pre>{JSON.stringify(user, undefined, 2)}</pre>
        </div>
    )
}
