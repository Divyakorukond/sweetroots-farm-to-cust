declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  method: {
    netbanking: boolean;
    card: boolean;
    wallet: boolean;
    upi: boolean;
    paylater: boolean;
    emi: boolean;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (options: RazorpayOptions): Promise<void> => {
  console.log('Initiating payment with options:', options);
  
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    console.error('Razorpay SDK failed to load');
    throw new Error('Razorpay SDK failed to load');
  }

  console.log('Razorpay SDK loaded successfully');
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};