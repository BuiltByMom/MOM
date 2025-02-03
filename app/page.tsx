import GridBackground from '@/components/common/GridBackground';

import type {ReactNode} from 'react';

export default function Home(): ReactNode {
	return (
		<main className={'relative '}>
			<GridBackground />

			<div className={'relative flex h-[calc(100vh-128px)] flex-1 items-start justify-center md:items-center'}>
				<h1
					className={
						'mb-[128px] mt-8 text-center text-[clamp(48px,8vw,80px)] leading-[clamp(40px,7vw,72px)] md:mt-0'
					}>
					<span className={'font-[Monument] font-extrabold'}>{'MOM GONNA'}</span> {'TAKE CARE'}
					<br />
					<span className={'font-[Monument] font-extrabold'}>{'OF YOUR'}</span>
					{' WEB3 '}
					<span className={'font-[Monument] font-extrabold'}>{'PRODUCT'}</span>
					<br />
					<span className={'font-[Monument] font-extrabold'}>{'FELLOW CLIENT,'}</span> {'WORRY NOT'}
				</h1>
			</div>
		</main>
	);
}
