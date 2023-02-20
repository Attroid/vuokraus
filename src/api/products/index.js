import express from 'express';
import Marketplace from 'handlers/Marketplace';
import { catchErrors } from 'utils/asyncCatch';
import multer from 'multer';
import imageUpload from 'utils/imageUpload';
import { authorizeUser } from 'middleware/request';

const router = new express.Router();

const upload = multer();

router.post(
  '/',
  upload.single('image'),
  authorizeUser,
  catchErrors(async (req, res) => {
    const {
      user,
      file: { buffer, originalname, mimetype },
      body,
    } = req;

    const { imageUrl, thumbUrl } = await imageUpload(
      buffer,
      originalname,
      mimetype
    );

    const product = { ...body, imageUrl, thumbUrl };

    const createdProduct = await Marketplace.createProduct(user, product);

    res.status(201).json(createdProduct);
  })
);

router.post(
  '/:id(\\d+)/favorite',
  catchErrors(async (req, res) => {
    const { authToken } = req.cookies;
    const { userAgent } = req;
    const productId = Number(req.params.id);

    const isFavorite = await Marketplace.toggleProductFavorite(
      authToken,
      userAgent,
      productId
    );

    res.json({ isFavorite });
  })
);

router.delete(
  '/:id(\\d+)',
  catchErrors(async (req, res) => {
    const { authToken } = req.cookies;
    const { userAgent } = req;
    const productId = Number(req.params.id);

    await Marketplace.deleteProduct(authToken, userAgent, productId);

    res.status(200).end();
  })
);

export default router;
