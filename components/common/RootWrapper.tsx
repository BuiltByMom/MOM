'use client';

import {Header} from './Header';
import {WithFonts} from './WithFonts';

import type {ReactNode} from 'react';

export function RootWrapper({children}: {children: ReactNode}): ReactNode {
	return (
		<WithFonts>
			<Header />
			{children}
			{/* {isHomepage ? null : <Footer />} */}
		</WithFonts>
	);
}
