'use client';

import {Geist, Geist_Mono} from 'next/font/google';
import React from 'react';

import type {ReactElement, ReactNode} from 'react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export function WithFonts({children}: {children: ReactNode}): ReactElement {
	return (
		<div
			style={{
				fontFamily: `${geistSans.style.fontFamily}, ${geistMono.style.fontFamily}`
			}}>
			<style
				jsx
				global>
				{`
					:root {
						--geist-font: ${geistSans.style.fontFamily};
						--geist-font-mono: ${geistMono.style.fontFamily};
					}
				`}
			</style>

			{children}
		</div>
	);
}
