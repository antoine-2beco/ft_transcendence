import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";

export async function addFriendRoute(fastify) 
{
    fastify.post("/addFriend/:friendId", { preHandler: requireAuth }, async (req, reply) => {
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
            return { error: "cannot add yourself" };
        }

        const friend = await db("users").select("id").where({ id: friendId }).first();
        if (!friend) 
        {
            reply.code(404);
            return { error: "user not found" };
        }

        await db("users")
            .where({ id: userId })
            .whereRaw("NOT (? = ANY(friends))", [friendId])
            .update({
                friends: db.raw("array_append(friends, ?)", [friendId]),
        });

        return { ok: true };
    });
}