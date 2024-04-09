
import bcryptjs from "bcryptjs"
import { SignJWT } from "jose"
import { NextRequest } from "next/server";
import { UserModel } from "../../../lib/db/model/users";
import connectDB from "../../../lib/db/db";

export async function POST(req: NextRequest) {

    const { email, password } = await req.json();

    const SECRET_KEY = process.env.JWT_SECRET_KEY

    try {

        await connectDB()

        const user  = await UserModel.findOne({ email });
        const { password : hashedPassword, _id } = user

        if (password && hashedPassword && bcryptjs.compareSync(password, hashedPassword)) {


            const token = await new SignJWT({ id: _id })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1h")
                .sign(new TextEncoder().encode(SECRET_KEY));

            return Response.json({
                message: "user logged in",
                token: token,
            },
                {
                    headers: {
                        "set-cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${4 * 60 * 60}; SameSite=Lax`
                    }
                }
            )
        }
        else {
            throw new Error("invalid creds")
        }

    } catch (error: any) {
        console.log(error);
        return Response.json({
            message: error.message,
        })
    }

}