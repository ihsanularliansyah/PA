// lib/multer.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directory where files will be saved
const uploadDirectory = './public/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    // Extract metadata from the field name
    const match = file.fieldname.match(/^([^-]*)-(\d+)-\[(\d+)-(\d+)\]$/);

    if (match) {
      const [, sectionName, setId, setColumn, setRow] = match;
      const fileName = `${sectionName}-${setId}-[${setColumn}-${setRow}]${path.extname(
        file.originalname
      )}`;

      // Check if a file with the same name already exists
      const filePath = path.join(uploadDirectory, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the old file
      }

      cb(null, fileName);
    } else {
      cb(new Error('Invalid field name format'), file.fieldname);
    }
  },
});

const upload = multer({ storage });

export default upload;
