import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
});
