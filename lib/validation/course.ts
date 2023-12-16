
import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Tittle is too long" }),
});

export const customizeCourseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Tittle is too long" }),
  // courseId : z.string().min(1 ,{message: "Course id is required"})
  description: z.string(),
});

export const courseImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const lessonVideoSchema = z.object({
  videoUrl: z.string().min(1, {message:"video is required"}),
});

export const courseCatSchema = z.object({
  categoryId: z.string().min(1, { message: "Category is required" }),
});

export const priceFormSchema = z.object({ 
  price : z.coerce.number()
})

export const chaptersSchema = z.object({
  title : z.string().min(1, { message: "Title is required" })
})

export const chapterAccessSchema = z.object({
  isFree : z.boolean().default(false)
})

export const lessonYoutubeSchema = z.object({
  youtubeUrl: z.string()
});

export type CourseSchema = z.infer<typeof courseSchema>;
export type chaptersSchemaType = z.infer<typeof chaptersSchema>;
export type chapterAccessSchemaType = z.infer<typeof chapterAccessSchema>
export type customizeCourseSchemaType = z.infer<typeof customizeCourseSchema>;
export type courseImageSchemaType = z.infer<typeof courseImageSchema>;
export type courseCatSchemaType = z.infer<typeof courseCatSchema>;
export type priceFormSchemaType = z.infer<typeof priceFormSchema>;
export type lessonVideoSchemaType = z.infer<typeof lessonVideoSchema>;

export type lessonYoutubeSchemaType = z.infer<typeof lessonYoutubeSchema>