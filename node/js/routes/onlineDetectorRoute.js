import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";

export async function onlineDetectorRoute(fastify)
{
    fastify.post("/statusUpdater", { preHandler: requireAuth }, async (req, reply) => {
        const { status } = req.body || {};
        if (typeof status !== "boolean")
        {
            reply.code(400);
            return { error: "status required" };
        }

        await db("users")
            .where({ id: Number(req.user.sub) })
            .update({
                online: status,
                last_seen_at: db.fn.now(),
            });
    
        return { ok: true };
    });
}