/* eslint-disable no-console */
import db from '../../../lib/db'; // Update the path if necessary

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch the total count of sections
      const totalSections = await db.section.count();

      // Fetch the portfolio section with its sets and images
      const section = await db.section.findFirst({
        where: {
          name: 'portofolio',
        },
        include: {
          sets: {
            include: {
              images: true, // Fetch all associated images for each set
            },
          },
        },
      });

      if (!section) {
        return res.status(404).json({
          message: 'Portfolio section not found.',
        });
      }

      // Respond with the section data and the total number of sections
      res.status(200).json({
        message: 'success',
        data: section,
        total_sections: totalSections,
      });
    } catch (error) {
      console.error('Error fetching portfolio section:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
