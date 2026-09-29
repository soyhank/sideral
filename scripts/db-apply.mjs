// Aplica un archivo SQL al proyecto de Supabase usando la API de administración.
// Uso: node scripts/db-apply.mjs supabase/migrations/0001_init.sql
import { readFileSync } from "node:fs";
const REF = process.env.SUPABASE_PROJECT_REF ?? "pnzjwitvmglauwnjdkuv";
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) throw new Error("Falta SUPABASE_ACCESS_TOKEN");
const arg = process.argv[2];
const query = arg.endsWith(".sql") ? readFileSync(arg, "utf8") : arg;
const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query }),
});
const text = await res.text();
console.log(res.status, text.slice(0, 3000));
if (!res.ok) process.exit(1);
