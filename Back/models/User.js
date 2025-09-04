import mongoose from 'mongoose';

// Schema for user accounts
const userSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: { type: String, unique: true },
  passHash: String,
  accountType: { type: String, enum: ['admin', 'user'], default: 'user' },
  yearsOld: Number,
  genderIdentity: String,
  hobbies: [String],
  city: String
});

export default mongoose.model('User', userSchema);
