// Sponsor Schema and Model
const sponsorSchema = new mongoose.Schema({
  fullName: String,
  businessName: String,
  city: String,
  contactNumber: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Sponsor = mongoose.model('Sponsor', sponsorSchema);

// POST: Save a new sponsor form
app.post('/api/sponsor', async (req, res) => {
  try {
    const data = new Sponsor(req.body);
    await data.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Get all sponsor submissions
app.get('/api/sponsor', async (req, res) => {
  try {
    const all = await Sponsor.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE: Delete a sponsor submission by ID
app.delete('/api/sponsor/:id', async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update a sponsor submission by ID
app.put('/api/sponsor/:id', async (req, res) => {
  try {
    const updated = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb+srv://Foodmechadmin:admin123foodmech@cluster0.6xehgl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const bookStallSchema = new mongoose.Schema({
  fullName: String,
  businessName: String,
  city: String,
  contactNumber: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const BookStall = mongoose.model('BookStall', bookStallSchema);

// POST: Save a new book stall form
app.post('/api/bookstall', async (req, res) => {
  try {
    const data = new BookStall(req.body);
    await data.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Get all book stall submissions
app.get('/api/bookstall', async (req, res) => {
  try {
    const all = await BookStall.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// DELETE: Delete a book stall submission by ID
app.delete('/api/bookstall/:id', async (req, res) => {
  try {
    await BookStall.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT: Update a book stall submission by ID
app.put('/api/bookstall/:id', async (req, res) => {
  try {
    const updated = await BookStall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
