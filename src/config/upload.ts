import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploaderFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploaderFolder,
  storage: multer.diskStorage({
    destination: uploaderFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
