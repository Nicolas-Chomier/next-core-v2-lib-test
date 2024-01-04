import { NextResponse } from 'next/server';
import { AddUserSchema } from '@/app/schema/addUserForm';
import prisma from '@/app/functions/prisma';
import * as bcrypt from 'bcrypt';
import { verifyAccessToken } from '@/app/functions/verifyAccessToken';

type TAddUserForm = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

export async function POST(request: Request) {
	// Parse and validate the request body
	const body = await parseAndValidateRequestBody(request);
	if (!body) {
		return NextResponse.json(
			{ message: 'Unprocessable Content !' },
			{ status: 422 },
		);
	}

	// Verify the access token
	if (!verifyAccessToken(request)) {
		return NextResponse.json(
			{ message: 'Unauthorized !' },
			{ status: 401 },
		);
	}

	// Handle user creation
	return await createUser(body);

	async function parseAndValidateRequestBody(
		request: Request,
	): Promise<TAddUserForm | null> {
		try {
			const body: TAddUserForm = await request.json();
			const result = AddUserSchema.safeParse(body);
			return result.success ? body : null;
		} catch {
			return null;
		}
	}

	async function createUser(body: TAddUserForm) {
		try {
			await prisma.appUsers.create({
				data: {
					name: body.name,
					email: body.email,
					password: await bcrypt.hash(body.password, 10),
					rank: body.rank,
				},
			});
			return NextResponse.json(
				{ message: 'Success !', userName: body.name },
				{ status: 200 },
			);
		} catch (error) {
			return NextResponse.json(
				{ message: 'Internal Server Error !' },
				{ status: 500 },
			);
		}
	}
}
