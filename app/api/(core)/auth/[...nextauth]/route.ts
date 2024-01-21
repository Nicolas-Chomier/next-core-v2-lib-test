import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Your username here !',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Your password here !',
				},
			},
			async authorize(credentials, req: any) {
				const prod = process.env.NODE_ENV === 'production';
				let url;

				if (prod) {
					const baseUrl = new URL(
						req.headers['x-forwarded-proto'] +
							'://' +
							process.env.NEXT_PUBLIC_URI,
					);
					url = new URL('/api/login', baseUrl);
				} else {
					url = new URL('/api/login', process.env.NEXTAUTH_URL);
				}

				try {
					const res = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username: credentials?.username,
							password: credentials?.password,
						}),
					});
					const user = await res.json();
					if (user) {
						return user;
					} else {
						return null;
					}
				} catch (error) {
					console.error('Error during fetch: ', error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: '/',
	},
});

export { handler as GET, handler as POST };
