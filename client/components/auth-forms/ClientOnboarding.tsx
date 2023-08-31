import { SubmitHandler, useForm } from "react-hook-form";
import { lbsToKgs, inchesToMeters } from "../../lib/helpers/conversions";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/initSupabase";
import { useRouter } from "next/router";
import { Database } from "../../lib/database.types";
import type { AccountType } from "../../pages/onboard";



export default function ClientOnboarding({ userId, accType, updateSupabaseAccType }: { userId: string, accType: AccountType, updateSupabaseAccType: () => Promise<void> }) {

    const router = useRouter();
    const [inMetric, setInMetric] = useState<boolean>(false);
    // const [userId, setUserId] = useState<any>(null);
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors }, reset } = useForm<Database['public']['Tables']['clients']['Row']>();

    const submit = async (formData: Database['public']['Tables']['clients']['Insert']) => {
        console.log("submitted data");

        await updateSupabaseAccType()
        const { data, error } = await supabase.from('clients').select().eq('id', userId);
        console.log(data)
        if (data) {
            if (data.length > 0) {
                setIsDuplicate(true);
                return;
            } else {
            if (inMetric) {
                const { error } = await supabase.from('clients').insert(formData);
                if (error) {
                    console.log(error);
                    return;
                } else {
                    console.log("client added successfully!")
                    router.push("/dashboard")
                }
            } else {
                const metricFormData: Database['public']['Tables']['clients']['Insert'] = {
                    bodyfat: formData.bodyfat,
                    dob: formData.dob,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    height: inchesToMeters(formData.height),
                    weight: lbsToKgs(formData.weight),
                    sex: formData.sex,
                    id: userId,
                    max_bench: lbsToKgs(formData.max_bench),
                    max_squat: lbsToKgs(formData.max_squat),
                    max_deadlift: lbsToKgs(formData.max_deadlift),
                    max_ohp: lbsToKgs(formData.max_ohp)
                }

                const { error } = await supabase.from('clients').insert(metricFormData);
                if (error) {
                    console.log(error);
                    return;
                } else {
                    console.log("client added successfully!")
                    // router.push("/dashboard")
                }
            }
        }
        } 
    }

    useEffect(() => {
        reset(); // TODO: eventually change this so that it only resets non-name fields
    }, [inMetric])

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <h1>{lbsToKgs(230)}</h1>
            <label htmlFor="fNameInput">First Name</label>
            <input className="border-1 border-green-600" id="fNameInput" {...register("first_name", {
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
            <input className="border-1 border-green-600" id="lNameInput" {...register("last_name", {
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

            <label htmlFor="dobInput">Date of birth</label>
            <input type="date" id="dobInput"
                {...register("dob", {
                    required: "please enter your date of birth.",
                    valueAsDate: true
                })}
            />

            <button onClick={() => { setInMetric(!inMetric) }} type="button">
                {inMetric ? "Switch to imperial measurements" : "Switch to metric measurements"}
            </button>
            <label htmlFor="sexInput">Sex</label>
            <select id="sexInput" {...register("sex", {
            })}>
                <option value="f">Female</option>
                <option value="m">Male</option>
                <option value="o">Other</option>
            </select>
            <span>{errors.sex ? JSON.stringify(errors.sex) : null}</span>

            <label htmlFor="heightInput">Height</label>
            <input className="border-1 border-green-600" type="number" id="heightInput" {...register("height", {
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
            <span>{inMetric ? "meters" : "inches"}</span>
            <span>{errors.height ? JSON.stringify(errors.height) : null}</span>

            <label htmlFor="weightInput">Weight</label>
            <input className="border-1 border-green-600" type="number" id="weightInput" {...register("weight", {
                required: "Please enter your weight.",
                valueAsNumber: true,
                max: {
                    value: 1000,
                    message: "Please lower the weight."
                },
                min: {
                    value: 0,
                    message: "Please increase the weight."
                }
            })} />
            
            <span>{inMetric ? "kgs" : "lbs"}</span>
            <span>{errors.weight ? JSON.stringify(errors.weight) : null}</span>

            <label htmlFor="bfpInput">Bodyfat %</label>
            <input type="number" id="bfpInput"
            {...register("bodyfat", {
                required: false,
                valueAsNumber: true,
                min: {
                    value: 0,
                    message: "please increase the bodyfat percentage."
                },
                max: {
                    value: 100,
                    message: "i'm almost certain that you are not at this bodyfat percentage."
                }
            })}
            />
            <span>{errors.bodyfat ? JSON.stringify(errors.bodyfat) : null}</span>

            <label htmlFor="maxSquatInput">Max Squat</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input className="border-1 border-green-600" type="number" id="maxSquatInput" {...register("max_squat", {
                valueAsNumber: true,
                required: "Please enter the weight of your biggest squat.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />
            <span>{inMetric ? "kgs" : "lbs"}</span>
            <span>{errors.max_squat ? JSON.stringify(errors.max_squat) : null}</span>


            <label htmlFor="maxBenchInput">Max Bench</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input className="border-1 border-green-600" type="number" id="maxBenchInput" {...register("max_bench", {
                valueAsNumber: true,
                required: "Please enter the weight of your biggest bench.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />
            <span>{inMetric ? "kgs" : "lbs"}</span>
            <span>{errors.max_bench ? JSON.stringify(errors.max_bench) : null}</span>

            <label htmlFor="maxDeadliftInput">Max Deadlift</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input className="border-1 border-green-600" type="number" id="maxDeadliftInput"
            {...register("max_deadlift", {
                valueAsNumber: true,
                required: "Please enter the weight of your biggest deadlift.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />
            <span>{inMetric ? "kgs" : "lbs"}</span>
            <span>{errors.max_deadlift ? JSON.stringify(errors.max_deadlift) : null}</span>

            <label htmlFor="maxOHPInput">Max Overhead Press</label>
            <p>You can enter 0 if you don&apos;t know. This can be figured out and entered in later.</p>
            <input className="border-1 border-green-600" type="number" id="maxOHPInput" {...register("max_ohp", {
                valueAsNumber: true,
                required: "Please enter the weight of your biggest overhead press.",
                min: {
                    value: 0,
                    message: "Please enter a valid weight."
                },
                max: {
                    value: 5000,
                    message: "Please enter a valid weight."
                }
            })} />
            <span>{inMetric ? "kgs" : "lbs"}</span>
            <span>{errors.max_ohp ? JSON.stringify(errors.max_ohp) : null}</span>


            {/* <div>Errors: {JSON.stringify(errors)}</div> */}

            <button type="submit">Submit</button>
        </form>
    )
}