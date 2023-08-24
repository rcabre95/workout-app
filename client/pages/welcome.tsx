import { SigninForm } from "../components/SigninForm";
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function welcome() {
    const router = useRouter();

    // useEffect(() => {
    //     if (!firstName || !lastName) {
    //         router.push("/dashboard")
    //     }
    // }, [])

    return (
        <div>
            <h3>Welcome to the platform.</h3>
            <h1>Please sign in to continue.</h1>
            <SigninForm nextPage="/onboard" />
        </div>
    )
}

// if already onboarded, page should redirect to respective dashboard
