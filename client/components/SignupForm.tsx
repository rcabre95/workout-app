import { useForm } from "react-hook-form";
import { supabase } from "../lib/initSupabase";

export function SignupForm() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const submitSignup = async (formData: any) => {
    console.log(formData);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    })

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
  };

  return (
    <form className="flex flex-col bg-cyan-200" onSubmit={handleSubmit(submitSignup)}>
      <label htmlFor='fNameInput' >First Name</label>
      <input id='fNameInput' {...register("fName", {
        required: "You must provide a first name.",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters long."
        },
        maxLength: {
          value: 20,
          message: "First name must not be longer than 20 characters."
        }
      })} />
      <label htmlFor="lNameInput">Last Name</label>
      <input id='lNameInput' {...register("lName", {
        required: "You must provide a last name.",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters long."
        },
        maxLength: {
          value: 20,
          message: "Last name must not be longer than 20 characters."
        }
      })} />
      <label htmlFor="emailInput">Email</label>
      <input id='emailInput' {...register("email", {
        required: "You must provide a valid email address.",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "You must provide a valid email address."
        }

      })} />
      <label htmlFor="passwordInput">Password</label>
      <input id='passwordInput' type="password"
      {...register("password", {
        minLength: {
          value: 8,
          message: "Your password must be at least 8 characters long."
        },
        maxLength: {
          value: 40,
          message: "Your password must not be more than 40 characters long."
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Your password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
        }
      }
      )} />
      <label htmlFor="confirmPassInput">Confirm Password</label>
      <input id='confirmPassInput' type="password"
        {...register("confirmPass", {
          required: "You must confirm your password by typing it again.",
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do not match."
            }
          }
        })} />
      <button type="submit">Sign up</button>
    </form>
  )
}

