const sgMail = require('@sendgrid/mail');
const sendgridAPIKey =
  '';

sgMail.setApiKey(sendgridAPIKey);

const sendNotification = () => {
  sgMail.send({
    to: 'xvitkleo@gmail.com',
    from: 'xvitkleo@gmail.com',
    subject: 'Notification CRM',
    text: 'Notificación CRM',
  });
};

module.exports = {
  sendNotification,
};
