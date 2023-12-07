import {z} from "zod"

export const courseSchema = z.object({
    title : z.string().min(1 ,{message: "Title is required"}).max(50 ,{message: "Tittle is too long"}),


})

export type CourseSchema = z.infer<typeof courseSchema>