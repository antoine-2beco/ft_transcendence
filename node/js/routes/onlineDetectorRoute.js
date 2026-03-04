import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";

export async function onlineDetectorRoute(fastify)
{
    fastify.post("/onlineUpdater", { preHandler: requireAuth }, async (req, reply) => {
        await db("users")
            .where({ id: Number(req.user.sub) })
            .update({
                online: true,
                last_seen_at: db.fn.now(),
            });
    
        return { ok: true };
    });
}