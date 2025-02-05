'use client';
import {usePathname} from 'next/navigation';

import {Footer} from './Footer';
import {Header} from './Header';
import {WithFonts} from './WithFonts';

import type {ReactNode} from 'react';

export function RootWrapper({children}: {children: ReactNode}): ReactNode {
	const pathname = usePathname();
	const isHomepage = pathname === '/';

	return (
		<WithFonts>
			<Header />
			{children}
			{isHomepage ? null : <Footer />}
		</WithFonts>
	);
}
