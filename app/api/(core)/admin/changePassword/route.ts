import { NextResponse } from 'next/server';
import { ChangePasswordSchema } from '@/app/schema/changePasswordForm';
import prisma from '@/app/functions/prisma';
import * as bcrypt from 'bcrypt';
import { verifyAccessToken } from '@/app/functions/verifyAccessToken';

type TNewPasswordForm = {
	newDraft: { password: string; confirm_password: string };
	id: number;
	token: string;
};

export async function PATCH(request: Request) {
	const body: TNewPasswordForm = await request.json();
	const userId = body.id;

	// Verify the access token
	if (!verifyAccessToken(request)) {
		return NextResponse.json(
			{ message: 'Unauthorized !' },
			{ status: 401 },
		);
	}

	// Verification du corp de la requete
	const checkingResult = checkRequestBody(body);
	if (checkingResult) {
		try {
			const hashedPassword = await bcrypt.hash(
				body.newDraft.password,
				10,
			);
			await prisma.appUsers.update({
				where: {
					id: userId,
				},
				data: {
					password: hashedPassword,
				},
			});
			return NextResponse.json({ message: 'Success !' }, { status: 200 });
		} catch (error) {
			return NextResponse.json(
				{ message: error || 'Internal Server Error !' },
				{ status: 500 },
			);
		}
	} else {
		return NextResponse.json(
			{ message: 'Unprocessable Content !' },
			{ status: 422 },
		);
	}
}

function checkRequestBody(object: TNewPasswordForm): boolean {
	if (!object.id) return false;
	const result = ChangePasswordSchema.safeParse({ ...object.newDraft });
	return result.success;
}
