import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, Building2, Wallet, Truck, Clock, ArrowLeft, QrCode } from 'lucide-react';
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
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    selectedUpiApp: ''
  });
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

  const handlePaymentMethod = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const processPayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Order placed.');
      clearCart();
      onOpenChange(false);
      setSelectedMethod(null);
      setLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    setSelectedMethod(null);
  };

  const upiApps = [
    { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-600' },
    { id: 'gpay', name: 'Google Pay', color: 'bg-blue-600' },
    { id: 'paytm', name: 'Paytm', color: 'bg-blue-500' },
    { id: 'bhim', name: 'BHIM UPI', color: 'bg-orange-600' }
  ];

  const renderPaymentInterface = () => {
    switch (selectedMethod) {
      case 'cards':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">Card Payment</h3>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                />
              </div>
            </div>
            <Button className="w-full" onClick={processPayment} disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
            </Button>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">UPI Payment</h3>
            </div>
            
            {!paymentData.selectedUpiApp ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Choose your UPI app:</p>
                <div className="grid grid-cols-2 gap-2">
                  {upiApps.map((app) => (
                    <Button
                      key={app.id}
                      variant="outline"
                      className="h-12 flex items-center gap-2"
                      onClick={() => setPaymentData(prev => ({ ...prev, selectedUpiApp: app.id }))}
                    >
                      <div className={`w-6 h-6 rounded ${app.color}`}></div>
                      {app.name}
                    </Button>
                  ))}
                </div>
                <div className="text-center text-sm text-muted-foreground">or</div>
                <div>
                  <Label htmlFor="upiId">Enter UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={paymentData.upiId}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e.target.value }))}
                  />
                </div>
                {paymentData.upiId && (
                  <Button className="w-full" onClick={processPayment} disabled={loading}>
                    {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-gray-100 rounded-lg p-6">
                  <QrCode className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-muted-foreground mb-2">Scan QR code with {upiApps.find(app => app.id === paymentData.selectedUpiApp)?.name}</p>
                  <p className="font-semibold">Amount: ₹{totalPrice}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setPaymentData(prev => ({ ...prev, selectedUpiApp: '' }))}
                >
                  Choose Different App
                </Button>
                <Button className="w-full" onClick={processPayment} disabled={loading}>
                  {loading ? 'Processing...' : 'I have paid'}
                </Button>
              </div>
            )}
          </div>
        );

      case 'cod':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold">Cash on Delivery</h3>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <Truck className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <h4 className="font-semibold mb-2">Pay when you receive</h4>
              <p className="text-sm text-muted-foreground mb-4">
                You will pay ₹{totalPrice} in cash when your order is delivered
              </p>
              <p className="text-xs text-muted-foreground">
                Please keep exact change ready for faster delivery
              </p>
            </div>
            <Button className="w-full" onClick={processPayment} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Order'}
            </Button>
          </div>
        );

      default:
        return null;
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
        
        {selectedMethod ? (
          renderPaymentInterface()
        ) : (
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
        )}
        
        <div className="text-center text-xs text-muted-foreground border-t pt-4">
          Secure payments powered by Razorpay
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptions;