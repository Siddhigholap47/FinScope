
const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/expenses
router.get('/', auth, async (req,res) => {
  const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 });
  res.json(expenses);
});

// POST /api/expenses
router.post('/', auth, async (req,res) => {
  const { amount, category, note, date } = req.body;
  const exp = await Expense.create({ userId: req.userId, amount, category, note, date });
  res.status(201).json(exp);
});

// PUT /api/expenses/:id
router.put('/:id', auth, async (req,res) => {
  const exp = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!exp) return res.status(404).json({ message: 'Not found' });
  res.json(exp);
});

// DELETE /api/expenses/:id
router.delete('/:id', auth, async (req,res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

module.exports = router;
