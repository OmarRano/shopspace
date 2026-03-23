import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { CreditCard, MapPin, Package } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Checkout() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState<"address" | "payment">("address");

  const [addressData, setAddressData] = useState({
    fullName: "Engr Umar Ayuba Rano",
    email: "umar@example.com",
    phone: "+234 (0) 123 456 7890",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos",
    zipCode: "100001",
    country: "Nigeria",
  });

  const [orderData] = useState({
    subtotal: 28200,
    tax: 2115,
    shipping: 0,
    total: 30315,
    items: 3,
  });

  const initiatePaymentMutation = trpc.payment.initiatePayment.useMutation({
    onSuccess: (data) => {
      toast.success("Redirecting to payment...");
      setTimeout(() => {
        if (data.paymentLink) {
          window.open(data.paymentLink, "_blank");
        }
      }, 500);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to initiate payment");
    },
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressData.fullName || !addressData.address || !addressData.city) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order first, then initiate payment
    // For now, using a mock order ID
    const mockOrderId = "ORD-" + Date.now();
    initiatePaymentMutation.mutate({
      orderId: mockOrderId,
      redirectUrl: window.location.origin + "/orders",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader title="Checkout" subtitle="Complete your purchase" />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === "address" && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </CardTitle>
                  <CardDescription>Where should we deliver your order?</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={addressData.fullName}
                          onChange={(e) =>
                            setAddressData({ ...addressData, fullName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={addressData.email}
                          onChange={(e) =>
                            setAddressData({ ...addressData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={addressData.phone}
                        onChange={(e) =>
                          setAddressData({ ...addressData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={addressData.address}
                        onChange={(e) =>
                          setAddressData({ ...addressData, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={addressData.city}
                          onChange={(e) =>
                            setAddressData({ ...addressData, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={addressData.state}
                          onChange={(e) =>
                            setAddressData({ ...addressData, state: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={addressData.zipCode}
                          onChange={(e) =>
                            setAddressData({ ...addressData, zipCode: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/cart")}
                      >
                        Back to Cart
                      </Button>
                      <Button type="submit" className="flex-1">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === "payment" && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>Select how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm font-medium text-slate-900 mb-2">Delivery To:</p>
                      <p className="text-sm text-slate-600">
                        {addressData.fullName}<br />
                        {addressData.address}<br />
                        {addressData.city}, {addressData.state} {addressData.zipCode}<br />
                        {addressData.phone}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                        <div className="flex items-center gap-3">
                          <input type="radio" id="monnify" name="payment" defaultChecked />
                          <label htmlFor="monnify" className="flex-1 cursor-pointer">
                            <p className="font-medium text-slate-900">Monnify Payment</p>
                            <p className="text-sm text-slate-600">Pay securely with Monnify</p>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep("address")}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={initiatePaymentMutation.isPending}
                      >
                        {initiatePaymentMutation.isPending
                          ? "Processing..."
                          : `Pay ₦${orderData.total.toLocaleString()}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card className="border-0 shadow-md sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{orderData.items} items</span>
                    <span className="font-medium">₦{orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-medium">₦{orderData.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{orderData.total.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-blue-600 text-white">
                      ✓
                    </div>
                    <span className="text-sm font-medium">Delivery Address</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentStep === "payment"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      2
                    </div>
                    <span className="text-sm font-medium">Payment</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-200 text-slate-600">
                      3
                    </div>
                    <span className="text-sm font-medium">Confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
