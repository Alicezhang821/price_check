import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;  // recipient
const messageBody = process.env.MESSAGE_BODY;

const client = Twilio(accountSid, authToken);

try {
  const message = await client.messages.create({
    body: messageBody,
    from: fromNumber,
    to: toNumber,
  });
  console.log('Message sent! SID:', message.sid);
} catch (err) {
  console.error('Failed to send SMS:', err);
  process.exit(1);
}
