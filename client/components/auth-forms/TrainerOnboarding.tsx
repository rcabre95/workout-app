import { useForm } from "react-hook-form";

export default function TrainerOnboarding() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submit = async (formData: any) => {
        console.log(formData);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="fNameInput"></label>
            <input id="fNameInput" {...register("fName", {
                required: "Please enter your first name.",
                minLength: {
                    value: 2,
                    message: "Your first name must contain at least 2 characters."
                },
                maxLength: {
                    value: 30,
                    message: "Your first name must contain no more than 30 characters."
                }
            })} />

            <label htmlFor="lNameInput"></label>
            <input id="lNameInput" {...register("lName", {
                required: "Please enter your last name.",
                minLength: {
                    value: 2,
                    message: "Your last name must contain at least 2 characters."
                },
                maxLength: {
                    value: 30,
                    message: "Your last name must contain no more than 30 characters."
                }
            })} />

            <label htmlFor="sexInput"></label>
            <select id="sexInput" {...register("sex", {
                required: "Please enter your sex",
            })}>
                <option value="f">Female</option>
                <option value="m">Male</option>
                <option value="o">Other</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}