import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const tributeSchema = z.object({
  retireeId: z.string().min(1, "Please select a retiree"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Tribute must be at least 10 characters")
    .max(1000, "Tribute must be less than 1000 characters"),
  department: z.string().min(1, "department must be at least 1 characters"),
  image: z.instanceof(File).optional(),
  video: z.instanceof(File).optional(),
})

export const retireeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  retirementDate: z.string().min(1, "Please select a retirement date"),
  yearsOfService: z.number().min(1, "Years of service must be at least 1"),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type TributeFormData = z.infer<typeof tributeSchema>
export type RetireeFormData = z.infer<typeof retireeSchema>
