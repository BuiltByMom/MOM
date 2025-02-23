import {ProjectCard} from '@/components/common/ProjectCard';

import type {ReactNode} from 'react';

type TProject = {
	title: string;
	subtitle?: string;
	tags: string[];
	image?: string;
	slug: string;
	video?: string;
	className?: string;
};

const GRID_PROJECTS: TProject[] = [
	{
		title: 'JUMPER',
		subtitle: 'WASH TRADE',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wash-trade.png',
		slug: 'washTrade'
	},
	{
		title: 'JUMPER',
		subtitle: 'WRAPPED',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wrapped.png',
		slug: 'jumperWrapped'
	},
	{
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t',
		slug: 'friendTech',
		className: 'row-span-2 max-md:col-span-1'
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
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t',
		slug: 'friendTech',
		className: 'col-span-2 row-span-2'
	},
	{
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t',
		slug: 'friendTech',
		className: 'row-span-2 max-md:col-span-1'
	},
	{
		title: 'FRIEND TECH',
		tags: ['marketing'],
		video: 'FriendTech_teaser_v1_xxnt5t',
		slug: 'friendTech',
		className: 'row-span-2 max-md:col-span-1'
	},
	{
		title: 'MOM',
		tags: ['marketing'],
		video: 'CT_AI_edit_v1_pggwtw',
		slug: 'mom',
		className: 'col-span-2'
	}
];

const MORE_PROJECTS: TProject[] = [
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
		title: 'JUMPER',
		subtitle: 'WASH TRADE',
		tags: ['marketing', 'development', 'design'],
		image: '/images/jumper-wash-trade.png',
		slug: 'washTrade'
	}
];
export default function Work(): ReactNode {
	return (
		<>
			<main className={'relative mx-auto mt-8 max-w-[1400px] px-6 pb-[120px]'}>
				<h1 className={'mb-8 text-[40px] font-semibold leading-10'}>{'FEATURED PROJECTS'}</h1>
				<div
					className={
						'flex h-full grid-cols-1 flex-col gap-1 md:grid md:max-h-[2600px] md:grid-cols-2 md:grid-rows-8'
					}>
					{GRID_PROJECTS.map((project, index) => (
						<div
							key={index}
							className={project.className}>
							<ProjectCard
								{...project}
								href={`/work/${project.slug}`}
							/>
						</div>
					))}
				</div>
				<div className={'mt-1 flex h-full gap-1 max-md:flex-col md:max-h-[320px]'}>
					{MORE_PROJECTS.map((project, index) => (
						<div
							key={index}
							className={'h-full md:h-[320px]'}>
							<ProjectCard
								{...project}
								href={`/work/${project.slug}`}
							/>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
