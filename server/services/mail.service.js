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
            subject: `Confirmation enregistrement / Registratiebevestiging ${event.name}`,
            html: ` <p>Bonjour ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p>Hallo ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p></p>
                    <p>Pour confimer votre inscription à l'événement ${event.name}, veuillez effetcure le virement: </p>
                    <p>Voer de overdracht uit om uw registratie voor het evenement ${event.name} te bevestigen:</p>
                   
                        <ul>
                            <li>Montant/bedrag: ${event.price}€</li>
                            <li>Numéro de compte/Rekeningnummer: ${event.accountNumber}</li>
                            <li>Nom du bénéficiaire/Naam van de begunstigde:${event.organization}</li>
                            <li>Communication structurée/Gestructureerde communicatie: <b>${newSubscriber.bankTransferId}</b></li>
                        </ul>
                    
                    <p>Sportivement, Sportily,<br />  ${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }


    static sendMailPaidOk(newSubscriber, event, callback) {
        const mailOptionFR = {
            from: mailenv.EMAIL_USER,
            to: newSubscriber.email,
            subject: `Confirmation paiement / Betalingsbevestiging ${event.name}`,
            html: `<p>Bonjour / Hallo ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p>Nous avons bien reçu votre paiement pour l'événement ${event.name}:</p>
                    <p>We hebben uw betaling voor het evenement ontvangen ${event.name}:</p>
                    <p>${event.description}</p>
                    <p>Au/Tot ${formatDate(event.date)},</p>
                    <p>Sportivement,Sportily,</p>
                    <p>${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }
}

module.exports = MailService;
