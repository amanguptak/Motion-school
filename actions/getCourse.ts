import { Category, Course } from '@prisma/client';
import { db } from "@/lib/db";
import { getProgress } from './getProgress';

interface CourseWithProgressCategory extends Course{
    category: Category | null,
    chapters : {id : string}[];
    progress : number | null;
}

interface GetCourseProps {
  userId: string;
  title?: string;
  categoryId?: string;
}

export const getCourse = async ({
  userId,
  title,
  categoryId,
}: GetCourseProps):Promise<CourseWithProgressCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        category: true,
        purchases: {
          where: {
            userId,
          },
        },
      },orderBy:{
        createdAt : "asc"
      }
    });


    const courseWithProgress : CourseWithProgressCategory[] = await Promise.all(

      courses.map(async course =>{
        if(course.purchases.length ===0){
          return{
            ...course,
            progress:null,
          }
        }

        const progressPercentage = await getProgress(userId , course.id)
        return{
          ...course,
          progress:progressPercentage,
        }
      })
    )
    return courseWithProgress
  } catch (err) {
    console.log("getCourse", err);
    return [];
  }
};
