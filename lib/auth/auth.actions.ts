"use server"

import {auth} from "@/lib/better_auth/auth"
import {inngest} from "@/lib/inngest/client";

export const signUpWitEmail = async ({
                                         email,
                                         password,
                                         fullName,
                                         country,
                                         investmentGoals,
                                         riskTolerance,
                                         preferredIndustry
                                     }: SignUpFormData) => {
    try {
        console.log("Sending sign up email to Inngest...")
        const response = await auth.api.signUpEmail({
            body: {email: email, password: password, name: fullName}
        })

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    preferredIndustry,
                    riskTolerance
                }
            })
        }

        return {success: true, data: response}
    } catch (error) {
        console.error("Sign up failed", error)
        return {success: false, error: "Failed to sign up"}
    }
}