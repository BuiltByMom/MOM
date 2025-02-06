import Image from 'next/image';

import {ProjectCard} from '@/components/common/ProjectCard';
import {CASE_CONTENT} from '@/utils/constants';

import {PROJECTS} from '../page';

import type {ReactNode} from 'react';

export default async function WorkPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const content = CASE_CONTENT[slug as keyof typeof CASE_CONTENT];
	const projectCardContent = PROJECTS.find(project => project.slug === slug);

	return (
		<div className={'mx-auto mt-8 max-w-[1400px] px-6 pb-[120px]'}>
			<div className={'grid grid-cols-12 max-md:grid-cols-1'}>
				<div className={'col-span-7'}>
					<p className={'mb-4 text-xl font-semibold'}>{content.subtitle.toUpperCase()}</p>
					<p className={'mb-6 text-[64px] font-semibold leading-[64px] md:mb-10'}>
						{content.title.toUpperCase()}
					</p>
					<div className={'flex gap-1'}>
						{content.tags.map(tag => (
							<span
								key={tag}
								className={
									'rounded-md bg-[rgba(12,12,12,0.03)] px-[14px] py-2 text-sm font-bold text-black backdrop-blur-lg'
								}>
								{'#'}
								{tag.toUpperCase()}
							</span>
						))}
					</div>
				</div>
				<div className={'col-span-1 hidden md:block'} />
				<div className={'col-span-4 mt-10 text-xl leading-8'}>{content.description}</div>
			</div>
			<div className={'mt-10 md:mt-40'}>
				{content?.video && (
					<div className={'relative aspect-video'}>
						<video controls>
							<source
								src={`https://res.cloudinary.com/dgdiddssb/video/upload/v1738602673/${content.video}.mp4`}
								type={'video/mp4'}
							/>
							{'Download the'}
							<a
								href={`https://res.cloudinary.com/dgdiddssb/video/upload/v1738602673/${content.video}.mp4`}>
								{'MP4'}
							</a>
							{'video.'}
						</video>
					</div>
				)}

				<div className={'mb-[120px] mt-1 grid grid-cols-12 grid-rows-2 gap-1 max-md:block'}>
					<div className={'col-span-12 max-md:mb-1'}>
						<Image
							key={content.images[0]}
							src={content.images[0]}
							alt={content.title}
							width={1400}
							height={480}
						/>
					</div>
					<div className={'col-span-6 row-start-2 max-md:mb-1'}>
						<Image
							className={'size-full object-cover'}
							key={content.images[1]}
							src={content.images[1]}
							alt={content.title}
							width={1400}
							height={480}
						/>
					</div>
					<div className={'col-span-6 col-start-7 row-start-2 max-md:mb-1'}>
						<Image
							className={'size-full object-cover'}
							key={content.images[2]}
							src={content.images[2]}
							alt={content.title}
							width={1400}
							height={480}
						/>
					</div>
				</div>
			</div>
			{projectCardContent && (
				<ProjectCard
					{...projectCardContent}
					href={content.projectLink}
					overlayColor={'bg-primary/75'}
					overlayColorHover={'group-hover:bg-primary/0'}
					target={'_blank'}
					hoverButtonTitle={'NEXT PROJECT'}
				/>
			)}
		</div>
	);
}
