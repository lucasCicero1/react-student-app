import { z } from "zod";

export const studentSchema = z.object({
  avatar: z.optional(z.string()),
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  cpf: z.string().length(11, "Cpf must have 11 characters"),
  status: z.string(),
});

export type StudentFormData = z.infer<typeof studentSchema>;

export const studentDeleteSchema = studentSchema.pick({ cpf: true });

export type StudentDeleteFormData = z.infer<typeof studentDeleteSchema>;
