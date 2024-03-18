import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN", "US"],
      },

      shipping_options: [
        {
          shipping_rate: "shr_1OvnlUSDAwtszM1ml0izRqBV",
        },
        {
          shipping_rate: "shr_1OvnBcSDAwtszM1mRHiwkKyq",
        },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: cartItem.item.title,
          },
        },
      })),
    });
  } catch (err) {
    console.log("[Checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
