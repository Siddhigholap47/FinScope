import { useState } from 'react';
import {
  User,
  Users,
  Receipt,
  Settings as SettingsIcon,
  Bell,
  Globe,
  IndianRupee,
  Camera,
  Mail,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { AddPartnerDialog } from '../components/AddPartnerDialog';
import { AddReceiptDialog } from '../components/AddReceiptDialog';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const partners = JSON.parse(localStorage.getItem('partners') || '[]').filter(
    (p: any) => p.active
  );

  const handleSaveProfile = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    toast.success('Profile updated successfully!');
  };

  const handleSavePreferences = () => {
    localStorage.setItem('currency', currency);
    toast.success('Preferences saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-gray-900 flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-[#4E61D3]" />
          Settings & Profile
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account, preferences, and shared budgets
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#4E61D3]/10 via-[#CFADC1]/10 to-[#F4F754]/10 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarFallback className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] text-white text-3xl">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-[#F4F754] p-2 rounded-full shadow-lg hover:bg-[#E9D484] transition-colors">
              <Camera className="w-4 h-4 text-gray-800" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900">{userName}</h2>
            <p className="text-gray-600">{userEmail}</p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" className="rounded-xl" size="sm">
                Change Password
              </Button>
              <AddPartnerDialog
                trigger={
                  <Button className="bg-[#4E61D3] rounded-xl" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Add Partner/Friend
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-lg"
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="rounded-xl">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="joint-budgets" className="rounded-xl">
              <Users className="w-4 h-4 mr-2" />
              Joint Budgets
            </TabsTrigger>
            <TabsTrigger value="receipts" className="rounded-xl">
              <Receipt className="w-4 h-4 mr-2" />
              Receipts
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-xl pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Mumbai, India"
                      className="rounded-xl mt-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-[#4E61D3] rounded-xl"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Joint Budgets Tab */}
          <TabsContent value="joint-budgets" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Your Shared Budgets</h3>
              <AddPartnerDialog />
            </div>

            {partners.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">No shared budgets yet</p>
                <AddPartnerDialog
                  trigger={
                    <Button className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl">
                      <Users className="w-4 h-4 mr-2" />
                      Create Your First Shared Budget
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="space-y-3">
                {partners.map((partner: any) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-white/80 to-white/60 rounded-2xl border border-white/40"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-[#4E61D3]">
                        <AvatarFallback className="bg-gradient-to-br from-[#CFADC1] to-[#E9D484] text-white">
                          {partner.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-900">{partner.budgetName}</p>
                        <p className="text-sm text-gray-600">
                          with {partner.name} • {partner.yourContribution}%-
                          {partner.theirContribution}% split
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => navigate('/couples')}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Manage Receipts</h3>
              <AddReceiptDialog
                trigger={
                  <Button className="bg-[#4E61D3] rounded-xl">
                    <Receipt className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                }
              />
            </div>

            <div className="text-center py-12">
              <Receipt className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">No receipts uploaded yet</p>
              <p className="text-sm text-gray-500">
                Upload receipts when adding expenses to track them better
              </p>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-4">General Preferences</h3>
              <div className="space-y-5">
                {/* Currency */}
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F4F754]/20 rounded-lg">
                      <IndianRupee className="w-5 h-5 text-[#4E61D3]" />
                    </div>
                    <div>
                      <Label>Default Currency</Label>
                      <p className="text-sm text-gray-600">
                        Choose your preferred currency
                      </p>
                    </div>
                  </div>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-32 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ INR</SelectItem>
                      <SelectItem value="USD">$ USD</SelectItem>
                      <SelectItem value="EUR">€ EUR</SelectItem>
                      <SelectItem value="GBP">£ GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#CFADC1]/20 rounded-lg">
                      <Globe className="w-5 h-5 text-[#4E61D3]" />
                    </div>
                    <div>
                      <Label>Language</Label>
                      <p className="text-sm text-gray-600">
                        Choose display language
                      </p>
                    </div>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-32 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Notifications */}
                <h3 className="text-gray-900 mt-6 mb-4">Notifications</h3>

                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#E9D484]/20 rounded-lg">
                      <Bell className="w-5 h-5 text-[#4E61D3]" />
                    </div>
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">
                        Get notified about expenses and goals
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/60 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4E61D3]/20 rounded-lg">
                      <Mail className="w-5 h-5 text-[#4E61D3]" />
                    </div>
                    <div>
                      <Label>Email Alerts</Label>
                      <p className="text-sm text-gray-600">
                        Receive budget summaries via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>

                <Button
                  onClick={handleSavePreferences}
                  className="bg-[#4E61D3] rounded-xl"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
