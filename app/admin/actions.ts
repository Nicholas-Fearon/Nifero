"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase";

export async function signIn(form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const client = await createAuthClient();
  if (!client || !email || email.length > 254 || !password || password.length > 256) {
    redirect("/admin?status=sign-in-failed");
  }

  const { error } = await client.auth.signInWithPassword({ email, password });
  redirect(error ? "/admin?status=sign-in-failed" : "/admin");
}

export async function signOut() {
  const client = await createAuthClient();
  const result = await client?.auth.signOut({ scope: "local" });
  redirect(result?.error ? "/admin?status=sign-out-failed" : "/admin");
}
