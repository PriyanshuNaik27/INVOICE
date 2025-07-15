// controllers/aiController.js

import witClient from '../utils/witClient.js';

export const parseQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const result = await witClient.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
