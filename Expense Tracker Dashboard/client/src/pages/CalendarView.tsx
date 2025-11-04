import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingDown, Plus, Upload, Camera, IndianRupee, Receipt } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

interface ExpenseItem {
  title: string;
  amount: number;
  category: string;
  receipt?: string;
  note?: string;
}

interface DayExpense {
  date: number;
  amount: number;
  expenses: ExpenseItem[];
}

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayExpense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Form state
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseNote, setExpenseNote] = useState('');
  const [expenseReceipt, setExpenseReceipt] = useState<string | null>(null);

  // Initially empty data
  const [expenseData, setExpenseData] = useState<{ [key: number]: DayExpense }>({});

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const getIntensityColor = (amount: number) => {
    if (!amount) return 'bg-gray-100';
    if (amount < 200) return 'bg-green-200';
    if (amount < 500) return 'bg-yellow-200';
    if (amount < 1000) return 'bg-orange-200';
    return 'bg-red-300';
  };

  const handleDayClick = (day: number) => {
    if (expenseData[day]) {
      setSelectedDay(expenseData[day]);
      setIsDialogOpen(true);
    } else {
      setSelectedDate(day);
      setIsAddExpenseDialogOpen(true);
    }
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setExpenseReceipt(reader.result as string);
        toast.success('Receipt uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExpense = () => {
    if (!expenseAmount || !expenseTitle || !expenseCategory || selectedDate === null) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newExpense: ExpenseItem = {
      title: expenseTitle,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      note: expenseNote || undefined,
      receipt: expenseReceipt || undefined,
    };

    const updatedData = { ...expenseData };
    if (updatedData[selectedDate]) {
      updatedData[selectedDate].expenses.push(newExpense);
      updatedData[selectedDate].amount += newExpense.amount;
    } else {
      updatedData[selectedDate] = {
        date: selectedDate,
        amount: newExpense.amount,
        expenses: [newExpense],
      };
    }

    setExpenseData(updatedData);

    setExpenseAmount('');
    setExpenseTitle('');
    setExpenseCategory('');
    setExpenseNote('');
    setExpenseReceipt(null);
    setIsAddExpenseDialogOpen(false);

    toast.success('Expense added successfully!');
  };

  const totalMonthSpend = Object.values(expenseData).reduce((sum, day) => sum + day.amount, 0);
  const averageDailySpend = Object.keys(expenseData).length
    ? Math.round(totalMonthSpend / Object.keys(expenseData).length)
    : 0;

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-gray-900">Spending Calendar 📅</h1>
        <p className="text-gray-600 mt-1">Track your daily expenses easily</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] rounded-3xl p-6 text-white shadow-xl"
        >
          <p className="text-white/80 mb-1">Total Spent This Month</p>
          <p className="text-white text-3xl">{formatINR(totalMonthSpend)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#CFADC1] to-[#E9D484] rounded-3xl p-6 text-white shadow-xl"
        >
          <p className="text-white/80 mb-1">Average Daily Spend</p>
          <p className="text-white text-3xl">{formatINR(averageDailySpend)}</p>
        </motion.div>
      </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-lg"
      >
        {/* Month Nav */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => changeMonth(-1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <Button variant="outline" size="sm" onClick={() => changeMonth(1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-700 py-3 font-medium">
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayData = expenseData[day];
            const hasExpense = !!dayData;

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDayClick(day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 ${
                  hasExpense
                    ? `${getIntensityColor(dayData.amount)} border-white shadow-md`
                    : 'bg-white/80 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="text-gray-900 font-medium">{day}</span>
                {hasExpense && (
                  <>
                    <span className="text-xs text-gray-700 mt-1 font-medium">
                      {formatINR(dayData.amount)}
                    </span>
                    {dayData.expenses.some(e => e.receipt) && (
                      <Receipt className="w-3 h-3 text-[#4E61D3] absolute top-1.5 right-1.5" />
                    )}
                  </>
                )}
                {!hasExpense && (
                  <Plus className="w-5 h-5 text-gray-400 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Dialogs */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDay &&
                `${currentMonth.toLocaleDateString('en-US', { month: 'long' })} ${selectedDay.date}`}
            </DialogTitle>
          </DialogHeader>

          {selectedDay && (
            <div className="space-y-4 mt-4">
              <div className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-2xl p-4 text-white">
                <p>Total Spent: {formatINR(selectedDay.amount)}</p>
              </div>

              {selectedDay.expenses.map((expense, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium">{expense.title}</p>
                  <p className="text-gray-600 text-sm">{expense.category}</p>
                  {expense.note && <p className="text-xs mt-1 italic">{expense.note}</p>}
                  <p className="text-red-600 text-lg mt-1">{formatINR(expense.amount)}</p>
                  {expense.receipt && (
                    <img
                      src={expense.receipt}
                      alt="Receipt"
                      className="mt-2 rounded-lg border border-gray-200"
                    />
                  )}
                </div>
              ))}

              <Button
                onClick={() => {
                  setSelectedDate(selectedDay.date);
                  setIsDialogOpen(false);
                  setIsAddExpenseDialogOpen(true);
                }}
                className="w-full bg-[#4E61D3] rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Expense
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
        <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>
              Add Expense
              {selectedDate && ` - ${currentMonth.toLocaleDateString('en-US', { month: 'long' })} ${selectedDate}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="expense-title">Expense Title *</Label>
              <Input
                id="expense-title"
                placeholder="e.g., Grocery Shopping"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="expense-amount">Amount (₹) *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="expense-category">Category *</Label>
              <Select value={expenseCategory} onValueChange={setExpenseCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">🍽️ Food & Dining</SelectItem>
                  <SelectItem value="Transport">🚗 Transportation</SelectItem>
                  <SelectItem value="Shopping">🛍️ Shopping</SelectItem>
                  <SelectItem value="Bills">⚡ Bills & Utilities</SelectItem>
                  <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="Health">🏥 Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expense-note">Note (Optional)</Label>
              <Textarea
                id="expense-note"
                placeholder="Add any details..."
                value={expenseNote}
                onChange={(e) => setExpenseNote(e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <Label>Upload Receipt (Optional)</Label>
              <div className="mt-1 space-y-2">
                {expenseReceipt ? (
                  <div className="relative">
                    <img
                      src={expenseReceipt}
                      alt="Receipt preview"
                      className="w-full h-32 object-cover rounded-xl border-2 border-[#4E61D3]"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setExpenseReceipt(null)}
                      className="absolute top-2 right-2 rounded-full"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#4E61D3]">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Upload Image</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <label className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#4E61D3]">
                        <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Take Photo</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleAddExpense}
              className="w-full bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl"
            >
              Add Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
