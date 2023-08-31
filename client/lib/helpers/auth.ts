import { supabase } from "../initSupabase";
import { NextRouter, } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

export async function logOut(router: NextRouter): Promise<void> {
    const { setLoggedOut } = useContext(UserContext)
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("there was a problem logging you out")
    } else {
        console.log("logged out successfully");
        setLoggedOut()
        router.push("/")
    }
}