import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(0).max(255).optional(),
  description: z.string().min(0).max(255).optional(),
  content: z.string().min(0).optional(),
});
