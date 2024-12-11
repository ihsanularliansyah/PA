import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import db from '../../lib/db';

// MIME type to extension mapping
const mimeToExtension = (mimeType: string): string => {
  const mimeMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/pdf': '.pdf',
  };
  return mimeMap[mimeType] || '';
};

// Configure Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, callback) => {
      const uploadDir = path.join(process.cwd(), 'public', 'receipts');
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure the directory exists
      callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
      const bookingId = req.body.bookingId; // Ensure bookingId is sent with the request
      const ext = mimeToExtension(file.mimetype);
      callback(null, `${bookingId}${ext}`); // Use booking ID as the filename
    },
  }),
});

// Middleware for processing uploads
const multerMiddleware = upload.single('receipt');

// Middleware wrapper for Next.js compatibility
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Run Multer middleware to process the file
      await runMiddleware(req, res, multerMiddleware);

      const { bookingId } = req.body;
      const file = (req as any).file; // File uploaded by Multer

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Construct file path
      const receiptPath = `/receipts/${file.filename}`;

      // Update the booking's receipt_path in the database
      const updatedBooking = await db.booking.update({
        where: { id: bookingId },
        data: { receipt_path: receiptPath },
      });

      res.status(200).json({
        message: 'Receipt uploaded successfully',
        data: updatedBooking,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Upload Error:', error);
      //   res.status(500).json({ error: 'Failed to upload receipt' });
      res.status(500).json({ error: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser for file uploads
  },
};
