import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

export async function registerRoute(fastify)
{
    const SALT_ROUNDS = 12;
    fastify.post("/register", async (req, reply) => {
        const { username, email, password } = req.body || {};
        if (!username || !email || !password) {
            reply.code(400);
            return { error: "username, email and password required" };
        }

        if (!emailRegex.test(email)) 
        {
            reply.code(400);
            return { error: "invalid email" };
        }
        const normalizedEmail = email.trim().toLowerCase();
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        try 
        {
            const user = await User.query().insert({ username, email: normalizedEmail, profile_picture_url: DEFAULT_AVATAR, password_hash });
            return { id: user.id, username: user.username, email: user.email };
        }
        catch (e) 
        {
            if (e.nativeError?.code === "23505") {
                reply.code(409);
                return { error: "username or email already exists" };
            }
            throw e;
        }
    });
}