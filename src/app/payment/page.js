"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentGateway from "../../components/common/PaymentGateway";

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("paymentData");
      if (stored) {
        setPaymentData(JSON.parse(stored));
      } else {
        // No payment data found, redirect back to home
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  const handleBack = () => {
    router.back();
  };

  const handlePaymentSuccess = () => {
    router.push("/Confirmation-countries");
  };

  const handlePaymentCancel = () => {
    router.back();
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading payment details...</div>
      </div>
    );
  }

  return (
    <PaymentGateway
      paymentData={paymentData}
      onBack={handleBack}
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentCancel={handlePaymentCancel}
    />
  );
}