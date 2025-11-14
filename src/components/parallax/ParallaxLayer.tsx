import { useEffect, useRef } from "react";
import { useParallax } from "./ParallaxRender";

interface ParallaxLayerProps {
	layer: number;
	children: React.ReactNode;
	intensity?: number;
}

const PARALLAX_INTENSITY = 30; // pixels of movement per layer

export function ParallaxLayer({ layer, children, intensity = PARALLAX_INTENSITY }: ParallaxLayerProps) {
	const layerRef = useRef<HTMLDivElement>(null);
	const { mousePosition, deviceOrientation, isMobile } = useParallax();
	const animationFrameRef = useRef<number>();

	useEffect(() => {
		let isActive = true;

		const updateTransform = () => {
			if (!layerRef.current || !isActive) return;

			let offsetX = 0;
			let offsetY = 0;

			if (isMobile) {
				// Use gyroscope data for mobile
				offsetX = deviceOrientation.gamma * intensity * layer;
				offsetY = deviceOrientation.beta * intensity * layer;
			} else {
				// Use mouse position for desktop
				offsetX = mousePosition.x * intensity * layer;
				offsetY = mousePosition.y * intensity * layer;
			}

			layerRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
			animationFrameRef.current = requestAnimationFrame(updateTransform);
		};

		animationFrameRef.current = requestAnimationFrame(updateTransform);

		return () => {
			isActive = false;
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [mousePosition, deviceOrientation, isMobile, layer, intensity]);

	return (
		<div ref={layerRef} style={{ willChange: "transform", transformStyle: "preserve-3d" }}>
			{children}
		</div>
	);
}

