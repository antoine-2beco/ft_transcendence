import { db } from "./db.js";

function sleep(ms) 
{
    return new Promise((r) => setTimeout(r, ms));
}

export async function initdb()
{
    const maxAttempts = 100;
    for (let i = 1; i <= maxAttempts; i++) 
    {
        try 
        {
            await db.raw("SELECT 1");
            break;
        } 
        catch (e) 
        {
            if (i === maxAttempts) throw e;
            console.log(`DB not ready`);
            await sleep(1000);
        }
    }
  
    const hasUsers = await db.schema.hasTable("users");
    if (!hasUsers) 
    {
        await db.schema.createTable("users", (t) => {
            t.increments("id").primary();

            t.string("email").notNullable().unique();
            t.string("username").notNullable().unique();
            t.string("password_hash").notNullable();

            t.text("profile_picture_url").nullable();

            t.string("language", 2).notNullable().defaultTo("en");

            t.integer("elo").notNullable().defaultTo(1000);
            t.integer("wins").notNullable().defaultTo(0);
            t.integer("losses").notNullable().defaultTo(0);
            t.integer("ties").notNullable().defaultTo(0);

            t.specificType("friends", "integer[]").notNullable().defaultTo(db.raw("'{}'::integer[]"));
        });
        await db.raw(`
            ALTER TABLE users
            ADD CONSTRAINT users_language_check
            CHECK (language IN ('en','fr','nl'));
        `);
    }
    const hasGames = await db.schema.hasTable("games");
    if (!hasGames) 
    {
        await db.schema.createTable("games", (t) => {
            t.increments("id").primary();

            t.integer("player1_id").notNullable()
            .references("id").inTable("users")
            .onDelete("CASCADE");

            t.integer("player2_id").notNullable()
            .references("id").inTable("users")
            .onDelete("CASCADE");

            t.integer("winner_id").nullable() // null = tie 
            .references("id").inTable("users")
            .onDelete("SET NULL");

            t.timestamp("created_at").notNullable().defaultTo(db.fn.now());
        });
    }
}