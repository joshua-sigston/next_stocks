"use client"

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/input_field";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/footer_link";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        }, mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="form-title">Log Into Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
                <InputField name="email"
                            label="Email"
                            placeholder="johndoe@example.com"
                            register={register}
                            error={errors.email}
                            validation={{
                                required: "Email is required",
                                pattern: /^\w+@\w+\.\w+$/,
                                message: "Email address is required"
                            }}
                />
                <InputField name="password"
                            label="Enter a strong password"
                            placeholder="Enter a strong password"
                            type="password"
                            register={register}
                            error={errors.password}
                            validation={{required: "Password is required", minLength: 8}}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Signing In" : "Sign In"}
                </Button>
                <FooterLink text="Create Account" linkText="Create Account" href="/sign-up"/>
            </form>
        </>
    )
}
export default SignIn
