const nodemailer = require('nodemailer')
const mailenv = require('../keys/mailenv')

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: mailenv.EMAIL_USER,
//         pass: mailenv.EMAIL_PASSWORD
//     }
// });

const transporter = nodemailer.createTransport({ 
        host: mailenv.SMTP_HOST, 
        secureConnection: true, 
        port: 465, 
        auth: {
            user: mailenv.SMTP_USERNAME, 
            pass: mailenv.SMTP_PASSWORD 
        }
    });

const formatDate = function (d) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}


class MailService {

    static sendMailPayMe(newSubscriber, event, callback) {
        const mailOptionFR = {
            from: mailenv.SMTP_MAIL,
            to: newSubscriber.email,
            subject: `Confirmation enregistrement / Registratiebevestiging ${event.name}`,
            html: ` <p>Bonjour <b>${newSubscriber.firstName} ${newSubscriber.lastName}</b>,</p>
                    <p>Hallo <b>${newSubscriber.firstName} ${newSubscriber.lastName}</b>,</p>
                    <p></p>
                    <p>Pour confirmer votre inscription à l'événement ${event.name}, veuillez effectuer le virement endéans les 5 jours : </p>
                    <p>Voer de overdracht uit om uw registratie voor het evenement ${event.name} te bevestigen binnen de 5 dagen:</p>
                   
                        <ul>
                            <li>Montant/bedrag: ${event.price}€</li>
                            <li>Numéro de compte/Rekeningnummer: ${event.accountNumber}</li>
                            <li>Nom du bénéficiaire/Naam van de begunstigde:${event.organization}</li>
                            <li>Communication structurée/Gestructureerde communicatie: <b>${newSubscriber.bankTransferId}</b></li>
                        </ul>

                    <p>Vos informations/Uw gegevens:</p>

                    <ul>
                        <li>Année de naissance / Geboortejaar (YYYY): ${newSubscriber.birthDate}</li>
                        <li>Sexe / Geslacht: ${newSubscriber.gender?'H/M':'F/V'}</li>
                        <li>Code postal:${newSubscriber.postalCode}</li>
                        <li>Club: ${newSubscriber.club}</li>
                        <li> Je déclare que mon état de santé me permet de participer à la présente épreuve. <br />
                        Ik verklaar dat mijn gezondheidstoestand mij toestaat deel te nemen aan deze wedstrijd.</li>
                    </ul>

                    <p>
                        <i>*Les données à caractère personnel seront traitées uniquement dans le cadre de la course organisée par le Joggans.</i>
                    </p>
                    <p>
                        <i>*De persoonlijke gegevens zullen alleen gebruikt worden in het kader van de loopwedstrijd georganiseerd door Joggans.</i>
                    </p>

                    <p>Nous contacter/Neem contact met ons op: joggansgroup@gmail.com ou http://www.joggans.be/contact/</p>
                    
                    <p>Au plaisir de vous voir le dimanche 14 juin 2020,<br />
                    Graag tot ziens op zondag 14 juni 2020,<br />   
                    ${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }


    static sendMailPaidOk(newSubscriber, event, callback) {
        const mailOptionFR = {
            from: mailenv.SMTP_MAIL,
            to: newSubscriber.email,
            subject: `Confirmation paiement / Betalingsbevestiging ${event.name}`,
            html: `<p>Bonjour / Hallo ${newSubscriber.firstName} ${newSubscriber.lastName},</p>
                    <p>Nous avons bien reçu votre paiement pour l'événement ${event.name}.</p>
                    <p>We hebben uw betaling voor het evenement ontvangen ${event.name}.</p>
                   
                    <p><u><b>Quelques informations utiles: </b></u></p>
                    <p>
                    Nous sommes très heureux de vous accueillir ce dimanche 14 juin 2020 pour la course des « Sentiers du Laerbeek ». <br />
                    Le retrait des dossards se fait de 8h à 9h45.  <br />
                    Prévoyez d’arriver à temps car le départ se situe à 500 mètres du secrétariat.  <br />
                    <u>IMPORTANT:</u> pour y arriver, vous devez traverser un passage à niveau.  <br />
                    Nous vous demandons de respecter impérativement la signalisation et il ne sert à rien de courir, on vous attendra ;-).<br />
                    Plus d’informations sur notre site http://www.joggans.be/laerbeek/.
                    </p>

                    <p><u><b>Nuttige informatie: </b></u></p>
                    <p>
                    Wij kijken er naar uit om u voor de wedstrijd de 'Laerbeeksepaden' deze zondag 14 Juni 2020 te ontvangen. <br />
                    De ophaling van de nummers is mogelijk tussen 8u en 9u45.  <br />
                    Wij vragen u tijdig aanwezig te zijn, de start is namelijk op 500m van het secretariaat.  <br />
                    BELANGRIJK : Om aan te komen moet u een spooroverweg oversteken.  <br />
                    Voor u veiligheid, vragen wij u de verkeersregels te respecteren.  <br />
                    Wees gerust, wij wachten op u om de start te geven ;-). <br />
                    Meer informatie op de website: http://www.joggans.be/laerbeek/. <br />
                    </p>

                    <p>Nous contacter/Neem contact met ons op: joggansgroup@gmail.com ou http://www.joggans.be/contact/</p>

                    <p>Au plaisir de vous voir le dimanche 14 juin 2020,<br />
                    Graag tot ziens op zondag 14 juni 2020,<br />  
                    ${event.organization}.</p>`
        };

        transporter.sendMail(mailOptionFR, callback);
    }
}

module.exports = MailService;
