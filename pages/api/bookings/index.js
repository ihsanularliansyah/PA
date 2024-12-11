import { encryptOtp } from '../../../helpers/encryption.helpers';
import prisma from '../../../lib/db';

export default async function handler(req, res) {
  // =========================>
  // ## Get All Booking
  // =========================>
  if (req.method === 'GET') {
    const { search, filter, paginate, page } = req.query;

    try {
      const whereClause = {};

      // Handle search logic
      if (search) {
        whereClause.OR = [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone_number: { contains: search } },
          { event_name: { contains: search } },
          { style: { contains: search } },
          { status: { contains: search } },
        ];
      }

      // Handle filter logic
      if (filter) {
        const parsedFilters = JSON.parse(filter); // Convert JSON string to object
        Object.entries(parsedFilters).forEach(([key, condition]) => {
          const [type, value] = condition.split(':'); // Split type and value

          if (type === 'equals') {
            whereClause[key] = { equals: value };
          } else if (type === 'notEqual') {
            whereClause[key] = { not: value };
          } else if (type === 'in') {
            whereClause[key] = { in: value.split(',') }; // Support CSV for `in`
          } else if (type === 'notIn') {
            whereClause[key] = { notIn: value.split(',') }; // Support CSV for `notIn`
          } else if (type === 'range') {
            const [start, end] = value.split(','); // Expect "start,end"
            whereClause[key] = { gte: start, lte: end };
          }
        });
      }

      // Pagination and Prisma query
      const totalRow = await prisma.booking.count({ where: whereClause });
      const bookings = await prisma.booking.findMany({
        skip: (parseInt(page) - 1) * parseInt(paginate),
        take: parseInt(paginate),
        where: whereClause,
        include: { Review: true },
        orderBy: { created_at: 'desc' },
      });

      res.status(200).json({
        message: 'success',
        data: bookings,
        total_row: totalRow,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // =========================>
    // ## Create Booking
    // =========================>
  } else if (req.method === 'POST') {
    const {
      name,
      email,
      phone_number,
      event_name,
      event_date,
      detail,
      style,
      prefix,
      validNumber,
      dresscode,
      location,
      properties,
    } = req.body;

    try {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          phone_number: encryptOtp(prefix + phone_number),
          status: { not: 'done' },
        },
      });

      if (existingBooking) {
        return res.status(422).json({
          massage: `Previous booking from ${
            prefix + phone_number
          } still on progres`,
          errors: { phone_number: ['Use diffrent phone Number'] },
        });
      }
      if (!validNumber) {
        return res.status(422).json({
          massage: `${prefix + phone_number} not Valid number`,
          errors: { phone_number: ['Use diffrent phone Number'] },
        });
      }

      const newBooking = await prisma.booking.create({
        data: {
          name,
          email,
          phone_number: encryptOtp(prefix + phone_number),
          event_name,
          event_date: new Date(event_date),
          detail,
          style,
          status: 'proceed', // Default status
          dresscode: dresscode || null,
          location: location || null,
          properties: properties || null,
        },
      });

      // Here you could send a WhatsApp message before creating the booking
      // For example: await sendWhatsAppMessage(newBooking);

      res.status(201).json(newBooking);
    } catch (error) {
      //res.status(500).json({ error: 'Failed to create booking' });
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
