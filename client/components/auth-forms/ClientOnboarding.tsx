import { useForm } from "react-hook-form";

export default function ClientOnboarding() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submit = async (formData: any) => {
        console.log(formData)
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <label htmlFor="fNameInput">First Name</label>
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

            <label htmlFor="lNameInput">Last Name</label>
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

            <label htmlFor="sexInput">Sex</label>
            <select id="sexInput" {...register("sex", {
                required: "Please enter your sex",
            })}>
                <option value="f">Female</option>
                <option value="m">Male</option>
                <option value="o">Other</option>
            </select>

            <label htmlFor="heightInput">Height</label>
            <input type="number" id="heightInput" {...register("height", {
                required: "Please enter your height.",
                valueAsNumber: true,
                max: {
                    value: 100,
                    message: "Please lower the height."
                },
                min: {
                    value: 12,
                    message: "Please increase the height."
                }
            })} />

            <label htmlFor="weightInput">Weight</label>
            <input type="number" id="weightInput" {...register("weight", {
                required: "Please enter your weight.",
                valueAsNumber: true,
                max: {
                    value: 1000,
                    message: "Please lower the weight."
                },
                min: {
                    value: 70,
                    message: "Please increase the weight."
                }
            })} />

            <label htmlFor="maxSquatInput">Max Squat</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input type="number" id="maxSquatInput" {...register("maxSquat", {
                required: "Please enter your biggest squat in lbs.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />

            <label htmlFor="maxBenchInput">Max Bench</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input type="number" id="maxBenchInput" {...register("maxBench", {
                required: "Please enter your biggest bench in lbs.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />

            <label htmlFor="maxDeadliftInput">Max Deadlift</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input type="number" id="maxDeadliftInput" {...register("maxDeadlift", {
                required: "Please enter your biggest deadlift in lbs.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />

            <label htmlFor="maxOHPInput">Max Overhead Press</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input type="number" id="maxOHPInput" {...register("maxOHP", {
                required: "Please enter your biggest overhead press in lbs.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />

            <button type="submit">Submit</button>
        </form>
    )
}