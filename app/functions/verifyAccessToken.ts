import { verifyJwt } from '@/app/functions/jwt';

export function verifyAccessToken(request: Request) {
	const header = request.headers.get('authorization');
	const accessToken = header?.split(' ')[1];
	return accessToken && verifyJwt(accessToken);
}
