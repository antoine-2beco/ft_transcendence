import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";

import { initdb } from "./initdb.js";
import { registerRoute } from "./routes/registerRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import { matchmakingRoute } from "./routes/matchmakingRoute.js";
import { meRoute } from "./routes/meRoute.js";
import { logoutRoute } from "./routes/logoutRoute.js";
import "./db.js";

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
  
// fastify.get("/test123", async () => {
//     return { testobj: "test1231234124233213" };
// });

await fastify.register(registerRoute);
await fastify.register(loginRoute);
await fastify.register(matchmakingRoute);
await fastify.register(meRoute);
await fastify.register(logoutRoute);

async function start() 
{
    await initdb();
    await fastify.listen({ port: 8787, host: "0.0.0.0" });
}

start().catch((err) => {
	fastify.log.error(err);
	process.exit(1);
});