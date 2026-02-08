import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import Fastify from "fastify";

import { initdb } from "./initdb.js";
import { registerRoute } from "./routes/registerRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import "./db.js";

const fastify = Fastify({
    logger: true,
    https: {
        key: fs.readFileSync("/app/certs/server.key"),
        cert: fs.readFileSync("/app/certs/server.crt"),
    },
});
  
fastify.get("/test123", async () => {
    return { testobj: "test1231234124233213" };
});

await fastify.register(registerRoute);
await fastify.register(loginRoute);

async function start() 
{
    await initdb();
    await fastify.listen({ port: 8787, host: "0.0.0.0" });
}

start().catch((err) => {
	fastify.log.error(err);
	process.exit(1);
});