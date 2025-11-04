import { useState, useEffect } from 'react';
import { Wallet, CreditCard, Building2, Smartphone, Plus, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import axios from '../services/api';

interface Account {
  _id?: string;
  name: string;
  type: 'wallet' | 'bank' | 'upi' | 'credit';
  balance: number;
  color: string;
}

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', balance: '' });

  // Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get('/accounts');
        setAccounts(res.data);
      } catch (err) {
        console.error('Error fetching accounts:', err);
      }
    };
    fetchAccounts();
  }, []);

  // Add new account
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount: Account = {
      name: formData.name,
      type: formData.type as any,
      balance: parseFloat(formData.balance),
      color: 'from-[#4E61D3] to-[#6B7FE8]',
    };
    try {
      const res = await axios.post('/accounts', newAccount);
      setAccounts([...accounts, res.data]);
      setFormData({ name: '', type: '', balance: '' });
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error adding account:', err);
    }
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const chartData = accounts.map((acc) => ({
    name: acc.name,
    value: acc.balance,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900 text-2xl font-semibold">My Accounts 💳</h1>
          <p className="text-gray-600 mt-1">Manage your financial accounts in one place</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] text-white rounded-xl shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label>Account Name</Label>
                <Input
                  placeholder="e.g., HDFC Bank"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label>Account Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wallet">💰 Wallet</SelectItem>
                    <SelectItem value="bank">🏦 Bank</SelectItem>
                    <SelectItem value="upi">📱 UPI</SelectItem>
                    <SelectItem value="credit">💳 Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Balance ($)</Label>
                <Input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="0.00"
                  required
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full bg-[#4E61D3] rounded-xl">
                Add
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Total Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#F4F754] via-[#E9D484] to-[#CFADC1] rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-gray-800" />
          <p className="text-gray-800 font-medium">Total Net Worth</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">${totalBalance.toLocaleString()}</p>
      </motion.div>

      {/* Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-lg"
      >
        <h3 className="text-gray-900 mb-4">Account Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account, index) => {
          const Icon =
            account.type === 'wallet'
              ? Wallet
              : account.type === 'bank'
              ? Building2
              : account.type === 'upi'
              ? Smartphone
              : CreditCard;
          return (
            <motion.div
              key={account._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${account.color} rounded-3xl p-6 text-white shadow-xl`}
            >
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-white/80 mb-1">{account.name}</p>
                  <p className="text-white font-semibold">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-xs uppercase text-white/80">{account.type}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Accounts;
