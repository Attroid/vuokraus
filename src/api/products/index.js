import express from 'express';
import Marketplace from 'handlers/Marketplace';
import { catchErrors } from 'utils/asyncCatch';

const router = new express.Router();

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

export default router;