import TicketModel from '../models/Ticket.js';
import UserModel from '../models/User.js';
import EventModel from '../models/Event.js';

// Get analytics dashboard data
export const dashboardStats = async (req, res) => {
  try {
    const eventCount = await EventModel.countDocuments();
    const soldTickets = await TicketModel.countDocuments();
    const totalRevenue = await TicketModel.aggregate([
      { $lookup: { from: 'events', localField: 'event', foreignField: '_id', as: 'eventDetails' } },
      { $unwind: '$eventDetails' },
      { $group: { _id: null, sum: { $sum: '$eventDetails.price' } } }
    ]);
    const demographics = await UserModel.aggregate([
      { $group: { _id: '$gender', total: { $sum: 1 } } }
    ]);
    res.json({ eventCount, soldTickets, revenue: totalRevenue[0]?.sum || 0, demographics });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not fetch dashboard data.' });
  }
};
