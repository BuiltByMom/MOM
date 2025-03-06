'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

import type {ReactNode} from 'react';

type TGameState = {
	playerY: number;
	computerY: number;
	ballX: number;
	ballY: number;
	ballSpeedX: number;
	ballSpeedY: number;
	playerScore: number;
	computerScore: number;
	isGameOver: boolean;
	paused: boolean;
	winner: 'player' | 'computer' | null;
	lastUpdateTime: number;
	targetComputerY: number; // Target position for smooth computer movement
	lastPredictionTime: number; // Time of last AI prediction to prevent constant recalculation
};

export default function PongGame(): ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestIdRef = useRef<number>(0);
	const [gridSize, setGridSize] = useState<number>(64);

	const paddleHeight = 4; // 4 cells
	const initialPlayerY = Math.floor(Math.random() * (15 - paddleHeight));
	const initialComputerY = Math.floor(Math.random() * (15 - paddleHeight));

	const [gameState, setGameState] = useState<TGameState>({
		playerY: initialPlayerY,
		computerY: initialComputerY,
		ballX: 0,
		ballY: 0,
		ballSpeedX: 0,
		ballSpeedY: 0,
		playerScore: 0,
		computerScore: 0,
		isGameOver: false,
		paused: false,
		winner: null,
		lastUpdateTime: 0,
		targetComputerY: 0,
		lastPredictionTime: 0
	});
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

	// Game speed control - higher number = slower game
	const UPDATE_INTERVAL = 50; // Update game every 50ms
	const PREDICTION_INTERVAL = 500; // Update AI prediction every 500ms for more human-like behavior
	const WIDTH = 22; // 26 cells

	// Initialize game
	const initGame = useCallback(() => {
		setGameState({
			playerY: initialPlayerY,
			computerY: initialComputerY,
			ballX: 10,
			ballY: 8,
			ballSpeedX: -0.3,
			ballSpeedY: Math.random() > 0.5 ? 0.3 : -0.3,
			playerScore: 0,
			computerScore: 0,
			isGameOver: false,
			paused: false,
			winner: null,
			lastUpdateTime: Date.now(),
			targetComputerY: initialComputerY, // Start with target matching current position
			lastPredictionTime: 0
		});
		setIsGameStarted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Toggle pause state
	const togglePause = useCallback(() => {
		if (!gameState.isGameOver) {
			setGameState(prev => ({
				...prev,
				paused: !prev.paused
			}));
		}
	}, [gameState.isGameOver]);

	// Handle key presses for player paddle movement
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (!isGameStarted) {
				// Start game on any key press if not started
				initGame();
				return;
			}

			if (e.key === 'Escape') {
				// Toggle pause when Escape is pressed
				togglePause();
				return;
			}

			if (gameState.paused || gameState.isGameOver) {
				if (e.key === 'r' && gameState.isGameOver) {
					// Restart game when 'r' is pressed if game is over
					initGame();
				}
				return; // Don't process other keys if paused or game over
			}

			if (e.key === 'ArrowUp' || e.key === 'w') {
				// Move paddle up by 1 cell
				setGameState(prev => ({
					...prev,
					playerY: Math.max(0, Math.floor(prev.playerY) - 1)
				}));
			} else if (e.key === 'ArrowDown' || e.key === 's') {
				// Move paddle down by 1 cell
				setGameState(prev => ({
					...prev,
					playerY: Math.min(12, Math.floor(prev.playerY) + 1)
				}));
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isGameStarted, gameState.isGameOver, gameState.paused, initGame, togglePause]);

	// Game loop with throttled update
	const updateGame = useCallback(() => {
		if (gameState.isGameOver || gameState.paused) {
			return;
		}

		const currentTime = Date.now();
		// Only update game state at the specified interval
		if (currentTime - gameState.lastUpdateTime < UPDATE_INTERVAL) {
			return;
		}

		setGameState(prev => {
			// Calculate next ball position
			let newBallX = prev.ballX + prev.ballSpeedX;
			let newBallY = prev.ballY + prev.ballSpeedY;
			let newBallSpeedX = prev.ballSpeedX;
			let newBallSpeedY = prev.ballSpeedY;
			let newPlayerScore = prev.playerScore;
			let newComputerScore = prev.computerScore;
			let isNewGameOver = prev.isGameOver;
			let newWinner = prev.winner;
			let newComputerY = prev.computerY;
			let newTargetComputerY = prev.targetComputerY;
			let newLastPredictionTime = prev.lastPredictionTime;

			// Continuous collision detection for player paddle
			// Check if ball trajectory intersects with paddle during this frame
			const willCollideWithPlayer = (() => {
				// Only check if ball is moving toward player paddle
				if (prev.ballSpeedX >= 0) {
					return false;
				}

				// Calculate time until x collision with player paddle (x=1)
				const timeToXCollision = (1 - prev.ballX) / prev.ballSpeedX;

				// If timeToXCollision is negative or greater than 1, no collision in this frame
				if (timeToXCollision < 0 || timeToXCollision > 1) {
					return false;
				}

				// Calculate y position at collision time
				const yAtCollision = prev.ballY + prev.ballSpeedY * timeToXCollision;

				// Check if y position is within paddle range (with padding)
				return yAtCollision >= prev.playerY - 0.5 && yAtCollision <= prev.playerY + 4.5;
			})();

			// Continuous collision detection for computer paddle
			// Check if ball trajectory intersects with paddle during this frame
			const willCollideWithComputer = (() => {
				// Only check if ball is moving toward computer paddle
				if (prev.ballSpeedX <= 0) {
					return false;
				}

				// Calculate time until x collision with computer paddle (x=WIDTH-2)
				const timeToXCollision = (WIDTH - 2 - prev.ballX) / prev.ballSpeedX;

				// If timeToXCollision is negative or greater than 1, no collision in this frame
				if (timeToXCollision < 0 || timeToXCollision > 1) {
					return false;
				}

				// Calculate y position at collision time
				const yAtCollision = prev.ballY + prev.ballSpeedY * timeToXCollision;

				// Check if y position is within paddle range (with padding)
				return yAtCollision >= prev.computerY - 0.5 && yAtCollision <= prev.computerY + 4.5;
			})();

			// More human-like computer paddle AI
			// Only recalculate prediction occasionally to make movement appear more human
			if (
				currentTime - newLastPredictionTime > PREDICTION_INTERVAL &&
				Math.abs(newBallX - 10) > 3 // Don't react immediately after ball reset
			) {
				// Update last prediction time
				newLastPredictionTime = currentTime;

				// Calculate where the ball will intersect with the computer's y-axis
				let predictedY = newBallY;

				// Only predict if the ball is moving toward the computer
				if (newBallSpeedX > 0) {
					// Calculate how many steps until the ball reaches the computer paddle
					const stepsToReach = (WIDTH - 1 - newBallX) / newBallSpeedX;
					// Predict where the ball will be at that point
					predictedY = newBallY + newBallSpeedY * stepsToReach;

					// Account for bounces off the top and bottom walls
					while (predictedY < 0 || predictedY > 15) {
						if (predictedY < 0) {
							predictedY = -predictedY; // Bounce off top wall
						}
						if (predictedY > 15) {
							predictedY = 30 - predictedY; // Bounce off bottom wall (15*2 - predictedY)
						}
					}

					// Occasionally make prediction errors (human-like)
					const errorChance = Math.random();
					if (errorChance < 0.3) {
						// Small error - slightly off
						predictedY += Math.random() * 1.5 - 0.75;
					} else if (errorChance < 0.4) {
						// Bigger error - significantly off
						predictedY += Math.random() * 3 - 1.5;
					}

					// If ball is far away, react slower with a lazy position
					if (newBallX < 5 && newBallSpeedX > 0) {
						// Ball just started going toward computer, move lazily to center
						newTargetComputerY = 6; // Lazy center-ish position
					} else {
						// Target the center of the paddle to the predicted ball position
						// Quantize to align with grid cells
						newTargetComputerY = Math.max(0, Math.min(12, Math.floor(predictedY - 2)));
					}
				} else if (Math.abs(newComputerY - 6) > 3) {
					// Ball is moving away - occasionally drift towards center
					newTargetComputerY = 6; // Drift to center when ball moving away
				}
			}

			// Move computer paddle smoothly toward target position (human-like motion)
			const distanceToTarget = newTargetComputerY - newComputerY;

			if (Math.abs(distanceToTarget) > 0.1) {
				// Quantize computer paddle movement to align with grid cells
				if (distanceToTarget > 0) {
					newComputerY = Math.min(newTargetComputerY, Math.floor(newComputerY) + 1);
				} else {
					newComputerY = Math.max(newTargetComputerY, Math.floor(newComputerY) - 1);
				}
			}

			// Ball bounces off top and bottom walls
			if (newBallY <= 0 || newBallY >= 15) {
				newBallSpeedY = -newBallSpeedY;
				newBallY = newBallY <= 0 ? 0.1 : 14.9; // Prevent getting stuck at edges
			}

			// Handle collision with player paddle (left side)
			if (willCollideWithPlayer) {
				// Move the ball to the paddle edge to prevent going through
				newBallX = 1.1;
				// Bounce with increasing speed (gets faster with each hit)
				newBallSpeedX = Math.abs(newBallSpeedX) * 1.05;

				// Calculate angle based on where the ball hits the paddle
				// Higher on the paddle = steeper upward angle, lower = steeper downward angle
				const relativeIntersectY = prev.playerY + 2 - newBallY;
				const normalizedRelativeIntersectionY = relativeIntersectY / 2; // -1 to 1
				const bounceAngle = normalizedRelativeIntersectionY * 0.3; // Max angle

				newBallSpeedY = -bounceAngle;
			}

			// Handle collision with computer paddle (right side)
			if (willCollideWithComputer) {
				// Move the ball to the paddle edge to prevent going through
				newBallX = WIDTH - 2.1;
				// Bounce with increasing speed (gets faster with each hit)
				newBallSpeedX = -Math.abs(newBallSpeedX) * 1.05;

				// Calculate angle based on where the ball hits the paddle
				// Higher on the paddle = steeper upward angle, lower = steeper downward angle
				const relativeIntersectY = prev.computerY + 2 - newBallY;
				const normalizedRelativeIntersectionY = relativeIntersectY / 2; // -1 to 1
				const bounceAngle = normalizedRelativeIntersectionY * 0.3; // Max angle

				newBallSpeedY = -bounceAngle;
			}

			// Ball goes out of bounds - scoring
			if (newBallX < 0) {
				// Computer scores
				newComputerScore++;
				if (newComputerScore >= 5) {
					isNewGameOver = true;
					newWinner = 'computer';
				} else {
					// Reset ball position
					newBallX = 10;
					newBallY = 8;
					newBallSpeedX = 0.3;
					newBallSpeedY = Math.random() > 0.5 ? 0.3 : -0.3;
					// Reset paddle predictions
					newLastPredictionTime = 0;
				}
			} else if (newBallX > WIDTH - 1) {
				// Player scores
				newPlayerScore++;
				if (newPlayerScore >= 5) {
					isNewGameOver = true;
					newWinner = 'player';
				} else {
					// Reset ball position
					newBallX = 10;
					newBallY = 8;
					newBallSpeedX = -0.3;
					newBallSpeedY = Math.random() > 0.5 ? 0.3 : -0.3;
					// Reset paddle predictions
					newLastPredictionTime = 0;
				}
			}

			return {
				...prev,
				ballX: newBallX,
				ballY: newBallY,
				ballSpeedX: newBallSpeedX,
				ballSpeedY: newBallSpeedY,
				computerY: newComputerY,
				playerScore: newPlayerScore,
				computerScore: newComputerScore,
				isGameOver: isNewGameOver,
				winner: newWinner,
				lastUpdateTime: currentTime,
				targetComputerY: newTargetComputerY,
				lastPredictionTime: newLastPredictionTime
			};
		});
	}, [gameState.isGameOver, gameState.paused, gameState.lastUpdateTime, UPDATE_INTERVAL]);

	// Canvas setup and draw
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

			// Determine grid size based on screen width
			const newGridSize = window.innerWidth < 640 ? 32 : 64;
			setGridSize(newGridSize);

			drawGame();
		};

		const drawGame = (): void => {
			if (!ctx || !canvas) {
				return;
			}

			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw grid
			ctx.strokeStyle = '#e5e5e5';
			ctx.lineWidth = 1;

			const offsetX = gridSize / 2;
			const offsetY = gridSize / 2;

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

			// Calculate game area dimensions
			const gameWidth = WIDTH * gridSize;
			const gameHeight = 16 * gridSize;
			const gameLeft = (canvas.width - gameWidth) / 2;
			const gameTop = (canvas.height - gameHeight) / 2;

			// Draw player paddle (left) - even when game is not started
			// Force integer position for exact grid alignment
			const playerYAligned = Math.floor(gameState.playerY);
			ctx.fillStyle = '#FFD915';
			ctx.fillRect(gameLeft + 0 * gridSize, gameTop + playerYAligned * gridSize, gridSize, 4 * gridSize);

			// Draw computer paddle (right) - even when game is not started
			// Force integer position for exact grid alignment
			const computerYAligned = Math.floor(gameState.computerY);
			ctx.fillStyle = '#FFD915';
			ctx.fillRect(
				gameLeft + (WIDTH - 1) * gridSize,
				gameTop + computerYAligned * gridSize,
				gridSize,
				4 * gridSize
			);

			if (!isGameStarted) {
				return;
			}

			// Draw ball - only when game is started
			ctx.fillStyle = '#FFD915';
			ctx.fillRect(
				gameLeft + gameState.ballX * gridSize,
				gameTop + gameState.ballY * gridSize,
				gridSize,
				gridSize
			);

			// Draw scores
			ctx.fillStyle = '#000';
			ctx.font = '24px Arial';
			ctx.textAlign = 'center';
			ctx.fillText(`${gameState.playerScore} - ${gameState.computerScore}`, canvas.width / 2, gameTop + 40);

			// Draw game over message if needed
			if (gameState.isGameOver) {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
				ctx.fillRect(gameLeft + 6 * gridSize, gameTop + 2 * gridSize, 10 * gridSize, 4 * gridSize);

				ctx.fillStyle = '#fff';
				ctx.font = '24px Arial';
				ctx.textAlign = 'center';
				ctx.fillText(
					`${gameState.winner === 'player' ? 'You win!' : 'MOM wins!'}`,
					canvas.width / 2,
					canvas.height / 2 - 260
				);
				ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 - 220);
			}

			// Draw pause message if game is paused
			if (gameState.paused) {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
				ctx.fillRect(gameLeft + 6 * gridSize, gameTop + 2 * gridSize, 10 * gridSize, 4 * gridSize);

				ctx.fillStyle = '#fff';
				ctx.font = '24px Arial';
				ctx.textAlign = 'center';
				ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2 - 260);
				ctx.fillText('Press ESC to continue', canvas.width / 2, canvas.height / 2 - 220);
			}
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		// Game loop - the draw rate is faster than the update rate
		const animate = (): void => {
			if (isGameStarted && !gameState.isGameOver && !gameState.paused) {
				updateGame();
			}
			drawGame();
			requestIdRef.current = requestAnimationFrame(animate);
		};

		requestIdRef.current = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(requestIdRef.current);
			window.removeEventListener('resize', resizeCanvas);
		};
	}, [isGameStarted, gameState, gridSize, updateGame]);

	return (
		<canvas
			ref={canvasRef}
			className={'fixed inset-0 size-full'}
			style={{zIndex: 0}}
		/>
	);
}
