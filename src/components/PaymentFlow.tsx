import { useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import OrderSuccess from "./OrderSuccess";

type FlowStep = "cart" | "checkout" | "payment" | "success";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

const PaymentFlow = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderData, setOrderData] = useState<any>(null);
  const [orderId, setOrderId] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartCheckout = (items: CartItem[], total: number) => {
    setCartItems(items);
    setCartTotal(total);
    setCurrentStep("checkout");
    setIsCartOpen(false);
  };

  const handleCheckoutPayment = (data: any) => {
    setOrderData(data);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = (id: string) => {
    setOrderId(id);
    setCurrentStep("success");
  };

  const handleBackToCart = () => {
    setCurrentStep("cart");
    setIsCartOpen(true);
  };

  const handleBackToCheckout = () => {
    setCurrentStep("checkout");
  };

  const handleContinueShopping = () => {
    setCurrentStep("cart");
    setIsCartOpen(false);
    // Reset state
    setCartItems([]);
    setCartTotal(0);
    setOrderData(null);
    setOrderId("");
  };

  const openCart = () => {
    setCurrentStep("cart");
    setIsCartOpen(true);
  };

  switch (currentStep) {
    case "cart":
      return (
        <div>
          {/* Cart trigger button for demo */}
          {!isCartOpen && (
            <div className="fixed bottom-4 right-4 z-40">
              <button
                onClick={openCart}
                className="bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              >
                Open Cart (2)
              </button>
            </div>
          )}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCartCheckout}
          />
        </div>
      );

    case "checkout":
      return (
        <Checkout
          items={cartItems}
          total={cartTotal}
          onBack={handleBackToCart}
          onPayment={handleCheckoutPayment}
        />
      );

    case "payment":
      return (
        <Payment
          orderData={orderData}
          onBack={handleBackToCheckout}
          onSuccess={handlePaymentSuccess}
        />
      );

    case "success":
      return (
        <OrderSuccess
          orderId={orderId}
          onContinueShopping={handleContinueShopping}
        />
      );

    default:
      return null;
  }
};

export default PaymentFlow;