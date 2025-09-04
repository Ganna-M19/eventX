import mongoose from "mongoose";

// Schema for event details
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    details: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    seatsTotal: {
        type: Number,
        required: true,
        min: 0,
    },
    seatsAvailable: {
        type: Number,
        required: true,
            min: 0,
        },
        image_url: {
            type: String,
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;