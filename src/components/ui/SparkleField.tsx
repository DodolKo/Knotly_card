import { useMemo } from "react";
import { useParallax } from "../parallax";

const SPARKLES = Array.from({ length: 40 }, (_, index) => {
	// Deterministic pseudo-random distribution based on index
	const seed = index + 1;
	const x = (Math.sin(seed * 12.9898) * 43758.5453) % 100;
	const y = (Math.cos(seed * 78.233) * 12345.6789) % 100;
	const size = 4 + (seed * 7) % 6; // 4px → 10px
	const delay = (seed * 0.37) % 4; // 0s → <4s

	return {
		id: index,
		x: ((x + 100) % 100).toFixed(2),
		y: ((y + 100) % 100).toFixed(2),
		size,
		delay,
	};
});

export function SparkleField() {
	const { mousePosition, deviceOrientation, isMobile } = useParallax();

	const { offsetX, offsetY } = useMemo(() => {
		if (isMobile) {
			// Slight drift based on device orientation for mobile
			return {
				offsetX: deviceOrientation.gamma * 12,
				offsetY: deviceOrientation.beta * 8,
			};
		}

		// Desktop: subtle parallax based on mouse position (-1 → 1 range)
		return {
			offsetX: mousePosition.x * 18,
			offsetY: mousePosition.y * 12,
		};
	}, [isMobile, mousePosition, deviceOrientation]);

	return (
		<div
			className="sparkle-field"
			style={{
				transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
			}}
		>
			{SPARKLES.map((sparkle) => (
				<div
					key={sparkle.id}
					className="sparkle"
					style={{
						left: `${sparkle.x}%`,
						top: `${sparkle.y}%`,
						width: `${sparkle.size}px`,
						height: `${sparkle.size}px`,
						animationDelay: `${sparkle.delay}s`,
					}}
				/>
			))}
		</div>
	);
}


