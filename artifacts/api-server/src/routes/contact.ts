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
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0c2545 0%, #0a3d6b 100%); padding: 36px 40px; border-radius: 12px 12px 0 0; border-bottom: 2px solid #0ea5e9;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 40px; height: 4px; background: #0ea5e9; border-radius: 2px;"></div>
          <span style="color: #38bdf8; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">New Enquiry</span>
        </div>
        <h1 style="color: #ffffff; margin: 0 0 6px; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Contact Form Submission</h1>
        <p style="color: #93c5fd; margin: 0; font-size: 13px;">Blueline Offshore &nbsp;·&nbsp; bluelineoffshore.com</p>
      </div>

      <!-- Body -->
      <div style="background: #0f1f36; padding: 32px 40px; border-left: 1px solid #1e3a5f; border-right: 1px solid #1e3a5f;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 14px 0 14px 0; border-bottom: 1px solid #1e3a5f; width: 130px; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Name</span>
            </td>
            <td style="padding: 14px 0 14px 16px; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #e2e8f0; font-size: 15px; font-weight: 600;">${firstName} ${lastName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 0 14px 0; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Email</span>
            </td>
            <td style="padding: 14px 0 14px 16px; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <a href="mailto:${email}" style="color: #38bdf8; font-size: 15px; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 14px 0 14px 0; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Phone</span>
            </td>
            <td style="padding: 14px 0 14px 16px; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #e2e8f0; font-size: 15px;">${phone}</span>
            </td>
          </tr>` : ""}
          ${company ? `<tr>
            <td style="padding: 14px 0 14px 0; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Company</span>
            </td>
            <td style="padding: 14px 0 14px 16px; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #e2e8f0; font-size: 15px;">${company}</span>
            </td>
          </tr>` : ""}
          ${service ? `<tr>
            <td style="padding: 14px 0 14px 0; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Service</span>
            </td>
            <td style="padding: 14px 0 14px 16px; border-bottom: 1px solid #1e3a5f; vertical-align: top;">
              <span style="background: #0c4a6e; color: #38bdf8; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; display: inline-block;">${service}</span>
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding: 14px 0 0 0; vertical-align: top;">
              <span style="color: #4b7cb3; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Message</span>
            </td>
            <td style="padding: 14px 0 0 16px; vertical-align: top;">
              <div style="background: #0a1a2e; border: 1px solid #1e3a5f; border-radius: 8px; padding: 16px; color: #cbd5e1; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div style="background: #07111f; padding: 20px 40px; border-radius: 0 0 12px 12px; border: 1px solid #1e3a5f; border-top: none; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #374e6e; font-size: 12px;">Blueline Offshore · 42 Broadway, New York, NY 10004</span>
        <a href="https://bluelineoffshore.com" style="color: #38bdf8; font-size: 12px; text-decoration: none;">bluelineoffshore.com</a>
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
