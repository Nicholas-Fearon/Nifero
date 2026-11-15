import { isIP } from "node:net";
import { enquiryLimits, enquiryServices } from "@/lib/enquiry-fields";
import { createEnquiryWriter } from "@/lib/enquiries";

export const runtime = "nodejs";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
const maxRequestBytes = 40_000;
const unavailable = "We couldn’t save your enquiry. Please try again in a few minutes.";

function readField(data: Record<string, unknown>, key: string) {
  return typeof data[key] === "string" ? data[key].trim() : "";
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return Response.json({ message: "Please submit the enquiry form on the website." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > maxRequestBytes) {
    return Response.json({ message: "Your enquiry is too long." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > maxRequestBytes) {
      return Response.json({ message: "Your enquiry is too long." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return Response.json({ message: "Please submit the enquiry form again." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ message: "Please submit the enquiry form again." }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;
  if (readField(fields, "website")) return new Response(null, { status: 204 });

  const id = readField(fields, "id");
  const name = readField(fields, "name");
  const email = readField(fields, "email");
  const service = readField(fields, "service");
  const message = readField(fields, "message");
  if (
    !uuidPattern.test(id) ||
    !name || name.length > enquiryLimits.name || name.includes("\0") ||
    !emailPattern.test(email) || email.length > enquiryLimits.email ||
    !enquiryServices.some((option) => option === service) ||
    !message || message.length > enquiryLimits.message || message.includes("\0")
  ) {
    return Response.json({
      message: "Check your name, email address, service and message, then try again.",
    }, { status: 400 });
  }

  const writer = createEnquiryWriter();
  if (!writer) return Response.json({ message: unavailable }, { status: 503 });

  const ip = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
    : undefined;
  const { data, error } = await writer.client.rpc("record_enquiry", {
    submission_id: id,
    visitor_name: name,
    visitor_email: email,
    requested_service: service,
    visitor_message: message,
    email_bucket: writer.rateBucket("email", email.toLowerCase()),
    ip_bucket: ip && isIP(ip) ? writer.rateBucket("ip", ip) : null,
  });
  if (data === "limited") {
    return Response.json({
      message: "Too many enquiries have been submitted. Please try again later.",
    }, { status: 429, headers: { "Retry-After": "3600" } });
  }
  if (data === "conflict") {
    return Response.json({ message: "Please refresh the page and try again." }, { status: 409 });
  }
  if (error || (data !== "saved" && data !== "duplicate")) {
    console.error("Could not save enquiry", { code: error?.code });
    return Response.json({ message: unavailable }, { status: 503 });
  }

  return new Response(null, { status: 204 });
}
