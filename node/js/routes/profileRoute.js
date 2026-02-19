import { requireAuth } from "../authPreHandler.js";
import { User } from "../models/User.js";

export async function profileRoute(fastify)
{
    fastify.get("/profile", { preHandler: requireAuth }, async (req, reply) => {
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
    
        return { ok: true, user };
    });
}