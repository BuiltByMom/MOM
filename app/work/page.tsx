import {ProjectCard} from '@/components/common/ProjectCard';

import type {ReactNode} from 'react';

type TProject = {
	title: string;
	subtitle?: string;
	tags: string[];
	image?: string;
	slug: string;
	video?: string;
};

export const PROJECTS: TProject[] = [
	{
		title: 'JUMPER',
		subtitle: 'WASH TRADE',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wash-trade.png',
		slug: 'washTrade'
	},
	{
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t',
		slug: 'friendTech'
	},
	{
		title: 'YEARN',
		tags: ['marketing', 'development', 'design'],
		image: '/images/yearn.png',
		slug: 'yearn'
	},
	{
		title: 'JUMPER',
		subtitle: 'WRAPPED',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wrapped.png',
		slug: 'jumperWrapped'
	},
	{
		title: 'POLYGON',
		tags: ['marketing'],
		video: 'In_future_we_bridge_Polygon__v1_bqg0gv',
		slug: 'polygon'
	},
	{
		title: 'MOM',
		tags: ['marketing'],
		video: 'CT_AI_edit_v1_pggwtw',
		slug: 'mom'
	}
];

export default function Work(): ReactNode {
	return (
		<>
			<main className={'relative mx-auto mt-8 max-w-[1400px] px-6 pb-[120px]'}>
				<h1 className={'mb-8 text-[40px] font-semibold leading-10'}>{'FEATURED PROJECTS'}</h1>
				<div className={'flex w-full flex-col gap-1'}>
					{PROJECTS.map(project => (
						<ProjectCard
							key={`${project.title}-${project.subtitle}`}
							{...project}
							href={`/work/${project.slug}`}
						/>
					))}
				</div>
			</main>
		</>
	);
}
