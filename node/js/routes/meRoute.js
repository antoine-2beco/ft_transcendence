import { requireAuth } from "../authPreHandler.js";

export async function meRoute(fastify)
{
    fastify.get("/me", { preHandler: requireAuth }, async (req, reply) => {
        return { ok: true, user: { id: req.user.sub, username: req.user.username } };
    });
}