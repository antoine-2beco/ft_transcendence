import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";

export async function removeFriendRoute(fastify)
{
    fastify.delete("/removeFriend/:friendId", { preHandler: requireAuth }, async (req, reply) => {
        const userId = Number(req.user.sub);
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
    
        return { ok: true };
    });
}