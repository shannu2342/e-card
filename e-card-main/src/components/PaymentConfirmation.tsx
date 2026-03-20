import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard, Smartphone, Banknote, X, Loader2 } from "lucide-react";

type PaymentMethod = "upi" | "card" | "cod";

interface PaymentConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  amount?: string;
  details: { label: string; value: string }[];
  type: "payment" | "booking" | "registration";
}

const PaymentConfirmation = ({ open, onClose, onConfirm, title, amount, details, type }: PaymentConfirmationProps) => {
  const [step, setStep] = useState<"review" | "payment" | "processing" | "confirmed">("review");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");

  if (!open) return null;

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("confirmed");
    }, 2000);
  };

  const handleDone = () => {
    setStep("review");
    setUpiId("");
    onConfirm();
    onClose();
  };

  const needsPayment = type === "payment" && amount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-6 py-4">
          <h3 className="font-display text-lg font-bold">{title}</h3>
          {step !== "processing" && step !== "confirmed" && (
            <button onClick={onClose} className="rounded-lg p-1.5 transition-colors hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Step: Review */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/40 p-4 space-y-2">
                {details.map((d, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium">{d.value}</span>
                  </div>
                ))}
                {amount && (
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-lg font-bold text-primary">{amount}</span>
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={() => needsPayment ? setStep("payment") : handlePay()}>
                {needsPayment ? "Proceed to Payment" : "Confirm"}
              </Button>
            </div>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Choose payment method</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "upi" as const, label: "UPI", icon: Smartphone },
                  { key: "card" as const, label: "Card", icon: CreditCard },
                  { key: "cod" as const, label: "COD", icon: Banknote },
                ].map(m => (
                  <button
                    key={m.key}
                    onClick={() => setPaymentMethod(m.key)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all ${
                      paymentMethod === m.key
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <m.icon className={`h-5 w-5 ${paymentMethod === m.key ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div>
                  <Label>UPI ID</Label>
                  <Input placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
                </div>
              )}
              {paymentMethod === "card" && (
                <div className="space-y-2">
                  <div><Label>Card Number</Label><Input placeholder="XXXX XXXX XXXX XXXX" /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
                    <div><Label>CVV</Label><Input placeholder="***" type="password" /></div>
                  </div>
                </div>
              )}
              {paymentMethod === "cod" && (
                <p className="rounded-lg bg-secondary/10 p-3 text-sm text-secondary flex items-center gap-2 font-bold">
                  <Banknote className="h-5 w-5" /> Pay {amount} at the time of delivery. No advance payment needed.
                </p>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-bold text-primary">{amount}</span>
                <Button onClick={handlePay}>Pay Now</Button>
              </div>
            </div>
          )}

          {/* Step: Processing */}
          {step === "processing" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="font-medium text-muted-foreground">Processing...</p>
            </div>
          )}

          {/* Step: Confirmed */}
          {step === "confirmed" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-primary">
                {type === "payment" ? "Payment Successful!" : type === "booking" ? "Booking Confirmed!" : "Registration Successful!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {type === "payment"
                  ? "Your order has been placed. You'll receive a confirmation shortly."
                  : type === "booking"
                  ? "Your appointment/service has been booked successfully."
                  : "You have been registered successfully. We'll contact you soon."}
              </p>
              <p className="text-xs text-muted-foreground">
                Reference: #SVCDA{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
              <Button onClick={handleDone} className="mt-2 w-full">Done</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
