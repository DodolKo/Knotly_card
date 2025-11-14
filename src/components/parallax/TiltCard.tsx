import { useEffect, useRef } from "react";
import { useParallax } from "./ParallaxRender";

interface TiltCardProps {
	children: React.ReactNode;
	maxTilt?: number; // Maximum tilt angle in degrees (default: 8)
	intensity?: number; // Tilt intensity multiplier (default: 1)
}

const DEFAULT_MAX_TILT = 8; // degrees

export function TiltCard({ children, maxTilt = DEFAULT_MAX_TILT, intensity = 1 }: TiltCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const { mousePosition, deviceOrientation, isMobile } = useParallax();
	const animationFrameRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		let isActive = true;

		const updateTilt = () => {
			if (!cardRef.current || !isActive) return;

			let rotateX = 0;
			let rotateY = 0;

			if (isMobile) {
				// Use gyroscope data for mobile
				rotateX = deviceOrientation.beta * maxTilt * intensity;
				rotateY = -deviceOrientation.gamma * maxTilt * intensity;
			} else {
				// Use mouse position for desktop
				rotateX = mousePosition.y * maxTilt * intensity;
				rotateY = -mousePosition.x * maxTilt * intensity;
			}

			cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			animationFrameRef.current = requestAnimationFrame(updateTilt);
		};

		animationFrameRef.current = requestAnimationFrame(updateTilt);

		return () => {
			isActive = false;
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [mousePosition, deviceOrientation, isMobile, maxTilt, intensity]);

	return (
		<div style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
			<div
				ref={cardRef}
				style={{
					willChange: "transform",
					transformStyle: "preserve-3d",
					backfaceVisibility: "hidden",
				}}
			>
				{children}
			</div>
		</div>
	);
}

