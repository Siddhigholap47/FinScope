
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Expense = require('../models/Expense');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Expense.deleteMany({});

  const pwd = 'Password123!';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);

  const user = await User.create({ name: 'Test User', email: 'test@example.com', passwordHash: hash });

  const sampleExpenses = [
    { userId: user._id, amount: 15.5, category: 'Food', note: 'Lunch', date: new Date() },
    { userId: user._id, amount: 30, category: 'Transport', note: 'Taxi', date: new Date() },
    { userId: user._id, amount: 120, category: 'Groceries', note: 'Weekly groceries', date: new Date() }
  ];
  await Expense.insertMany(sampleExpenses);
  console.log('Seed complete. Credentials: test@example.com / Password123!');
  process.exit(0);
}
run().catch(e=>{ console.error(e); process.exit(1); });
