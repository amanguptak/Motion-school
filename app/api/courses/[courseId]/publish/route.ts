import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course Not found", { status: 404 });
    }

    // here checking that at least one of the chapter is published or not

    const hasPublishedChapter = course.chapters.some((ch) => ch.isPublished);

    if (
      !course ||
      !course.title ||
      !course.description ||
      !course.price ||
      !course.imageUrl ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse);
  } catch (err) {
    console.log("Course Publish", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
