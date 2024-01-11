import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

interface PurchaseWithCourse extends Purchase {
  course: Course;
}

const groupCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      // here we are finding those courses which created by educator based on userId
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });
    console.log(purchases, "checking grouped purchase");
    const totalEarnings = groupCourse(purchases);
    console.log("Analyticsd", totalEarnings);
    const data = Object.entries(totalEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    console.log("Analyticsd", data);
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (err) {
    console.log("inAnalytics", err);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
