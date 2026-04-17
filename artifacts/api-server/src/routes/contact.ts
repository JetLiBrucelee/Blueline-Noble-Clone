import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = new Resend(process.env["RESEND_API_KEY"]);

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, company, service, message } = req.body as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
  };

  if (!firstName || !lastName || !email || !message) {
    res.status(400).json({ error: "Missing required fields: firstName, lastName, email, message" });
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px;">
      <div style="background: #0ea5e9; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Blueline Offshore — bluelineoffshore.com</p>
      </div>
      <div style="background: white; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 140px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px;">${firstName} ${lastName}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
            <td style="padding: 10px 0; color: #0ea5e9; font-size: 15px;"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></td>
          </tr>
          ${phone ? `<tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px;">${phone}</td>
          </tr>` : ""}
          ${company ? `<tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Company</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px;">${company}</td>
          </tr>` : ""}
          ${service ? `<tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Service</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px;">${service}</td>
          </tr>` : ""}
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</td>
            <td style="padding: 10px 0; color: #111827; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
          Sent from the Blueline Offshore contact form · <a href="https://bluelineoffshore.com" style="color: #0ea5e9;">bluelineoffshore.com</a>
        </div>
      </div>
    </div>
  `;

  try {
    const toAddress = process.env["CONTACT_EMAIL"] || "support@bluelineoffshore.com";
    const fromAddress = process.env["FROM_EMAIL"] || "Blueline Offshore <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `New Enquiry from ${firstName} ${lastName}${company ? ` — ${company}` : ""}`,
      html,
    });

    if (result.error) {
      res.status(500).json({ error: result.error.message });
      return;
    }

    res.json({ success: true, id: result.data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
