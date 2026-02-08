import knex from "knex";
import { Model } from "objection";

export const db = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    pool: { min: 0, max: 10 },
});

Model.knex(db);