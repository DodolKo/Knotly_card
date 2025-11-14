import { useEffect, useRef } from "react";
import { useParallax } from "./ParallaxRender";

interface ParallaxLayerProps {
	layer: number;
	children: React.ReactNode;
	intensity?: number;
	tilt?: number; // Maximum tilt angle in degrees (e.g., 5-10)
}

const PARALLAX_INTENSITY = 30; // pixels of movement per layer

export function ParallaxLayer({ layer, children, intensity = PARALLAX_INTENSITY, tilt }: ParallaxLayerProps) {
	const layerRef = useRef<HTMLDivElement>(null);
	const { mousePosition, deviceOrientation, isMobile } = useParallax();
	const animationFrameRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		let isActive = true;

		const updateTransform = () => {
			if (!layerRef.current || !isActive) return;

			let offsetX = 0;
			let offsetY = 0;
			let rotateX = 0;
			let rotateY = 0;

			if (isMobile) {
				// Use gyroscope data for mobile
				offsetX = deviceOrientation.gamma * intensity * layer;
				offsetY = deviceOrientation.beta * intensity * layer;
				if (tilt) {
					rotateX = deviceOrientation.beta * tilt;
					rotateY = -deviceOrientation.gamma * tilt;
				}
			} else {
				// Use mouse position for desktop
				offsetX = mousePosition.x * intensity * layer;
				offsetY = mousePosition.y * intensity * layer;
				if (tilt) {
					rotateX = mousePosition.y * tilt;
					rotateY = -mousePosition.x * tilt;
				}
			}

			let transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
			if (tilt) {
				transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			}

			layerRef.current.style.transform = transform;
			animationFrameRef.current = requestAnimationFrame(updateTransform);
		};

		animationFrameRef.current = requestAnimationFrame(updateTransform);

		return () => {
			isActive = false;
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [mousePosition, deviceOrientation, isMobile, layer, intensity, tilt]);

	// For layer 0 (Background) and layers < 1 (EffectLayer), we need to preserve position: fixed
	// We apply transforms directly without creating a new stacking context
	const isFixedLayer = layer === 0 || (layer > 0 && layer < 1);
	const zIndexValue = layer === 0 ? -10 : layer < 1 ? -5 : undefined;

	return (
		<div 
			ref={layerRef} 
			style={{ 
				willChange: "transform", 
				transformStyle: "preserve-3d",
				position: isFixedLayer ? "fixed" : "relative",
				inset: isFixedLayer ? 0 : undefined,
				pointerEvents: isFixedLayer ? "none" : "auto",
				zIndex: zIndexValue,
				width: isFixedLayer ? "100%" : undefined,
				height: isFixedLayer ? "100%" : undefined,
			}}
		>
			{children}
		</div>
	);
}

