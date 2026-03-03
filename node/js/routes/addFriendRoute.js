import { requireAuth } from "../authPreHandler.js";
import { User } from "../models/User.js";
import { db } from "../db.js";

export async function addFriendRoute(fastify) 
{
    fastify.post("/addFriend/:friendId", { preHandler: requireAuth }, async (req, reply) => {
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