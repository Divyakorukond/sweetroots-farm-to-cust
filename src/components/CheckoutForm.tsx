import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import PaymentOptions from '@/components/PaymentOptions';
import { toast } from 'sonner';

interface CheckoutFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutForm = ({ open, onOpenChange }: CheckoutFormProps) => {
  const [paymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const { totalPrice } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    onOpenChange(false);
    setPaymentOptionsOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOptionsOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Optional"
            />
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">₹{totalPrice}</span>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </DialogContent>
      
      <PaymentOptions 
        open={paymentOptionsOpen}
        onOpenChange={handlePaymentClose}
        customerData={formData}
      />
    </Dialog>
  );
};

export default CheckoutForm;