import ClientDashboard from "../components/ClientDashboard";
import { supabase } from "../lib/initSupabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Database } from "../lib/database.types";
import { logOut } from "../lib/helpers/auth";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<Database['public']['Tables']['clients']['Row']['id']>();
    const [userData, setUserData] = useState<any>();

    useEffect(() => {
        supabase.auth.getSession().then(d => {
            console.log(d)
            if (d.data.session != null) {
                setUser(d.data.session?.user.id)
                supabase.from('clients').select().eq("id", user).then(u => {
                if (u.data) {
                    console.log(u.data)
                }

                if (u.error) {
                    router.push("/onboard")
                }
            })
            } else {
                console.log("you are not logged in")
                router.push("/")
            }
        })
    }, [])

    return (
        <div>
            <ClientDashboard logOut={() => logOut(router)} />
        </div>
    )
}
