import {z} from 'zod'

export const contentValidaton = z.string().min(6, "Content should be at least 6 characters").max(1000, "Content should not be more thant 1000 characters")

export const messageSchema = z.object({
        content: contentValidaton
})