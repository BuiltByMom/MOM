import type {ReactNode} from 'react';

export default function Home(): ReactNode {
	return (
		<div
			className={
				'grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'
			}>
			{'New Fancy MOM website!'}
		</div>
	);
}
