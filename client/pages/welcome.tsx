import { supabase } from "../lib/initSupabase"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { first_name, last_name } = context.query;

    

    return {
        props: {
            firstName: first_name,
            lastName: last_name
        }
    }
}

export default function welcome({ firstName, lastName }: { firstName: string, lastName: string}) {
    const router = useRouter();

    useEffect(() => {
        if (!firstName || !lastName) {
            router.push("/dashboard")
        }
    }, [])

    return (
        <div>
            <h1>Hey, {firstName}!</h1>
            <p>Welcome to the platform.</p>
            <Link href={'/dashboard'}>
                <button type="button">Go to Dashboard</button>
            </Link>
            
            <button type="button">Log out</button>
        </div>
    )
}
