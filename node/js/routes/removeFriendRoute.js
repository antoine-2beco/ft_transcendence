import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";
import { User } from "../models/User.js";

export async function removeFriendRoute(fastify)
{
    fastify.delete("/removeFriend/:friendId", { preHandler: requireAuth }, async (req, reply) => {
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

        const friendId = Number(req.params.friendId);
    
        if (!Number.isInteger(friendId)) 
        {
            reply.code(400);
            return { error: "invalid friendId" };
        }
    
        if (friendId === userId) 
        {
            reply.code(400);
            return { error: "cannot remove yourself" };
        }
    
        await db("users")
            .where({ id: userId })
            .update({
                friends: db.raw("array_remove(friends, ?)", [friendId]),
        });

        const userData = await User.query()
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
    
        if (!userData) 
        {
            reply.code(404);
            return { error: "user not found" };
        }
    
        return { ok: true, user: userData };
    });
}