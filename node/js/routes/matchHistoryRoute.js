import { db } from "../db.js";

export async function matchHistoryRoute(fastify) 
{
    fastify.get("/match-history", async (req, reply) => {
        const games = await db("games as g")
        .leftJoin("users as p1", "g.player1_id", "p1.id")
        .leftJoin("users as p2", "g.player2_id", "p2.id")
        .leftJoin("users as w", "g.winner_id", "w.id")
        .select(
            "g.id",
            "g.created_at",
    
            "p1.username as player1_username",
            "p1.profile_picture_url as player1_profile_picture",
            "p1.elo as player1_elo",
    
            "p2.username as player2_username",
            "p2.profile_picture_url as player2_profile_picture",
            "p2.elo as player2_elo",
    
            "w.username as winner_username"
        )
        .orderBy("g.created_at", "desc");

        return { ok: true, games };
    });
}