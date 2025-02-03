'use client';

import Image from 'next/image';
import {useRef, useState} from 'react';

import type {TProject} from '@/utils/types';
import type {ReactNode} from 'react';

export function ProjectCard({title, subtitle, video, image, tags}: TProject): ReactNode {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = (): void => {
		if (videoRef.current) {
			videoRef.current.play();
		}
		setIsHovering(true);
	};

	const handleMouseLeave = (): void => {
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
		setIsHovering(false);
	};

	return (
		<div
			className={
				'group relative w-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[0.98]'
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={
					'-z-100 absolute inset-0 size-full bg-black/0 transition-all duration-300 group-hover:bg-black/25'
				}
			/>
			<div className={'z-30'}>
				{/* Video */}
				{video && (
					<video
						ref={videoRef}
						className={'size-full max-h-[480px] object-cover'}
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
				{isHovering && (
					<button
						className={
							'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/5 bg-white/15 p-6 text-white backdrop-blur-[32px]'
						}>
						<span className={'font-extrabold'}>{'NEXT PROJECT'}</span>
					</button>
				)}

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
								className={'rounded-md bg-white/10 px-3 py-1 text-sm font-medium text-white'}>
								{'#'}
								{tag.toUpperCase()}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
