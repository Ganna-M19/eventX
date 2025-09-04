
import UserModel from '../models/User.js';
import hashUtil from 'bcryptjs';
import jwtUtil from 'jsonwebtoken';

// Handles new user signup
export const createUser = async (req, res) => {
  try {
  const { fullName, emailAddress, passHash, accountType, yearsOld, genderIdentity, hobbies, city } = req.body;
  const encrypted = await hashUtil.hash(passHash, 12);
  const newUser = await UserModel.create({ fullName, emailAddress, passHash: encrypted, accountType, yearsOld, genderIdentity, hobbies, city });
  res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Registration failed.' });
  }
};

// Handles user authentication
export const signIn = async (req, res) => {
  try {
  const { emailAddress, passHash } = req.body;
  const foundUser = await UserModel.findOne({ emailAddress });
  if (!foundUser) return res.status(404).json({ error: 'Account not found.' });
  const valid = await hashUtil.compare(passHash, foundUser.passHash);
  if (!valid) return res.status(401).json({ error: 'Incorrect password.' });
  const sessionToken = jwtUtil.sign({ uid: foundUser._id, accountType: foundUser.accountType }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ session: sessionToken, user: foundUser });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Login failed.' });
  }
};
