'use server'
import { z } from 'zod'
import connectDB from "@/app/lib/db/db";
import bcrypt from "bcryptjs";
import { UserModel } from '@/app/lib/db/model/users';
import { redirect } from 'next/navigation';

const registerUserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(4, { message: "Password must be 4 or more characters long" }),
    confirmPassword: z.string().min(4, { message: "Confirm Password must be 4 or more characters long" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
        });
    }
});


export async function registerUser(_: any, formData: FormData) {
    const validatedFields = registerUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })
    console.log(validatedFields);
    if (!validatedFields.success) {
        let errorMessage;
        if (validatedFields?.error.flatten().fieldErrors?.name) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.name?.[0];
        } else if (validatedFields?.error.flatten().fieldErrors?.email) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.email?.[0];
        }
        else if (validatedFields?.error.flatten().fieldErrors?.password) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.password?.[0];
        }
        else if (validatedFields?.error.flatten().fieldErrors?.confirmPassword) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.confirmPassword?.[0];
        } else if (validatedFields?.error.flatten().formErrors.length > 0) {
            errorMessage = validatedFields?.error.flatten().formErrors[0];
        }
        return {
            errorMessage
        }
    }
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password as string, 10);
        const newUser = new UserModel({ email, password: hashedPassword, name });
        await newUser.save();

    } catch (error: any) {
        if (error?.errorResponse?.code === 11000) {
            return {
                errorMessage: "User Already existing"
            }
        }
        return {
            errorMessage: JSON.stringify(error)
        }
    }
    redirect('/login');
}