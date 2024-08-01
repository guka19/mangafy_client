import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage: React.FC = () => {
  const { totalPrice } = useParams<{ totalPrice: string }>(); // Get totalPrice from URL params
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const navigate = useNavigate();
  
  const price = totalPrice ? parseFloat(totalPrice) : 0;

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "creditCard") {
      if (!cardNumber || !cardExpiry || !cardCVC) {
        toast.error("Please fill in all credit card fields.");
        return;
      }
    }

    if (paymentMethod === "paypal" && !paypalEmail) {
      toast.error("Please enter your PayPal email.");
      return;
    }

    toast.success("Checkout successful!");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        {paymentMethod === null ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Select Payment Method</label>
            <Select onValueChange={handlePaymentMethodChange}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="creditCard">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {paymentMethod === "creditCard" && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <Input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <Input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <Input
                    type="text"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">PayPal Email</label>
                <Input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            )}

            <div className="mb-6">
              <span className="text-lg font-semibold">Total Price: ${price.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Complete Checkout
            </Button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
