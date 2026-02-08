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
            t.string("username").notNullable().unique();
            t.string("password_hash").notNullable();
        });
    } 
}