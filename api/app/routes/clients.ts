import { Router } from 'express';
import { Client } from '../db';

const router = Router();

router.get('/page/:page', async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Client.findAndCountAll({
      limit,
      offset,
      order: [['lastName', 'ASC']],
    });

    const totalPages = Math.ceil(count / limit);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    res.json({
      total: count,
      page,
      totalPages,
      previous: page > 1 ? `${baseUrl}/page/${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}/page/${page + 1}` : null,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

export default router;
