import { signJwtAccessToken } from '@/app/functions/jwt';
import prisma from '@/app/functions/prisma';
import * as bcrypt from 'bcrypt';
// Configuration
import settings from '@/settings/settings';

interface RequestBody {
	username: string;
	password: string;
}

export async function POST(request: Request) {
	const dev = process.env.NODE_ENV === 'development';
	const body: RequestBody = await request.json();
	let user;

	if (dev) {
		user = settings.DUMMY_USER_INFOS;
	} else {
		user = await prisma.appUsers.findFirst({
			where: {
				email: body.username,
			},
		});
	}

	if (user && (await bcrypt.compare(body.password, user.password))) {
		const { password, ...userWithoutPass } = user;
		const accessToken = signJwtAccessToken(userWithoutPass);
		const result = { ...userWithoutPass, accessToken };

		return new Response(JSON.stringify(result));
	} else return new Response(JSON.stringify(null));
}
