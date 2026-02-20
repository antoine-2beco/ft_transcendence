import { User } from "../models/User.js";

export async function leaderboardRoute(fastify)
{
    fastify.get("/leaderboard", async (req, reply) => {
        const users = await User.query()
            .select("id", "username", "profile_picture_url", "elo", "wins", "losses", "ties")
            .orderBy("elo", "desc")
            .limit(50);
    
        return { ok: true, users };
    });
}