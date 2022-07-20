import nodemailer from 'nodemailer';
import HandlebarsMailTemplate, {
  IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    transporter.sendMail(
      {
        from: {
          name: from?.name || 'Equipe API Vendas',
          address: from?.email || 'equipe@apivendas.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject: subject,
        html: await HandlebarsMailTemplate.parse(templateData),
      },
      (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      },
    );
  }
}
