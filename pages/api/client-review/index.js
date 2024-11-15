import prisma from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, comment, rating } = req.body;

    try {
      const review = await prisma.review.update({
        where: { id },
        data: {
          rating: parseInt(rating),
          comment,
          link_status: 'inactive',
        },
      });
      res.status(200).json(review);
    } catch (error) {
      // res.status(500).json({ error: error.message });
      res.status(500).json({ error: 'Unable to submit review' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
