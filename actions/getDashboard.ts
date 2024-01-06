import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./getProgress";

interface CourseWithProgress extends Course {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
}

interface DashboardCourse {
  completedCourses: CourseWithProgress[];
  inProgressCourses: CourseWithProgress[];
}

export const getDashboardCourse = async (
  userId: string
): Promise<DashboardCourse> => {
  try {
    const purchasedCourse = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourse.map(
      (purchase) => purchase.course
    ) as CourseWithProgress[];
    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const inProgressCourses = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      inProgressCourses,
    };
  } catch (err) {
    console.log(err);
    return {
      completedCourses: [],
      inProgressCourses: [],
    };
  }
};
