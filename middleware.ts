export { default } from 'next-auth/middleware';
export const config = {
	matcher: ['/pages/:path*'],
};
console.log('Test middleWare');
