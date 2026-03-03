import { requireAuth } from "../authPreHandler.js";
import { User } from "../models/User.js";
import { db } from "../db.js";

export async function editUsernameRoute(fastify) 
{
  fastify.patch("/editUsername", { preHandler: requireAuth }, async (req, reply) => {
        const userId = Number(req.user.sub);
    
        const user = await User.query()
            .findById(userId)
            .select(
                "id",
                "username",
                "profile_picture_url",
                "language",
                "elo",
                "wins",
                "losses",
                "ties",
                "friends",
            );
    
        if (!user) 
        {
            reply.code(404);
            return { error: "user not found" };
        }

        const { username } = req.body || {};

        if (!username || typeof username !== "string") 
        {
            reply.code(400);
            return { error: "username required" };
        }
        const newUsername = username.trim();
        try 
        {
            const updated = await db("users")
            .where({ id: userId, profile_picture_url: profile_picture_url })
            .update({ username: newUsername })
            .returning(["id", "username"]);

            const user = Array.isArray(updated) ? updated[0] : updated;

            const token = fastify.jwt.sign(
                { sub: userId, username: user.username },
                { expiresIn: "24h" }
            );

            reply.setCookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            });

            return { ok: true, user };
        } 
        catch (e) 
        {
            if (e?.code === "23505") 
            {
                reply.code(409);
                return { error: "username already exists" };
            }
            throw e;
        }
    });
}