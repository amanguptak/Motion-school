import {z} from "zod"

export const courseSchema = z.object({
    title : z.string().min(1 ,{message: "Title is required"}).max(50 ,{message: "Tittle is too long"}),


})


export const customizeCourseSchema = z.object({
    title : z.string().min(1 ,{message: "Title is required"}).max(50 ,{message: "Tittle is too long"}),
    // courseId : z.string().min(1 ,{message: "Course id is required"})
    description : z.string()
});

export type customizeCourseSchemaType = z.infer<typeof customizeCourseSchema>

export type CourseSchema = z.infer<typeof courseSchema>