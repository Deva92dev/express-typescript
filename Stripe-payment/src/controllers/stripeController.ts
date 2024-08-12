import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const stripePayment = async (req: Request, res: Response) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  const calculateOrderAmount = total_amount + shipping_fee;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent);

  res.json({ clientSecret: paymentIntent.client_secret });
};
