import type {ReactNode} from 'react';

export function NavItem({title, href}: {title: string; href: string}): ReactNode {
	return (
		<a href={href}>
			<div className={'group relative'}>
				<div
					className={
						'absolute inset-0 origin-center rounded-3xl bg-[rgba(12,12,12,0.03)] backdrop-blur-[32px] transition-all group-hover:scale-90'
					}
				/>
				<button className={'relative z-10 px-6 py-4 font-extrabold leading-8'}>{title}</button>
			</div>
		</a>
	);
}
