import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/initSupabase";

export function SigninForm({ nextPage }: { nextPage: string }) {
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const submitSignin = async (formData:any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if (error) {

    }

    if (data) {
      console.log(data)
      router.push(nextPage)
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
    </form>
  )
}