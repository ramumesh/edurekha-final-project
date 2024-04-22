import { jwtVerify } from "jose";

export async function verifyjwt(token: string) {

    try {
        console.log("token ",token)
        const isLoggedIn = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
        console.log("token ",isLoggedIn)
        return isLoggedIn;
    }
    catch (error) {
        throw new Error("invalid token")
    }

}