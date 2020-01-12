const nodemailer = require('nodemailer')
const mailenv = require('../keys/mailenv')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailenv.EMAIL_USER,
        pass: mailenv.EMAIL_PASSWORD
    }
});

const formatDate = function (d) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}


class MailService {

    static sendMailPayMe(newSubscriber, event, callback) {
        const mailOptionFR = {
            from: mailenv.EMAIL_USER,
            to: newSubscriber.email,
            subject: `Confirmation enregistrement pour ${event.name}`,
            html: `<p>Bonjour ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p>Pour confimer votre inscription à l'événement ${event.name}, veuillez effetcure le virement: </p>
                    <p>
                        <ul>
                            <li>Montant: ${event.price}€</li>
                            <li>Numéro de compte: ${event.accountNumber}</li>
                            <li>Nom du bénéficière: ${event.organization}</li>
                            <li>Communication structurée: <b>${newSubscriber.bankTransferId}</b></li>
                        </ul>
                    </p>
                    <p>Sportivement,<br/> ${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }


    static sendMailPaidOk(newSubscriber, event, callback) {
        const mailOptionFR = {
            from: mailenv.EMAIL_USER,
            to: newSubscriber.email,
            subject: `Confirmation payement pour ${event.name}`,
            html: `<p>Bonjour ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p>Nous avons bien reçu votre payement pour l'événement ${event.name}:</p>
                    <p>${event.description}</p>
                    <p>Au ${formatDate(event.date)},</p>
                    <p>Sportivement,</p>
                    <p>${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }
}

module.exports = MailService;
