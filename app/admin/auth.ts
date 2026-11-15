import { createAuthClient } from "@/lib/supabase";

export async function getAdminSession() {
  const client = await createAuthClient();
  if (!client) return { configured: false, user: null, admin: null };

  const { data: { user } } = await client.auth.getUser();
  if (!user) return { configured: true, user: null, admin: null };

  const { data, error } = await client
    .from("enquiry_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    console.error("Could not check enquiry admin access", { code: error.code });
  }
  return { configured: true, user, admin: data && !error ? client : null };
}
