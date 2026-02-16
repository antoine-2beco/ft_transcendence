export async function requireAuth(req, reply) 
{
    try 
    {
        const token = req.cookies?.token;
        req.user = req.server.jwt.verify(token); 
    } 
    catch 
    {
        reply.code(401).send({ error: "unauthorized" });
    }
}