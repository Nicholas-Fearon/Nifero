"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "./auth";
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

export async function deleteEnquiry(form: FormData) {
  const id = String(form.get("id") ?? "");
  const requestedPage = Number(form.get("returnPage"));
  const page = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 1_000_000
    ? requestedPage
    : 1;
  const destination = `/admin?page=${page}`;
  const { admin } = await getAdminSession();
  if (!admin) redirect("/admin?status=delete-unavailable");
  if (form.get("confirmation") !== "delete" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    redirect(`${destination}&status=delete-failed`);
  }

  const { data, error } = await admin.from("enquiries").delete().eq("id", id).select("id").maybeSingle();
  if (error) redirect(`${destination}&status=delete-failed`);
  if (!data) redirect(`${destination}&status=delete-unavailable`);

  revalidatePath("/admin");
  redirect(`${destination}&status=enquiry-deleted`);
}
