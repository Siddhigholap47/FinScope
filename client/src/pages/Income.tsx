// FinScope Income Page - Clean Backend-Ready Version
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

const incomeCategories = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Rental',
  'Other',
];

interface IncomeEntry {
  _id?: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  type: 'income';
}

export function Income() {
  const [incomeRecords, setIncomeRecords] = useState<IncomeEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  // 🔹 Placeholder for future backend fetch
  useEffect(() => {
    // Example future API call:
    // fetch('/api/income')
    //   .then(res => res.json())
    //   .then(data => setIncomeRecords(data))
    //   .finally(() => setLoading(false));

    setLoading(false); // Remove once backend integration is live
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome: IncomeEntry = {
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      description: formData.description,
      type: 'income',
    };
    setIncomeRecords([newIncome, ...incomeRecords]);
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsDialogOpen(false);
  };

  const handleDelete = (id?: string) => {
    setIncomeRecords(incomeRecords.filter((r) => r._id !== id));
  };

  const handleExport = () => {
    if (incomeRecords.length === 0) return;
    const csvContent = [
      ['Title', 'Category', 'Amount', 'Date', 'Description'],
      ...incomeRecords.map((r) => [
        r.title,
        r.category,
        r.amount.toString(),
        r.date,
        r.description || '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'income-records.csv';
    a.click();
  };

  const filteredRecords = incomeRecords.filter(
    (record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalIncome = incomeRecords.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900">Income Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your income sources
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-[#4E61D3] text-[#4E61D3] hover:bg-[#4E61D3] hover:text-white rounded-xl"
            disabled={incomeRecords.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4E61D3] hover:bg-[#3d4fb0] text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Income
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Freelance Project"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
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
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add notes about this income"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4E61D3] hover:bg-[#3d4fb0] rounded-xl"
                >
                  Add Income
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-2xl p-6 text-white shadow-lg">
        <p className="text-white/80 mb-1">Total Income</p>
        <p className="text-white">₹{totalIncome.toLocaleString('en-IN')}</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search income records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-gray-300"
        />
      </div>

      {/* Income Records */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-gray-900 mb-4">Income Records</h3>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <p>Loading income records...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No income records found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((record) => (
              <TransactionCard
                key={record._id || record.title}
                {...record}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
