import prisma from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const totalRow = await prisma.section.count();
      const section = await prisma.section.findFirst({
        where: {
          name: 'portofolio',
        },
        include: {
          sets: {
            include: {
              images: true,
            },
          },
        },
      });

      res.status(200).json({
        massage: 'success',
        data: section,
        total_row: totalRow,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //   else if (req.method === 'POST') {

  //   }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
