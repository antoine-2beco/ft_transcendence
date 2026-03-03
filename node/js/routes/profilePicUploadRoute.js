import { requireAuth } from "../authPreHandler.js";
import { db } from "../db.js";
import { User } from "../models/User.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pipeline } from "node:stream/promises";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "/app/uploads";

function extFromMime(mime) 
{
    if (mime === "image/jpeg") return ".jpg";
    if (mime === "image/png") return ".png";
    if (mime === "image/webp") return ".webp";
    return null;
}

export async function profilePicUploadRoute(fastify) 
{
    fastify.post( "/profilePicUpload", { preHandler: requireAuth }, async (req, reply) => {
        await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
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
    
        const file = await req.file();
        if (!file) 
        {
            reply.code(400);
            return { error: "file required" };
        }
    
        const ext = extFromMime(file.mimetype);
        if (!ext) 
        {
            reply.code(400);
            return { error: "only jpeg/png/webp allowed" };
        }
    
        const name = crypto.randomBytes(16).toString("hex") + ext;
        const fullPath = path.join(UPLOAD_DIR, name);
    
        await pipeline(file.file, fs.createWriteStream(fullPath));
    
        const urlPath = `/uploads/${name}`;
    
        await db("users")
            .where({ id: userId })
            .update({ profile_picture_url: urlPath });

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