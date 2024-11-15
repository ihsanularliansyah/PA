import prisma from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, publish_status, link_status } = req.body;

    try {
      const review = await prisma.review.update({
        where: { id },
        data: {
          publish_status,
          link_status,
        },
      });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
