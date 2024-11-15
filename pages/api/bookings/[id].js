import prisma from '../../../lib/db';
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: parseInt(id) },
      });

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch booking' });
    }
  } else if (req.method === 'POST') {
    // Update an existing booking
    const {
      name,
      email,
      phone_number,
      event_name,
      event_date,
      style,
      detail,
      status,
      _method,
    } = req.body;
    if (_method != 'PUT') {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
      const updatedBooking = await prisma.booking.update({
        where: { id: id },
        data: {
          name,
          email,
          phone_number,
          event_name,
          event_date: new Date(event_date),
          style,
          detail,
          status,
        },
      });
      // await prisma.token.update({
      //   where: { phone_number: phone_number },
      //   data: {
      //     is_valid: false,
      //   },
      // });
      if (status == 'done') {
        const reviewExist = await prisma.review.findUnique({
          where: { bookingId: id },
        });
        !reviewExist && (await createReview(id));
      }
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    // Delete a booking
    try {
      await prisma.booking.delete({
        where: { id: id },
      });

      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function createReview(id) {
  await prisma.review.create({
    data: { bookingId: id, created_at: new Date(), comment: '' },
  });
}
