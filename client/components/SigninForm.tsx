import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/initSupabase";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../pages/_app";
import { IUserMetadata } from "../lib/types/user-metadata";

export function SigninForm({ nextPage }: { nextPage: string }) {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { setLoggedIn } = useContext(UserContext)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitSignin = async (formData:any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      setLoginError(error.message)
    }

    if (data.session?.user) {
      setLoggedIn({
        userId: data.session.user.id,
        userAccType: data.session.user.user_metadata.accnt_type
      })
      console.log(data.session);
      router.push("/dashboard")
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitSignin)}>
      <label htmlFor="emailInput">Email</label>
      <input id='emailInput' {...register("email", {
        required: "Please enter your email",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "You must provide a valid email address."
        }
      })} />
      <label htmlFor="passwordInput">Password</label>
      <input id='passwordInput' type="password" {...register("password", {
        required: "Please enter your password"
      })} />
      <button type="submit">Sign in</button>
      <span className="bg-pink-400 w-1/2 h-32">{loginError !== null ? loginError : null}</span>
    </form>
  )
}