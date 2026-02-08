import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export async function registerRoute(fastify)
{
    const SALT_ROUNDS = 12;
    fastify.post("/register", async (req, reply) => {
        const { username, password } = req.body || {};
        if (!username || !password) {
            reply.code(400);
            return { error: "username and password required" };
        }
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        try 
        {
            const user = await User.query().insert({ username, password_hash });
            return { id: user.id, username: user.username };
        }
        catch (e) 
        {
            if (e?.code === "23505") {
                reply.code(409);
                return { error: "username already exists" };
            }
            throw e;
        }
    });
}