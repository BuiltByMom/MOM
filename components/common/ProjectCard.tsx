'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef} from 'react';

import {cl} from '@/utils';

import type {TProject} from '@/utils/types';
import type {ReactNode} from 'react';

type TProjectCard = TProject & {
	href: string;
	target?: '_blank' | '_self';
	hoverButtonTitle?: string;
};

export function ProjectCard({
	title,
	subtitle,
	video,
	image,
	tags,
	href,
	hoverButtonTitle = 'View case study',
	target = '_self'
}: TProjectCard): ReactNode {
	const videoRef = useRef<HTMLVideoElement>(null);

	// Clean up video playback
	useEffect(() => {
		const videoElement = videoRef.current;
		return () => {
			if (videoElement) {
				videoElement.pause();
				videoElement.currentTime = 0;
			}
		};
	}, []);

	const handleMouseEnter = async (): Promise<void> => {
		if (videoRef.current) {
			try {
				// Using await to handle the play promise
				await videoRef.current.play();
			} catch (error) {
				// Ignore abort errors when quickly hovering in/out
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('Video playback error:', error);
				}
			}
		}
	};

	const handleMouseLeave = (): void => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};
	return (
		<Link
			href={href}
			target={target}
			className={'group relative size-full cursor-pointer overflow-hidden'}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={cl(
					'absolute inset-0 size-full z-10 max-md:aspect-square transition-all duration-300 max-md:hidden bg-black/0 group-hover:bg-black/25'
				)}
			/>

			<div className={'z-30 h-full overflow-hidden'}>
				{/* Video */}
				{video && (
					<video
						ref={videoRef}
						className={
							'size-full scale-[1.10] object-cover transition-all duration-300 max-md:aspect-square md:group-hover:scale-100'
						}
						src={`https://res.cloudinary.com/dgdiddssb/video/upload/v1738602673/${video}.mp4`}
						playsInline
						muted
						loop
						preload={'auto'}
					/>
				)}

				{/* Image */}
				{image && (
					<Image
						src={image}
						alt={title}
						width={1400}
						height={480}
						className={
							'size-full scale-[1.10] object-cover transition-all duration-300 max-md:aspect-square md:group-hover:scale-100'
						}
					/>
				)}
				{/* Hover button */}
				<button
					className={
						'absolute left-1/2 top-1/2  z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/5 bg-white/15 px-4 py-2 text-sm text-white opacity-0 backdrop-blur-[32px] transition-opacity group-hover:opacity-100 max-md:hidden'
					}>
					<span className={'font-extrabold'}>{hoverButtonTitle.toUpperCase()}</span>
				</button>

				<button
					className={
						'absolute right-6 top-6 rounded-2xl border border-white/5 bg-white/15 px-6 py-3 text-white backdrop-blur-[32px] md:hidden'
					}>
					<span className={'text-xs font-extrabold'}>{'NEXT PROJECT'}</span>
				</button>

				{/* Bottom Content Overlay */}
				<div
					className={cl(
						'absolute inset-x-0 z-20 bottom-0 flex flex-col origin-[50%_50%] flex-wrap justify-between gap-4 overflow-hidden p-6  duration-300 md:flex-row md:group-hover:scale-[0.90]'
					)}>
					{/* Title Area */}
					<div className={cl('flex items-center gap-2 text-white transition-transform duration-300')}>
						<span className={'font-[Monument] text-xl font-extrabold'}>{title}</span>
						{subtitle && <span className={'text-xl font-normal tracking-wide'}>{subtitle}</span>}
					</div>

					{/* Tags */}
					<div className={cl('flex gap-2 transition-transform duration-300 flex-wrap')}>
						{tags.map(tag => (
							<span
								key={tag}
								className={'rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-white'}>
								{'#'}
								{tag.toUpperCase()}
							</span>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}
