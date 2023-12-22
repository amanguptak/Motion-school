import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    // allPublished form a specific course by courseId

    const allPublishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const allPublishedChaptersId = allPublishedChapters.map(
      (chapter) => chapter.id
    );

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: allPublishedChaptersId,
        },
        isCompleted: true,
      },
    });
    /* Here, chapterId is a column in the userProgress table, and allPublishedChaptersId is an array of chapter IDs.

The condition { in: allPublishedChaptersId } checks if the 
value of the chapterId column for a record is present in the
 allPublishedChaptersId array. In other words, it filters records
 where the chapterId is one of the values in the array. */
    const courseProgressPercentage =
      (validCompletedChapters / allPublishedChapters.length) * 100;

    return courseProgressPercentage;
  } catch (err) {
    console.error("progress", err);
    return 0;
  }
};
