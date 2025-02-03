import {ProjectCard} from '@/components/common/ProjectCard';

import type {ReactNode} from 'react';

const PROJECTS = [
	{
		title: 'JUMPER',
		subtitle: 'WASH TRADE',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wash-trade.png'
	},
	{
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t'
	},
	{
		title: 'YEARN',
		tags: ['marketing', 'development', 'design'],
		image: '/images/yearn.png'
	},
	{
		title: 'JUMPER',
		subtitle: 'WRAPPED',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wrapped.png'
	},
	{
		title: 'POLYGON',
		tags: ['marketing'],
		video: 'In_future_we_bridge_Polygon__v1_bqg0gv'
	},
	{
		title: 'MOM',
		tags: ['marketing'],
		video: 'CT_AI_edit_v1_pggwtw'
	}
];

export default function Work(): ReactNode {
	return (
		<main className={'relative z-10 mx-auto max-w-[1400px] px-6 pb-[120px]'}>
			<h1 className={'mb-8 text-[40px] font-semibold leading-10'}>{'FEATURED PROJECTS'}</h1>
			<div className={'flex w-full flex-col gap-1'}>
				{PROJECTS.map(project => (
					<ProjectCard
						key={`${project.title}-${project.subtitle}`}
						{...project}
					/>
				))}
			</div>
		</main>
	);
}
