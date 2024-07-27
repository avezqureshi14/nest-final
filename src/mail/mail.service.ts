import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendMail(to: string, subject: string, text: string, html: string) {
        const msg = {
            to,
            from: process.env.SENDGRID_EMAIL,
            subject,
            text,
            html,
        };

        await sgMail.send(msg);
    }
}
