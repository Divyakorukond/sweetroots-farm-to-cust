import { CheckCircle, Package, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSuccessProps {
  orderId: string;
  onContinueShopping: () => void;
}

const OrderSuccess = ({ orderId, onContinueShopping }: OrderSuccessProps) => {
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for choosing SweetRoots Naturals
          </p>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Order #{orderId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a confirmation email with your order details
              </p>
            </div>

            {/* Order Timeline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-400">Processing</p>
                  <p className="text-xs text-muted-foreground">1-2 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-400">Shipped</p>
                  <p className="text-xs text-muted-foreground">3-5 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Home className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-400">Delivered</p>
                  <p className="text-xs text-muted-foreground">5-7 business days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full" onClick={onContinueShopping}>
            Continue Shopping
          </Button>
          <Button variant="outline" className="w-full">
            Track Your Order
          </Button>
        </div>

        {/* Support */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Need help? Contact us at</p>
          <p className="font-medium">hello@sweetroots.com</p>
          <p>+91 98765 43210</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;