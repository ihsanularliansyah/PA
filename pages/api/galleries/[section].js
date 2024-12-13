import db from '../../../lib/db';

export default async function handler(req, res) {
  const { section } = req.query;
console.log(section);
  if (req.method === 'GET') {
    try {
      if (!section || typeof section !== 'string') {
        return res.status(400).json({ error: 'Invalid section name' });
      }

      // Retrieve the section with sets and images
      const sectionData = await db.section.findFirst({
        where: {
          name: section,
        },
        include: {
          sets: {
            include: {
              images: true,
            },
          },
        },
      });

      if (!sectionData) {
        return res
          .status(404)
          .json({ error: `Section '${section}' not found` });
      }

      // Count total rows (optional, if needed for meta purposes)
      const totalRow = await db.section.count();

      res.status(200).json({
        message: 'success',
        data: sectionData,
        total_row: totalRow,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error retrieving section:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
