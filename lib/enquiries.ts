import "server-only";
import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export function createEnquiryWriter() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;

  const client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return {
    client,
    rateBucket: (kind: "ip" | "email", value: string) =>
      `${kind}:${createHmac("sha256", key).update(value).digest("hex")}`,
  };
}
