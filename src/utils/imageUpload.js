import axios from 'axios';
import FormData from 'form-data';
import sharp from 'sharp';
import { ImageUploadError } from './customErrors';

export default async function imageUpload(buffer, originalname, mimetype) {
  try {
    const imageBuffer = await sharp(buffer)
      .resize({
        width: 640,
        height: 480,
        fit: sharp.fit.contain,
      })
      .toBuffer();

    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: originalname,
      contentType: mimetype,
    });

    const headers = formData.getHeaders();
    const contentLength = formData.getLengthSync();

    const response = await axios.post(
      'https://api.imgbb.com/1/upload',
      formData.getBuffer(),
      {
        params: {
          key: process.env.IMGBB_API_KEY,
        },
        headers: {
          ...headers,
          'Content-Length': contentLength,
        },
      }
    );

    // Example response (JSON): https://api.imgbb.com/

    const data = response.data.data;

    return {
      imageUrl: data.image.url,
      thumbUrl: data.thumb.url,
    };
  } catch {
    throw new ImageUploadError();
  }
}
