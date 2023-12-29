import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const POST = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { courseId } = params;
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    const isPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        },
      },
    });

    if (isPurchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      // creating customer for stripe
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      // adding that same customer in our db
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APPS_URL}/course/${course.id}?success=1`,
        cancel_url : `${process.env.NEXT_PUBLIC_APPS_URL}/course/${course.id}?canceled=1`,
        metadata:{
            courseId:course.id,
            userId : user.id,
        }
        // metadata is very Important
    
    })
    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.log("payment checkout", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
