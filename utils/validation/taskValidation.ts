import { z } from 'zod';

export const taskValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(30, 'Title must be at most 30 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be at most 100 characters'),
  dateTime: z
    .string()
    .regex(
      /^([0-2]\d|30)\.(0\d|1[0-2])\.\d{4} ([0-1]\d|2[0-3]):([0-5]\d)$/,
      'Date and time must be in format DD.MM.YYYY HH:MM with valid values',
    ),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(70, 'Location must be at most 80 characters'),
});

export type taskValidationType = z.infer<typeof taskValidationSchema>;
