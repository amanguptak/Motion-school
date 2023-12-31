import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { isCompleted } = await req.json();
    // "Upsert" is a database operation that combines the actions of "update" and "insert." The term "upsert" is a portmanteau of "update" and "insert." This operation is useful when you want to either update an existing record in the database or insert a new record if the specified conditions do not match any existing records.
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: params.chapterId,
        },
      },

      update: {
        isCompleted,
      },

      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (err) {
    console.log("progress", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
