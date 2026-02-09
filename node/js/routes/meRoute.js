export async function meRoute(fastify)
{
    fastify.get("/me", async (req, reply) => {
        try 
        {
            const token = req.cookies?.token;
            const user = fastify.jwt.verify(token);
            return { ok: true, user: { id: user.sub, username: user.username } };
        } 
        catch 
        {
            reply.code(401);
            return { ok: false };
        }
    });
}