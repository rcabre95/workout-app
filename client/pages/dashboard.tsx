import ClientDashboard from "../components/ClientDashboard";
import { supabase } from "../lib/initSupabase";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { logOut } from "../lib/helpers/auth";
import { TUser, UserContext } from "./_app";

// TODO: create "are you still logged in" functionality and component
export default function Dashboard() {
    const router = useRouter();
    const { user, setLoggedIn } = useContext(UserContext);

    useEffect(() => {
        supabase.auth.getSession().then(d => {
            console.log(d)
            if (d.data.session != null) {
                const userData: TUser = {
                    userId: d.data.session.user.id,
                    userAccType: d.data.session.user.app_metadata.accnt_type
                }
                supabase.from(user.userAccType as string).select().eq("id", user.userId as string).then(u => {
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
