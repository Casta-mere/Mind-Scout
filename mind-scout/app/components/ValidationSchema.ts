import { z } from "zod";

export const NoteSchema = z.object({
  title: z.string().min(0).max(255).optional(),
  description: z.string().min(0).max(255).optional(),
  content: z.string().min(0).optional(),
});

export const PatchNoteSchema = z.object({
  title: z.string().min(0).max(255).optional(),
  description: z.string().min(0).max(255).optional(),
  content: z.string().min(0).optional(),
  status: z.enum(["IN_PROGRESS", "ARCHIEVED"]).optional(),
  scope: z.enum(["PUBLIC", "PROTECTED", "PRIVATE"]).optional(),
});
