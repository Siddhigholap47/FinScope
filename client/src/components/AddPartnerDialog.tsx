import { useState } from 'react';
import { Users, Mail, Percent, Target, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';
import { Slider } from './ui/slider';

interface AddPartnerDialogProps {
  trigger?: React.ReactNode;
}

export function AddPartnerDialog({ trigger }: AddPartnerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [budgetType, setBudgetType] = useState('');
  const [contribution, setContribution] = useState([50]);
  const [budgetName, setBudgetName] = useState('');
  const [budgetDescription, setBudgetDescription] = useState('');

  const handleAddPartner = () => {
    if (!partnerEmail || !partnerName || !budgetType || !budgetName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Store partner data
    const partners = JSON.parse(localStorage.getItem('partners') || '[]');
    const newPartner = {
      id: Date.now().toString(),
      email: partnerEmail,
      name: partnerName,
      type: budgetType,
      budgetName,
      description: budgetDescription,
      yourContribution: contribution[0],
      theirContribution: 100 - contribution[0],
      createdAt: new Date().toISOString(),
      active: true,
    };

    partners.push(newPartner);
    localStorage.setItem('partners', JSON.stringify(partners));

    toast.success(`🎉 Budget invitation sent to ${partnerName}!`);
    
    // Reset form
    setPartnerEmail('');
    setPartnerName('');
    setBudgetType('');
    setBudgetName('');
    setBudgetDescription('');
    setContribution([50]);
    setIsOpen(false);

    // Trigger page refresh to show new partner
    window.dispatchEvent(new Event('partnersUpdated'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl">
            <Users className="w-4 h-4 mr-2" />
            Add Partner / Friend
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F4F754]" />
            Create Shared Budget
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Budget Type */}
          <div>
            <Label htmlFor="budget-type">Budget Type *</Label>
            <Select value={budgetType} onValueChange={setBudgetType}>
              <SelectTrigger className="rounded-xl mt-1">
                <SelectValue placeholder="Select budget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="couple">💑 Couple Budget</SelectItem>
                <SelectItem value="friend">👥 Friend Budget</SelectItem>
                <SelectItem value="family">👨‍👩‍👧‍👦 Family Budget</SelectItem>
                <SelectItem value="roommate">🏠 Roommate Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Name */}
          <div>
            <Label htmlFor="budget-name">Budget Name *</Label>
            <Input
              id="budget-name"
              placeholder="e.g., Goa Trip ✈️, Dinner Nights 🍽️"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              className="rounded-xl mt-1"
            />
          </div>

          {/* Budget Description */}
          <div>
            <Label htmlFor="budget-description">Description (Optional)</Label>
            <Textarea
              id="budget-description"
              placeholder="What's this budget for?"
              value={budgetDescription}
              onChange={(e) => setBudgetDescription(e.target.value)}
              className="rounded-xl mt-1"
              rows={2}
            />
          </div>

          {/* Partner Details */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4E61D3]" />
              Partner Details
            </h4>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="partner-name">Partner Name *</Label>
                <Input
                  id="partner-name"
                  placeholder="e.g., Priya Sharma"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="partner-email">Partner Email / Username *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="partner-email"
                    type="email"
                    placeholder="partner@example.com"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="rounded-xl pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contribution Split */}
          <div className="bg-gradient-to-br from-[#F4F754]/10 to-[#E9D484]/10 rounded-xl p-4">
            <Label className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-[#4E61D3]" />
              Contribution Split
            </Label>
            
            <div className="space-y-4">
              <Slider
                value={contribution}
                onValueChange={setContribution}
                max={100}
                step={5}
                className="w-full"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">You</p>
                  <p className="text-2xl font-medium text-[#4E61D3]">{contribution[0]}%</p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">{partnerName || 'Partner'}</p>
                  <p className="text-2xl font-medium text-[#CFADC1]">{100 - contribution[0]}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleAddPartner}
              className="w-full bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl py-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Shared Budget & Invite
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
