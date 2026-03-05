import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";

import { initdb } from "./initdb.js";
import { registerRoute } from "./routes/registerRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import { matchmakingRoute } from "./routes/matchmakingRoute.js";
import { meRoute } from "./routes/meRoute.js";
import { logoutRoute } from "./routes/logoutRoute.js";
import { aiRoute } from "./routes/aiRoute.js";
import { leaderboardRoute } from "./routes/leaderboardRoute.js";
import { matchHistoryRoute } from "./routes/matchHistoryRoute.js";
import { profileRoute } from "./routes/profileRoute.js";
import { addFriendRoute } from "./routes/addFriendRoute.js";
import { profilePicUploadRoute} from "./routes/profilePicUploadRoute.js";
import { editUsernameRoute } from "./routes/editUsernameRoute.js";
import { removeFriendRoute } from "./routes/removeFriendRoute.js";
import { onlineDetectorRoute } from "./routes/onlineDetectorRoute.js";
import "./db.js";
import { db } from "./db.js";

const fastify = Fastify({
    logger: true,
    https: {
        key: fs.readFileSync("/app/certs/server.key"),
        cert: fs.readFileSync("/app/certs/server.crt"),
    },
});

await fastify.register(cookie);

await fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
});
await fastify.register(websocket);

await fastify.register(multipart, {
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

await fastify.register(registerRoute);
await fastify.register(loginRoute);
await fastify.register(matchmakingRoute);
await fastify.register(meRoute);
await fastify.register(logoutRoute);
await fastify.register(aiRoute);
await fastify.register(leaderboardRoute);
await fastify.register(matchHistoryRoute);
await fastify.register(profileRoute);
await fastify.register(addFriendRoute);
await fastify.register(profilePicUploadRoute);
await fastify.register(editUsernameRoute);
await fastify.register(removeFriendRoute);
await fastify.register(onlineDetectorRoute);

async function start() 
{
    await initdb();
    await fastify.listen({ port: 8787, host: "0.0.0.0" });
    setInterval(() => {
        db("users")
          .where("online", true)
          .andWhere("last_seen_at", "<", db.raw("now() - interval '60 seconds'"))
          .update({ online: false })
          .catch(() => {});
    }, 60_000);
}

start().catch((err) => {
	fastify.log.error(err);
	process.exit(1);
});