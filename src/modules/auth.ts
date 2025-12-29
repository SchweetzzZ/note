import {betterAuth} from "better-auth"
import {drizzleAdapter} from "better-auth/adapters/drizzle"
import {db} from "../db"

export const auth = betterAuth({
    basePath: "/api/auth",
    trusthost: true,
    trustedOrigins: ["http://localhost:3000"],
    adapter: drizzleAdapter(db,
        {
            provider: "pg",
            
        }
    ),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification:false,
    },
    secret: process.env.BETTER_AUTH_SECRET,
})