'use server'
import { z } from 'zod'
import connectDB from "@/app/lib/db/db";
import bcryptjs from "bcryptjs";
import { UserModel } from '@/app/lib/db/model/users';
import { redirect } from 'next/navigation';
import { SignJWT, decodeJwt } from "jose";
import { cookies } from 'next/headers'
import { IProduct } from '../interfaces/IProduct';

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

const loginUserSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(4, { message: "Password must be 4 or more characters long" }),
});



export async function loginUser(_: any, formData: FormData) {
    const validatedFields = loginUserSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });
    console.log(formData.get('email'));
    console.log(formData.get('password'))
    console.log(validatedFields);
    if (!validatedFields.success) {
        let errorMessage;
        if (validatedFields?.error.flatten().fieldErrors?.email) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.email?.[0];
        } else if (validatedFields?.error.flatten().fieldErrors?.password) {
            errorMessage = validatedFields?.error.flatten().fieldErrors?.password?.[0];
        }
        return {
            errorMessage
        }
    }
    const email = formData.get('email');
    const password = formData.get('password');
    const SECRET_KEY = process.env.JWT_SECRET_KEY
    try {
        await connectDB()
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const { password: hashedPassword, _id } = user
        if (password && hashedPassword && bcryptjs.compareSync(password as string, hashedPassword)) {
            const token = await new SignJWT({ id: _id })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1h")
                .sign(new TextEncoder().encode(SECRET_KEY));
            cookies().set({
                name: 'token',
                value: token,
                httpOnly: true,
                path: '/',
                maxAge: 4 * 60 * 60,
            });
        }
        else {
            throw new Error("Invalid Credentials");
        }

    } catch (error: any) {
        console.log(error);
        return {
            errorMessage: error.message,
        }
    }
    redirect('/products');
}

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
        const hashedPassword = await bcryptjs.hash(password as string, 10);
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

export async function addProduct(product: IProduct, formData: FormData) {
    return {
        errorMessage: "",
        product: {}
    }
}