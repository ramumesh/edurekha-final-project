import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function verifyjwt(token: string) {

    try {
        const isLoggedIn = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
        return isLoggedIn;
    }
    catch (error) {
        throw new Error("invalid token")
    }

}

export async function getUserIdFromToken() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;
        const tokenData: any = token && (await verifyjwt(token));
        return tokenData.payload.id;
    }
    catch (error) {
        throw new Error("invalid token")
    }
}