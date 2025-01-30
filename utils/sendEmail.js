
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

// Configure SendGrid API key
sgMail.setApiKey(config.emailAPIKey);

// Utility function to send an email
const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: 'abhi8483999@gmail.com',
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;