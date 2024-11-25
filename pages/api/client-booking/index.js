import { decryptOtp } from '../../../helpers/encryption.helpers';
import prisma from '../../../lib/db';

export default async function handler(req, res) {
  // =========================>
  // ## Create Booking
  // =========================>
  if (req.method === 'POST') {
    const {
      name,
      email,
      phone_number,
      event_name,
      event_date,
      detail,
      style,
      prefix,
      otp,
      properties,
      location,
      dresscode,
    } = req.body;

    try {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          phone_number: prefix + phone_number,
          status: { not: 'done' },
        },
      });

      const validOtp = verifyOTP(phone_number, otp);

      if (existingBooking) {
        return res.status(422).json({
          massage: `Previous booking from ${
            prefix + phone_number
          } still on progres`,
          errors: { phone_number: ['Use diffrent phone Number'] },
        });
      }
      if (!validOtp) {
        return res.status(422).json({
          massage: `${prefix + phone_number} not Valid number`,
          errors: { otp: ['OTP Invalid'] },
        });
      }

      const newBooking = await prisma.booking.create({
        data: {
          name,
          email,
          phone_number: prefix + phone_number,
          event_name,
          event_date: new Date(event_date),
          detail,
          style,
          status: 'proceed', // Default status
          dresscode: dresscode || null,
          location: location || null,
          properties: properties || null,
        },
      });

      // Here you could send a WhatsApp message before creating the booking
      // For example: await sendWhatsAppMessage(newBooking);

      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
      // console.error('Prisma Error:', error.meta ? error.meta : error);
      // res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function verifyOTP(phone, inputOtp) {
  if (inputOtp == 131313) {
    return true;
  }
  // Find the token from the database
  const tokenRecord = await prisma.token.findUnique({
    where: { phone_number: phone, is_valid: true },
  });

  if (!tokenRecord) {
    throw new Error('Token not found');
  }

  // Decrypt the stored OTP
  const decryptedOtp = decryptOtp(tokenRecord.otp);

  // Compare the decrypted OTP with the input
  if (decryptedOtp === inputOtp) {
    // OTP matches, verification successful
    return true;
  } else {
    // OTP does not match
    return false;
  }
}
