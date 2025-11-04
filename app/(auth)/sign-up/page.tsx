"use client"

import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import InputField from "@/components/forms/input_field";
import Select_field from "@/components/forms/select_field";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/country_select";
import FooterLink from "@/components/forms/footer_link";


const Page = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        }, mode: 'onBlur'
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField name="fullName"
                            label="Full Name"
                            placeholder="John Doe"
                            register={register}
                            error={errors.fullName}
                            validation={{required: "Full name is required", minLength: 2}}
                />
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
                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />
                <Select_field
                    name="Investment Goals"
                    label="Investment Goals"
                    placeholder="Select Your Investment Goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                <Select_field
                    name="Preferred Industry"
                    label="Preferred Industry"
                    placeholder="Select Your Preferred Industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />
                <Select_field
                    name="Risk Tolerance"
                    label="Risk Tolerance"
                    placeholder="Select Your Risk Level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Creating Account" : "Start your investment journey"}
                </Button>
                <FooterLink text="Already have an account?" linkText="Sing In" href="/sign-in"/>
            </form>
        </>
    )
}
export default Page
