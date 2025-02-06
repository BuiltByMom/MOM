'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef} from 'react';

import {cn} from '@/utils';

import type {TProject} from '@/utils/types';
import type {ReactNode} from 'react';

type TProjectCard = TProject & {
	overlayColor?: string;
	overlayColorHover?: string;
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
	target = '_self',
	overlayColor = 'bg-black/0',
	overlayColorHover = 'group-hover:bg-black/25'
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
			className={
				'group relative w-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[0.98]'
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={cn(
					'absolute inset-0 size-full transition-all duration-300 max-md:hidden',
					overlayColor,
					overlayColorHover
				)}
			/>

			<div className={'z-30'}>
				{/* Video */}
				{video && (
					<video
						ref={videoRef}
						className={'size-full h-[480px] object-cover'}
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
						className={'h-[480px] w-full object-cover'}
					/>
				)}
				{/* Hover button */}
				<button
					className={
						'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/5 bg-white/15 p-6 text-white opacity-0 backdrop-blur-[32px] transition-opacity group-hover:opacity-100 max-md:hidden'
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
					className={
						'justify-start-start absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-6 md:flex-row'
					}>
					{/* Title Area */}
					<div className={'flex items-center gap-2 text-white'}>
						<span className={'font-[Monument] text-xl font-extrabold'}>{title}</span>
						{subtitle && <span className={'text-xl font-normal tracking-wide'}>{subtitle}</span>}
					</div>

					{/* Tags */}
					<div className={'flex gap-2'}>
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
