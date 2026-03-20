// ============================================
// BACKEND CODE - Node.js + Express + MongoDB
// ============================================
// This file contains the complete backend code.
// DO NOT import this in the React frontend.
// Copy contents to a separate backend/ folder.
//
// FOLDER STRUCTURE:
// backend/
//   server.js
//   config/db.js
//   middleware/auth.js
//   models/ (User, Course, Product, Business, Doctor, Booking, Job, Service)
//   routes/ (auth, courses, products, businesses, doctors, bookings, jobs, services)
//   controllers/ (matching routes)
//
// HOW TO RUN:
// 1. mkdir backend && cd backend
// 2. npm init -y
// 3. npm install express mongoose bcryptjs jsonwebtoken cors dotenv
// 4. Create .env with: MONGO_URI=mongodb://localhost:27017/vcda  JWT_SECRET=your_secret_key
// 5. node server.js
//
// ============================================

// ==================== server.js ====================
/*
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/products', require('./routes/products'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/services', require('./routes/services'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
*/

// ==================== config/db.js ====================
/*
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
*/

// ==================== middleware/auth.js ====================
/*
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access required' });
    next();
  });
};

module.exports = { auth, adminAuth };
*/

// ==================== models/User.js ====================
/*
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
*/

// ==================== models/Course.js ====================
/*
const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institution: String,
  type: String,
  duration: String,
  fee: String,
}, { timestamps: true });
module.exports = mongoose.model('Course', CourseSchema);
*/

// ==================== models/Product.js ====================
/*
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  image: String,
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
*/

// ==================== models/Business.js ====================
/*
const mongoose = require('mongoose');
const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  location: String,
  contact: String,
}, { timestamps: true });
module.exports = mongoose.model('Business', BusinessSchema);
*/

// ==================== models/Doctor.js ====================
/*
const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
  hospital: String,
  fee: String,
  available: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Doctor', DoctorSchema);
*/

// ==================== models/Booking.js ====================
/*
const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['doctor', 'service', 'repair'] },
  referenceId: String,
  name: String,
  date: Date,
  status: { type: String, default: 'pending' },
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);
*/

// ==================== models/Job.js ====================
/*
const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  type: String,
  salary: String,
  location: String,
}, { timestamps: true });
module.exports = mongoose.model('Job', JobSchema);
*/

// ==================== models/Service.js ====================
/*
const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trade: String,
  experience: String,
  rate: String,
  rating: Number,
}, { timestamps: true });
module.exports = mongoose.model('Service', ServiceSchema);
*/

// ==================== routes/auth.js ====================
/*
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
*/

// ==================== routes/courses.js (example CRUD - same pattern for all) ====================
/*
const router = require('express').Router();
const Course = require('../models/Course');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json(course);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
});

module.exports = router;
*/

// Repeat the same CRUD pattern for: products, businesses, doctors, bookings, jobs, services
// Just change the model import and field names accordingly.

export {};
