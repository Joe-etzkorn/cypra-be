import nodemailer from 'nodemailer';

interface SendEmailParams {
  from: string;
  to: string | string[];
  subject: string;
  body: string;
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({
    from,
    to,
    subject,
    body,
  }: SendEmailParams): Promise<boolean> {
    try {
      const recipients = Array.isArray(to) ? to : [to];

      const mailOptions = {
        from: from,
        to: recipients.join(','),
        subject,
        text: body,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
