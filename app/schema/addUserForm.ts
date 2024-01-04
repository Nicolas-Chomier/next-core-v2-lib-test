import { ZodType, z } from 'zod';

type TAddUserForm = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

export const AddUserSchema: ZodType<TAddUserForm> = z.object({
	email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),
	name: z.coerce.string().toLowerCase().trim(),
	rank: z.coerce.string().toLowerCase().trim(),
	password: z.coerce
		.string()
		.min(3, 'Password to short')
		.max(90, 'Password to long'),
});
