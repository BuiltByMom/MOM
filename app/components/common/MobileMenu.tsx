'use client';

import {useState} from 'react';

import {NAV_ITEMS} from './Header';

import type {ReactNode} from 'react';

export function MobileMenu(): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	const buttonClasses = [
		'relative z-50',
		'rounded-2xl',
		'bg-[rgba(12,12,12,0.03)]',
		'w-[90px] py-4',
		'font-extrabold',
		'leading-4 text-sm',
		'backdrop-blur-[32px]',
		'transition-all',
		'md:hidden'
	].join(' ');

	const overlayClasses = [
		'fixed right-0 top-0',
		'z-40 h-screen w-screen',
		'origin-top-right',
		'bg-[#FFD915]',
		'transition-all duration-700 ease-in-out',
		'rounded-bl-full',
		'md:hidden',
		isOpen ? 'scale-125' : 'scale-0'
	].join(' ');

	const menuContentClasses = [
		'fixed inset-0',
		'z-40',
		'flex flex-col',
		'items-start',
		'p-8 pt-32',
		'md:hidden',
		'transition-opacity delay-300 duration-300',
		isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
	].join(' ');

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={buttonClasses}>
				{isOpen ? 'CLOSE' : 'MENU'}
			</button>

			<div className={overlayClasses} />

			<div className={menuContentClasses}>
				{NAV_ITEMS.map(item => (
					<a
						key={item.title}
						href={item.href}
						className={'py-4 text-[32px] font-bold transition-transform hover:translate-x-2'}
						onClick={() => setIsOpen(false)}>
						{item.title}
					</a>
				))}
			</div>
		</>
	);
}
