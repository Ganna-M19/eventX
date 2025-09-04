import mongoose from 'mongoose';

// Schema for tickets
const ticketSchema = new mongoose.Schema({
  attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  seatNumber: Number,
  qrData: String,
  reservedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Ticket', ticketSchema);
