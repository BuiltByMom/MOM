'use client';

import {useEffect, useRef} from 'react';

import type {ReactNode} from 'react';

export default function GridBackground(): ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			return;
		}

		const resizeCanvas = (): void => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			drawGrid();
		};

		const drawGrid = (): void => {
			if (!ctx || !canvas) {
				return;
			}

			ctx.strokeStyle = '#e5e5e5';
			ctx.lineWidth = 1;

			// Determine grid size based on screen width
			const gridSize = window.innerWidth < 640 ? 32 : 64;
			const offsetX = gridSize / 2;
			const offsetY = gridSize / 2;

			// Clear previous grid
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw vertical lines
			for (let x = offsetX; x <= canvas.width; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, canvas.height);
				ctx.stroke();
			}

			// Draw horizontal lines
			for (let y = offsetY; y <= canvas.height; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={'fixed inset-0 size-full opacity-30'}
			style={{zIndex: 0}}
		/>
	);
}
