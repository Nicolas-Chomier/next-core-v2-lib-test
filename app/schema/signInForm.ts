import { ZodType, z } from 'zod';

export type TSignInForm = {
	email: string;
	password: string;
};

export const SignInFormSchema: ZodType<TSignInForm> = z.object({
	email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),
	password: z.coerce
		.string()
		.min(3, 'Password to short')
		.max(90, 'Password to long'),
});
