/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import db from '../../lib/db';

// Utility function to map MIME types to file extensions
const mimeToExtension = (mimeType: string): string => {
  const mimeMap: { [key: string]: string } = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
  };
  return mimeMap[mimeType] || '';
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
      const ext = mimeToExtension(file.mimetype); // Derive extension from MIME type
      callback(null, `${file.fieldname}${ext}`); // Use fieldname as base for filename
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

      const files = (req as any).files; // Multer attaches files to `req`

      // Parse and update file paths
      for (const file of files) {
        const match = file.fieldname.match(/^(.+)-set\.(\d+)-(\d+)-(\d+)$/);
        if (!match) {
          console.error(`Invalid fieldname format: ${file.fieldname}`);
          continue;
        }

        const [, sectionName, setIndex, setColumn, setRow] = match;

        // Convert extracted strings to numbers
        const column = Number(setColumn);
        const row = Number(setRow);

        try {
          // Find the setId based on sectionName and setIndex
          const set = await db.set.findUnique({
            where: {
              sectionId_setIndex: {
                //@ts-ignore
                sectionId: (
                  await db.section.findUnique({
                    where: { name: sectionName },
                    select: { id: true },
                  })
                )?.id,
                setIndex: Number(setIndex),
              },
            },
            select: { id: true },
          });

          if (!set) {
            console.error(`Set not found for fieldname: ${file.fieldname}`);
            continue;
          }

          // Update the database
          await db.image.update({
            where: {
              setId_setColumn_setRow: {
                setId: set.id,
                setColumn: column,
                setRow: row,
              },
            },
            data: {
              filePath: `/uploads/${file.filename}`,
            },
          });
        } catch (error) {
          console.error(
            `Error updating database for fieldname: ${file.fieldname}`,
            error
          );
          continue;
        }
      }

      res
        .status(201)
        .json({ message: 'Files successfully uploaded and database updated.' });
    } catch (error) {
      console.error('Error during upload and database update:', error);
      res
        .status(500)
        .json({ error: 'Failed to upload files and update database' });
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
