import { useRouter } from "next/router";
import { supabase } from "../lib/initSupabase";
import { useCallback, useEffect, useState } from "react";
import type { Database } from "../lib/database.types";

export default function ClientDashboard({ logOut }: { logOut: () => Promise<void> }) {
    const router = useRouter();
    const [user, setUser] = useState<Database['public']['Tables']['clients']['Row']['id']>();
    const [userData, setUserData] = useState<any>();

    return (
        <div>
            <h1>Hello</h1>
            <button onClick={logOut} type="button">Log out</button>
            <pre>{JSON.stringify(user, undefined, 2)}</pre>
        </div>
    )
}
