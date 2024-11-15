import { encryptOtp } from '../../../helpers/encryption.helpers';
import prisma from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phone_number } = req.body;

    const otp = generateOTP();

    // Encrypt both phone and OTP

    const encryptedOtp = encryptOtp(otp);

    try {
      const existingToken = await prisma.token.findFirst({
        where: {
          phone_number: phone_number,
        },
      });

      if (!existingToken) {
        await prisma.token.create({
          data: {
            phone_number,
            otp: encryptedOtp,
            is_valid: true,
          },
        });
      } else {
        await prisma.token.update({
          where: { phone_number: phone_number },
          data: { is_valid: true, otp: encryptedOtp },
        });
      }

      await sendOtpToPhone(phone_number, otp);

      res.status(201).json({ message: 'OTP sent successfully' });
    } catch (error) {
      // console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Failed to create or update token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// Function to handle sending OTP to the user
async function sendOtpToPhone(phone_number, otp) {
  await fetch('http://localhost:3000/api/sendText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      chatId: `${phone_number}@c.us`,
      text: otp,
      session: 'default',
    }),
  });
}
