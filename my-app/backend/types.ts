// types.ts

import { z } from 'zod'

export type State = {
    start: number
}

export const userZodSchema = z.object({
	nickname: z.string(),
	password: z.string(),
	email: z.string()
})

export type User = z.infer<typeof userZodSchema>