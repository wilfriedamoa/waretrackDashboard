import { Subscription } from "./SubscriptionProps";

export interface PaymentProps {
  id: number;
  transaction_id: string;
  amount: string;
  currency: string;
  message: string;
  payment_method: string;
  description: string;
  operator_id: string;
  payment_date: string;
  fund_availability_date: string;
  subscription: Subscription;
}
