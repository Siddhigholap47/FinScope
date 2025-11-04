import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Receipt } from 'lucide-react';

export function AddReceiptDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!file) {
      toast.error('Please select a receipt file.');
      return;
    }

    // Simulate saving receipt
    toast.success(`Receipt "${file.name}" uploaded successfully!`);
    setFile(null);
    setDescription('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-2xl p-6 bg-gradient-to-br from-[#4E61D3]/10 via-[#CFADC1]/10 to-[#F4F754]/10 backdrop-blur-xl border border-white/40 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-xl flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#4E61D3]" />
            Upload Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="receiptFile">Select Receipt File</Label>
            <Input
              id="receiptFile"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="rounded-xl mt-1"
            />
          </div>

          <div>
            <Label htmlFor="desc">Description (optional)</Label>
            <Input
              id="desc"
              placeholder="E.g., Grocery bill, Electricity receipt..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl mt-1"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#4E61D3] hover:bg-[#3d4fb3] rounded-xl"
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
