import { NextResponse } from 'next/server';
import prisma from '@/app/functions/prisma';

export async function GET() {
	try {
		const data = await prisma.appUsers.findMany();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal Server Error !' },
			{ status: 500 },
		);
	}
}
export const dynamic = 'force-dynamic';
