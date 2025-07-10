import { z } from "zod";

export const Subscribe = z.object({
  email: z.string().email(),
});
