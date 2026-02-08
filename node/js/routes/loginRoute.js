import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export async function loginRoute(fastify)
{
    fastify.post("/login", async (req, reply) => {
        const { username, password } = req.body || {};
        if (!username || !password) 
        {
            reply.code(400);
            return { error: "username and password required" };
        }
      
        const user = await User.query().findOne({ username });
        if (!user) 
        {
            reply.code(401);
            return { error: "invalid credentials" };
        }
      
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) 
        {
            reply.code(401);
            return { error: "invalid credentials" };
        }
        return { ok: true };
    });
}