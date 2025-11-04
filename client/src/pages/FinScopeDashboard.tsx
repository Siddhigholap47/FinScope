import { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Target,
  PartyPopper,
  Users,
  IndianRupee,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { AddPartnerDialog } from "../components/AddPartnerDialog";
import { SharedBudgetCard } from "../components/SharedBudgetCard";
import { WelcomeTour } from "../components/WelcomeTour";
import { EmptySharedBudgets } from "../components/EmptySharedBudgets";
import { QuickStats } from "../components/QuickStats";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export function FinScopeDashboard() {
  const userName = localStorage.getItem("userName") || "User";
  const userType = localStorage.getItem("userType") || "employee";
  const partnerName = localStorage.getItem("partnerName") || "";

  const [showCelebration, setShowCelebration] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [partners, setPartners] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
  } | null>(null);

  useEffect(() => {
    // Load initial partners from localStorage (temporary, replace with backend fetch later)
    const loadPartners = () => {
      const storedPartners = JSON.parse(localStorage.getItem("partners") || "[]");
      setPartners(storedPartners.filter((p: any) => p.active));
    };

    loadPartners();

    // Future backend call placeholder
    // fetch("/api/dashboard")
    //   .then((res) => res.json())
    //   .then(setDashboardData)
    //   .catch(() => setDashboardData(null));

    window.addEventListener("partnersUpdated", loadPartners);
    return () => window.removeEventListener("partnersUpdated", loadPartners);
  }, []);

  const handleDeletePartner = (id: string) => {
    const storedPartners = JSON.parse(localStorage.getItem("partners") || "[]");
    const updatedPartners = storedPartners.map((p: any) =>
      p.id === id ? { ...p, active: false } : p
    );
    localStorage.setItem("partners", JSON.stringify(updatedPartners));
    setPartners(updatedPartners.filter((p: any) => p.active));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-8">
      <WelcomeTour />

      {/* Celebration Modal */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCelebration(false)}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-[#F4F754] to-[#E9D484] rounded-3xl p-8 text-center shadow-2xl"
          >
            <PartyPopper className="w-16 h-16 mx-auto text-[#4E61D3] mb-4" />
            <h2 className="text-gray-900 mb-2">Goal Achieved! 🎉</h2>
            <p className="text-gray-700">Congratulations on reaching your target!</p>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white/60 via-white/50 to-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-gray-900 flex items-center gap-2">
              Welcome back, {userName}!
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                👋
              </motion.span>
            </h1>
            <p className="text-gray-600 mt-1">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-3">
            {partners.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] px-4 py-2 rounded-xl shadow-lg text-white cursor-pointer"
                onClick={() => (window.location.href = "/settings")}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {partners.length} Shared Budget
                  {partners.length > 1 ? "s" : ""}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {dashboardData ? (
          <QuickStats
            totalIncome={dashboardData.totalIncome}
            totalExpense={dashboardData.totalExpense}
            totalSavings={dashboardData.totalBalance}
            partnersCount={partners.length}
          />
        ) : (
          <div className="text-center text-gray-500 border border-dashed rounded-2xl p-10">
            No financial data yet. Connect your account to see insights.
          </div>
        )}
      </motion.div>

      {/* Shared Budgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {partners.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#4E61D3]" />
                Shared Budgets
              </h2>
              <AddPartnerDialog />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner) => (
                <SharedBudgetCard
                  key={partner.id}
                  budget={partner}
                  onDelete={handleDeletePartner}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptySharedBudgets />
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-[#F4F754]/20 via-[#E9D484]/15 to-[#CFADC1]/10 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg"
      >
        <h3 className="text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#4E61D3]" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Add Expense */}
          <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-to-r from-[#EF4444] to-[#F87171] hover:from-[#DC2626] hover:to-[#EF4444] text-white rounded-xl py-6 shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Expense
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" className="rounded-xl pl-10" />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-[#4E61D3] rounded-xl">Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Income */}
          <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#059669] hover:to-[#10B981] text-white rounded-xl py-6 shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Income
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" className="rounded-xl pl-10" />
                  </div>
                </div>
                <div>
                  <Label>Source</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-[#4E61D3] rounded-xl">Add Income</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Set Goal */}
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-to-r from-[#CFADC1] to-[#E9D484] hover:from-[#B89AAD] hover:to-[#D4BE70] text-white rounded-xl py-6 shadow-lg">
                  <Target className="w-5 h-5 mr-2" />
                  Set Goal
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Set Financial Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Goal Title</Label>
                  <Input placeholder="e.g., Goa Trip" className="rounded-xl" />
                </div>
                <div>
                  <Label>Target Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input type="number" placeholder="0" className="rounded-xl pl-10" />
                  </div>
                </div>
                <Button className="w-full bg-[#4E61D3] rounded-xl">Create Goal</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Upload Receipt */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="w-full bg-gradient-to-r from-[#E9D484] to-[#F4F754] hover:from-[#D4BE70] hover:to-[#E9D484] text-gray-900 rounded-xl py-6 shadow-lg">
              <Upload className="w-5 h-5 mr-2" />
              Upload Receipt
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
