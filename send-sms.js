// send-sms.js
import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const toNumber = "+61498988182";
const messageBody = process.env.MESSAGE_BODY;

const client = Twilio(accountSid, authToken);

client.messages
  .create({
    body: messageBody,
    from: fromNumber,
    to: toNumber,
  })
  .then(message => console.log('Message sent! SID:', message.sid))
  .catch(err => {
    console.error('Failed to send SMS:', err);
    process.exit(1);
  });


