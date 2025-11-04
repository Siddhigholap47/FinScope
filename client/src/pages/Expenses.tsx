import { useState, useEffect } from 'react';
import { Plus, Download, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { TransactionCard } from '../components/TransactionCard';
import { getExpenses, addExpense, deleteExpense } from '../services/api'; // 🔌 future backend connection

const expenseCategories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Other',
];

interface ExpenseEntry {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: 'expense';
}

export function Expenses() {
  const [expenseRecords, setExpenseRecords] = useState<ExpenseEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  // 🧠 Load expenses from backend (future)
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses(); // from api.ts
        setExpenseRecords(data || []);
      } catch (err) {
        console.error('Failed to load expenses:', err);
      }
    };
    fetchExpenses();
  }, []);

  // ➕ Add expense (temporary local until backend integrated)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: ExpenseEntry = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      description: formData.description,
      type: 'expense',
    };

    try {
      await addExpense(newExpense); // 🔌 backend ready
      setExpenseRecords((prev) => [newExpense, ...prev]);
    } catch (err) {
      console.error('Failed to add expense:', err);
    }

    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsDialogOpen(false);
  };

  // 🗑️ Delete expense
  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id); // 🔌 backend ready
      setExpenseRecords((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  // 📤 Export as CSV
  const handleExport = () => {
    if (expenseRecords.length === 0) return;
    const csvContent = [
      ['Title', 'Category', 'Amount', 'Date', 'Description'],
      ...expenseRecords.map((r) => [
        r.title,
        r.category,
        r.amount.toString(),
        r.date,
        r.description,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  };

  const filteredRecords = expenseRecords.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalExpense = expenseRecords.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all your expenses</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-[#4E61D3] text-[#4E61D3] hover:bg-[#4E61D3] hover:text-white rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4E61D3] hover:bg-[#3d4fb0] text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Grocery Shopping"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add notes about this expense"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#4E61D3] hover:bg-[#3d4fb0] rounded-xl">
                  Add Expense
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-[#EF4444] to-[#F87171] rounded-2xl p-6 text-white shadow-lg">
        <p className="text-white/80 mb-1">Total Expenses</p>
        <p className="text-white">₹{totalExpense.toLocaleString('en-IN')}</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search expense records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-gray-300"
        />
      </div>

      {/* Expense Records */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-gray-900 mb-4">Expense Records</h3>
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No expense records yet. Add your first expense to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <TransactionCard key={record.id} {...record} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
