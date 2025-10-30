import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Banknote, CheckCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentProps {
  orderData: any;
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

const Payment = ({ orderData, onBack, onSuccess }: PaymentProps) => {
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");

  const upiApps = [
    { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-600' },
    { id: 'gpay', name: 'Google Pay', color: 'bg-blue-600' },
    { id: 'paytm', name: 'Paytm', color: 'bg-blue-500' },
    { id: 'bhim', name: 'BHIM UPI', color: 'bg-orange-600' }
  ];

  const processPayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `SR${Date.now()}`;
    onSuccess(orderId);
    setProcessing(false);
  };

  const renderPaymentForm = () => {
    switch (orderData.paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
        );

      case "upi":
        return (
          <div className="space-y-4">
            {!selectedUpiApp ? (
              <div className="space-y-4">
                <p className="text-sm font-medium">Choose your UPI app:</p>
                <div className="grid grid-cols-2 gap-3">
                  {upiApps.map((app) => (
                    <Button
                      key={app.id}
                      variant="outline"
                      className="h-16 flex flex-col items-center gap-2"
                      onClick={() => setSelectedUpiApp(app.id)}
                    >
                      <div className={`w-8 h-8 rounded ${app.color}`}></div>
                      <span className="text-sm">{app.name}</span>
                    </Button>
                  ))}
                </div>
                <div className="text-center text-sm text-muted-foreground">or</div>
                <div>
                  <Label htmlFor="upiId">Enter UPI ID manually</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Pay with {upiApps.find(app => app.id === selectedUpiApp)?.name}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedUpiApp('')}
                  >
                    Change
                  </Button>
                </div>
                <div className="text-center p-6 border-2 border-dashed rounded-lg bg-gray-50">
                  <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Scan QR code with {upiApps.find(app => app.id === selectedUpiApp)?.name}
                  </p>
                  <p className="font-semibold text-lg">₹{orderData.total}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Open your UPI app and scan this QR code to pay
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case "cod":
        return (
          <div className="text-center p-8">
            <Banknote className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
            <p className="text-muted-foreground">
              Pay ₹{orderData.total} when your order arrives
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getPaymentIcon = () => {
    switch (orderData.paymentMethod) {
      case "card": return <CreditCard className="h-5 w-5" />;
      case "upi": return <Smartphone className="h-5 w-5" />;
      case "cod": return <Banknote className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const getPaymentTitle = () => {
    switch (orderData.paymentMethod) {
      case "card": return "Card Payment";
      case "upi": return "UPI Payment";
      case "cod": return "Cash on Delivery";
      default: return "Payment";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checkout
        </Button>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{orderData.shipping}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{orderData.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getPaymentIcon()}
                {getPaymentTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderPaymentForm()}
              
              <Button 
                className="w-full mt-6" 
                onClick={processPayment}
                disabled={processing || (orderData.paymentMethod === 'upi' && !selectedUpiApp && !upiId)}
                size="lg"
              >
                {processing ? (
                  "Processing..."
                ) : orderData.paymentMethod === 'upi' && selectedUpiApp ? (
                  "I have paid"
                ) : (
                  `Pay ₹${orderData.total}`
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="text-center text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 inline mr-1" />
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;