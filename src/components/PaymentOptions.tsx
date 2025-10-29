import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, Smartphone, Building2, Wallet, Truck, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { initiatePayment } from '@/utils/razorpay';
import { toast } from 'sonner';

interface PaymentOptionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const PaymentOptions = ({ open, onOpenChange, customerData }: PaymentOptionsProps) => {
  const [loading, setLoading] = useState(false);
  const { totalItems, totalPrice, clearCart } = useCart();

  const paymentMethods = [
    {
      id: 'cards',
      title: 'Credit/Debit Cards',
      description: 'Visa, MasterCard, RuPay, Amex',
      icon: CreditCard,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'upi',
      title: 'UPI',
      description: 'GPay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      description: 'All major banks',
      icon: Building2,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'wallets',
      title: 'Wallets',
      description: 'Paytm, Mobikwik, Freecharge',
      icon: Wallet,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: Truck,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    },
    {
      id: 'paylater',
      title: 'Pay Later',
      description: 'Simpl, LazyPay, etc.',
      icon: Clock,
      color: 'bg-pink-50 text-pink-600 border-pink-200'
    }
  ];

  const handlePaymentMethod = async (methodId: string) => {
    setLoading(true);
    try {
      await initiatePayment({
        key: 'rzp_test_1234567890',
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'SweetRoots Naturals',
        description: `Order for ${totalItems} items`,
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone
        },
        theme: {
          color: '#f59e0b'
        },
        method: {
          netbanking: true,
          card: true,
          wallet: true,
          upi: true,
          paylater: true,
          emi: false
        },
        handler: (response) => {
          toast.success('Payment successful! Order placed.');
          clearCart();
          onOpenChange(false);
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          }
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Payment Method</DialogTitle>
          <div className="text-center text-sm text-muted-foreground">
            Total Amount: <span className="font-bold text-lg text-primary">₹{totalPrice}</span>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 py-4">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Button
                key={method.id}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform ${method.color}`}
                onClick={() => handlePaymentMethod(method.id)}
                disabled={loading}
              >
                <IconComponent className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{method.title}</div>
                  <div className="text-xs opacity-75">{method.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center text-xs text-muted-foreground border-t pt-4">
          Secure payments powered by Razorpay
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptions;