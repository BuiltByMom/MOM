import Image from 'next/image';
import Link from 'next/link';

import {NAV_ITEMS} from './Header';
import {MomLogo} from '../icons/MomLogo';
import {NavItem} from '../primitives/NavItem';

import type {ReactNode} from 'react';

export function Footer(): ReactNode {
	return (
		<footer className={'mt-auto flex h-[140px] w-full items-center justify-between bg-primary px-10'}>
			<div className={'flex gap-1'}>
				{NAV_ITEMS.map(({title, href}) => (
					<NavItem
						key={title}
						title={title}
						href={href}
					/>
				))}
			</div>
			<div className={'flex items-center gap-20'}>
				<Image
					src={'/images/mom.png'}
					alt={'Mom'}
					width={140}
					height={140}
				/>
				<Link href={'mailto:hello@dad.mom '}>
					<div className={'group flex items-center gap-2'}>
						<p className={'text-2xl font-extrabold group-hover:underline'}>{'hello@dad.'}</p>
						<div
							className={
								'flex h-[36px] w-[72px] items-center justify-center overflow-hidden bg-black text-lg font-bold text-white'
							}>
							<MomLogo
								width={51}
								height={12}
							/>
						</div>
					</div>
				</Link>
			</div>
		</footer>
	);
}
