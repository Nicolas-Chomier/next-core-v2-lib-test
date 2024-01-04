import { NextResponse } from 'next/server';
import prisma from '@/app/functions/prisma';
import { verifyJwt } from '@/app/functions/jwt';

export async function DELETE(request: Request) {
	// Verification du token
	const header = request.headers.get('authorization');
	const accessToken = header && header.split(' ')[1];
	if (!accessToken || !verifyJwt(accessToken)) {
		return NextResponse.json(
			{ message: 'Unauthorized !' },
			{ status: 401 },
		);
	}

	// Verification du corp de la requete
	const searchParams = new URLSearchParams(request.url.split('?')[1]);
	if (searchParams.has('id')) {
		const id: string | null = searchParams.get('id');
		const userId = parseInt(id as string, 10);

		try {
			await prisma.appUsers.delete({
				where: {
					id: userId,
				},
			});

			return NextResponse.json(
				{ message: 'Success !', userId: userId },
				{ status: 200 },
			);
		} catch (error) {
			return NextResponse.json(
				{ message: 'Internal Server Error !' },
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
