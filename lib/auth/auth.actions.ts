"use server"

import {auth} from "@/lib/better_auth/auth"
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({
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

export const signInWithEmail = async ({email, password,}: SignInFormData) => {

    try {
        console.log("Sending sign up email to Inngest...")
        const response = await auth.api.signInEmail({
            body: {email, password}
        })

        return {success: true, data: response}
    } catch (error) {
        console.error("Sign in failed", error)
        return {success: false, error: "Failed to sign in"}
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers()
        })
    } catch (error) {
        console.error("Sign out failed", error)
        return {success: false, error: "Failed to sign out"}
    }
}