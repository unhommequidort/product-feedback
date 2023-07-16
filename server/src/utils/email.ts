import nodemailer from 'nodemailer';
import config from 'config';
import pug from 'pug';
import { convert } from 'html-to-text';
import { Prisma } from '@prisma/client';

// SMTP configuration
const smtp = config.get<{
  user: string;
  pass: string;
  service: string;
}>('smtp');

// const smtp = config.get<{
//   host: string;
//   port: number;
//   user: string;
//   pass: string;
//   service: string;
// }>('smtp1');

export default class Email {
  #firstName: string;
  #to: string;
  #from: string;

  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.name.split(' ')[0];
    this.#to = user.email;
    this.#from = 'FeedbackApp <admin@admin.com>';
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // }

    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  // Method to generate the email templates
  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.#firstName,
      subject,
      url: this.url,
    });

    const mailOptions = {
      from: this.#from,
      to: this.#to,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for 10 minutes)'
    );
  }
}
