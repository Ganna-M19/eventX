import TicketModel from '../models/Ticket.js';
import EventModel from '../models/Event.js';
import QRGen from 'qrcode';

// Reserve a ticket for an event
export const reserveTicket = async (req, res) => {
  try {
    const { eventId, seat } = req.body;
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) return res.status(404).json({ error: 'Event not found.' });
    if (eventDoc.bookedSeats && eventDoc.bookedSeats.includes(seat)) return res.status(409).json({ error: 'Seat already reserved.' });
    eventDoc.bookedSeats = eventDoc.bookedSeats || [];
    eventDoc.bookedSeats.push(seat);
    await eventDoc.save();
    const qrCodeData = await QRGen.toDataURL(`${eventId}-${seat}-${req.user.id}`);
    const newTicket = await TicketModel.create({ user: req.user.id, event: eventId, seat, qrCode: qrCodeData });
    res.status(201).json({ success: true, ticket: newTicket });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not book ticket.' });
  }
};

// Get tickets for the current user
export const fetchUserTickets = async (req, res) => {
  try {
    const userTickets = await TicketModel.find({ user: req.user.id }).populate('event');
    res.json({ tickets: userTickets });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not fetch tickets.' });
  }
};
