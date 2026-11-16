import { emailHandlers } from "@/lib/email/routes";

// Private mailbox data: never cached, always Node.js (IMAP/SMTP need raw TCP sockets).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = emailHandlers.attachment;
