import prisma from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, published, is_visited } = req.body;
    console.log(Boolean(published))
    console.log(Boolean(is_visited))
    try {
      const review = await prisma.review.update({
        where: { id },
        data: {
          published:Boolean(published),
          is_visited:Boolean(is_visited),
        },
      });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Unable to submit review' });
    }
  }
}
