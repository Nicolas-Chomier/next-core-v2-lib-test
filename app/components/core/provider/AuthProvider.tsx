// React core
import { ReactNode } from 'react';
// Modules externes / Bibliothèques tiers
import { SessionProvider } from 'next-auth/react';

type TProvidersProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: TProvidersProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};
