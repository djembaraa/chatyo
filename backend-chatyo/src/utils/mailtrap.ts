import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN ?? "";
const TEST_INBOX_ID = Number(process.env.MAILTRAP_INBOX_ID); // <--- Tambah ini

export const mailtrap = new MailtrapClient({
  token: TOKEN,
  testInboxId: TEST_INBOX_ID,
});

export const sender = {
  email: "mailtrap@inbox.mailtrap.io",
  name: "Admin",
};
