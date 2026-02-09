export async function logoutRoute(fastify)
{
    fastify.post("/logout", async (req, reply) => {
        reply.clearCookie("token", { path: "/" });
        return { ok: true };
    });
}