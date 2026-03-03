import { User } from "../models/User.js";

export async function leaderboardRoute(fastify)
{
    fastify.get("/leaderboard", async (req, reply) => {
        const users = await User.query()
            .select("id", "username", "profile_picture_url", "elo", "wins", "losses", "ties")
            .select(User.raw("ROW_NUMBER() OVER (ORDER BY elo DESC) as rank"))
            .orderBy("elo", "desc")
    
        return { ok: true, users };
    });
}