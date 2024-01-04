import { ZodType, z } from 'zod';

type TChangePassword = {
	password: string;
	confirm_password: string;
};

export const ChangePasswordSchema: ZodType<TChangePassword> = z
	.object({
		password: z.coerce
			.string()
			.min(3, 'Password to short')
			.max(90, 'Password to long'),
		confirm_password: z.coerce
			.string()
			.min(3, 'Password to short')
			.max(90, 'Password to long'),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		// path: ['confirmPassword'], // path of error
	});
