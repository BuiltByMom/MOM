import Link from 'next/link';

import {MobileMenu} from './MobileMenu';
import {MomLogo} from '../icons/MomLogo';
import {NavItem} from '../primitives/NavItem';

import type {ReactNode} from 'react';

export const NAV_ITEMS = [
	{title: 'WORK', href: '/work'},
	{title: 'ABOUT', href: '/about'},
	{title: 'CONTACT', href: '/contact'}
];

export function Header(): ReactNode {
	return (
		<div>
			<nav className={'relative z-50 mx-auto flex h-[128px] max-w-[1400px] items-center justify-between px-6'}>
				<Link
					href={'/'}
					className={'z-50'}>
					<div
						className={
							'group flex h-[48px] w-[104px] items-center justify-center overflow-hidden bg-black text-lg font-bold text-white'
						}>
						<div className={'transition-all duration-200 ease-in-out group-hover:scale-[1150%]'}>
							<MomLogo />
						</div>
					</div>
				</Link>
				<div className={'hidden gap-1 md:flex'}>
					{NAV_ITEMS.map(({title, href}) => (
						<NavItem
							key={title}
							title={title}
							href={href}
						/>
					))}
				</div>

				<MobileMenu />
			</nav>
		</div>
	);
}
