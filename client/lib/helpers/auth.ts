import { supabase } from "../initSupabase";
import { NextRouter, } from "next/router";

export async function logOut(router: NextRouter): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("there was a problem logging you out")
    } else {
        console.log("logged out successfully");
        router.push("/")
    }
}