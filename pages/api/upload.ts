/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// Function to map MIME types to file extensions
const mimeToExtension = (mimeType: string): string => {
  const mimeMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'application/pdf': '.pdf',
    // Add more mappings as needed
  };
  return mimeMap[mimeType] || ''; // Return empty string if MIME type is not mapped
};

// Configure Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, callback) => {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists
      callback(null, uploadDir);
    },
    filename: async (req, file, callback) => {
      const fieldName = file.fieldname; // Payload key (e.g., portfolio-set1-[1-1])
      const ext = mimeToExtension(file.mimetype); // Derive extension from MIME type
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const newFileName = `${fieldName}${ext}`; // Append derived extension to the key

      // Check if the file already exists and delete it
      try {
        const existingFilePath = path.join(uploadDir, newFileName);
        await fs.unlink(existingFilePath);
      } catch (err) {
        //@ts-ignore
        if (err.code !== 'ENOENT') throw err; // Ignore file not found errors
      }

      callback(null, newFileName); // Set the new filename
    },
  }),
});

// Middleware to process uploads
const multerMiddleware = upload.any();

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
      // Run Multer middleware
      await runMiddleware(req, res, multerMiddleware);

      // Access uploaded files
      const files = (req as any).files; // Multer attaches files to `req`
      const uploadedFiles = [];

      for (const file of files) {
        uploadedFiles.push({
          originalName: file.originalname,
          savedAs: file.filename, // Should match the payload key with extension
          filePath: `/uploads/${file.filename}`,
          mimeType: file.mimetype, // Include MIME type for reference
        });
      }

      // Respond with uploaded file details
      res.status(200).json({
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      });
    } catch (error) {
      console.error('Upload Error:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser for file uploads
  },
};
