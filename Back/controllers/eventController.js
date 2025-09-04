import EventModel from '../models/Event.js';

// Add a new event
export const addEvent = async (req, res) => {
  try {
    const newEvent = await EventModel.create(req.body);
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not create event.' });
  }
};

// Retrieve all events
export const fetchEvents = async (req, res) => {
  try {
    const allEvents = await EventModel.find();
    res.json({ events: allEvents });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not fetch events.' });
  }
};

// Get a single event by ID
export const fetchEventById = async (req, res) => {
  try {
    const foundEvent = await EventModel.findById(req.params.id);
    res.json({ event: foundEvent });
  } catch (error) {
    res.status(404).json({ error: error.message || 'Event not found.' });
  }
};

// Update event details
export const modifyEvent = async (req, res) => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not update event.' });
  }
};

// Remove an event
export const removeEvent = async (req, res) => {
  try {
    await EventModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, info: 'Event removed.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not delete event.' });
  }
};
