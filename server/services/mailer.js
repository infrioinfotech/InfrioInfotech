import nodemailer from 'nodemailer';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM_NAME,
} = process.env;

const transporter = nodemailer.createTransport({
  pool: true,
  host: EMAIL_HOST || 'smtp.gmail.com',
  port: Number(EMAIL_PORT || 465),
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const fromAddress = `"${EMAIL_FROM_NAME || 'Infrio Infotech'}" <${EMAIL_USER}>`;
const brandUrl = 'https://infrioinfotech.qzz.io';
const brandLogo = `${brandUrl}/infrio/Logo.png`;
const brandRed = '#E10600';

function buildHtmlTemplate({ title, greetingName, introLines = [], summary = {}, ctaLabel = 'Visit our website', ctaHref = brandUrl }) {
  const summaryRows = Object.entries(summary || {}).map(
    ([key, val]) => `
      <tr>
        <td style="padding:6px 0;color:#666a73;font-size:12px;width:160px;vertical-align:top;">${key}</td>
        <td style="padding:6px 0;color:#0b0b0c;font-size:13px;">${val ?? ''}</td>
      </tr>`
  ).join('');

  const introHtml = (introLines || []).map(
    (line) => `<p style="margin:0 0 10px 0;">${line}</p>`
  ).join('');

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#f6f7fb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f6f7fb;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr><td style="background:${brandRed};height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
              <tr>
                <td align="center" style="padding:24px 24px 8px 24px;">
                  <img src="${brandLogo}" alt="Infrio Infotech" width="120" height="120" style="display:block;border:0;outline:none;text-decoration:none;border-radius:8px;">
                  <div style="color:#0b0b0c;font-weight:800;font-size:18px;margin-top:8px;">Infrio Infotech</div>
                  <div style="color:#666a73;font-size:12px;letter-spacing:0.08em;margin-top:2px;">IT Services & Software Solutions</div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px 0 24px;">
                  <h1 style="margin:0;color:#0b0b0c;font-size:20px;line-height:1.4;">Hi ${greetingName || 'there'},</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 24px 0 24px;color:#3c4047;font-size:14px;line-height:1.65;">
                  ${introHtml}
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#fafafa;border:1px solid #ececf1;border-radius:12px;">
                    <tr>
                      <td style="padding:16px 16px 8px 16px;color:#0b0b0c;font-weight:700;font-size:14px;">Summary</td>
                    </tr>
                    <tr>
                      <td style="padding:0 16px 16px 16px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                          ${summaryRows}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:8px 24px 24px 24px;">
                  <a href="${ctaHref}" style="display:inline-block;background:${brandRed};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;">${ctaLabel}</a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0 24px 24px 24px;color:#666a73;font-size:12px;line-height:1.6;">
                  <div style="margin-bottom:2px;">Infrio Infotech · IT Services & Software Solutions</div>
                  <div style="margin-bottom:2px;"><a href="${brandUrl}" style="color:${brandRed};text-decoration:none;">${brandUrl}</a></div>
                  <div>${EMAIL_USER}</div>
                </td>
              </tr>
            </table>
            <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export async function sendUserAutoReply({ toEmail, toName, subject, summary }) {
  try {
    const html = buildHtmlTemplate({
      title: 'Thank you for contacting Infrio Infotech',
      greetingName: toName,
      introLines: [
        'Thanks for reaching out to us. We’ve received your request and our team will review it shortly.',
        'We’ll get back to you via email or phone with the next steps.',
      ],
      summary,
    });
    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: subject || 'We received your request',
      html,
    });
  } catch (err) {
    console.error('Mailer user auto-reply error:', err.message);
  }
}

export async function sendInternalNotification({ subject, summary }) {
  try {
    const html = buildHtmlTemplate({
      title: subject || 'New Submission',
      greetingName: 'Team',
      introLines: [
        'A new submission has been received from the website.',
      ],
      summary,
      ctaLabel: 'Open Admin',
      ctaHref: brandUrl,
    });
    await transporter.sendMail({
      from: fromAddress,
      to: EMAIL_USER,
      subject: subject || 'New Submission',
      html,
    });
  } catch (err) {
    console.error('Mailer internal notification error:', err.message);
  }
}

export default { sendUserAutoReply, sendInternalNotification };
