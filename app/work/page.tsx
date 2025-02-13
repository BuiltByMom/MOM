import {ProjectCard} from '@/components/common/ProjectCard';
import {PROJECTS_LIST} from '@/utils/constants';

import type {ReactNode} from 'react';

export default function Work(): ReactNode {
	return (
		<>
			<main className={'relative mx-auto mt-8 max-w-[1400px] px-6 pb-[120px]'}>
				<h1 className={'mb-8 text-[40px] font-semibold leading-10'}>{'FEATURED PROJECTS'}</h1>
				<div className={'flex w-full flex-col gap-1'}>
					{PROJECTS_LIST.map(project => (
						<div
							key={`${project.title}-${project.subtitle}`}
							className={'h-[480px]'}>
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
