import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParallax } from "./ParallaxRender";

interface ParallaxGsapLayerProps {
	layer: number;
	children: React.ReactNode; // Typically your imported SVG React component
	intensity?: number;
	tilt?: number; // Maximum tilt angle in degrees (e.g., 5-10)
}

const PARALLAX_INTENSITY = 30; // pixels of movement per layer

// Fork of ParallaxLayer that adds a GSAP scroll-driven timeline
export function ParallaxGsapLayer({
	layer,
	children,
	intensity = PARALLAX_INTENSITY,
	tilt,
}: ParallaxGsapLayerProps) {
	const layerRef = useRef<HTMLDivElement>(null);
	const animatedRef = useRef<HTMLDivElement>(null);
	const { mousePosition, deviceOrientation, isMobile } = useParallax();
	const animationFrameRef = useRef<number | undefined>(undefined);

	// Base parallax / tilt (same behavior as ParallaxLayer)
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

	// GSAP scroll-driven animation for the SVG / children
	useEffect(() => {
		if (!animatedRef.current) return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const element = animatedRef.current;
			if (!element) return;

			// Try to target fun shape-specific elements if they exist
			const softStar = element.querySelector('[data-shape="soft-star"]');
			const asterisk2 = element.querySelector('[data-shape="asterisk-2"]');
			const asterisk3 = element.querySelector('[data-shape="asterisk-3"]');

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top bottom", // when element enters the viewport
					end: "bottom top", // when element leaves the viewport
					scrub: true,
				},
			});

			// If we find our tagged shapes, animate each one differently for a more playful feel
			if (softStar) {
				tl.fromTo(
					softStar,
					{
						x: -80,
						y: 120,
						scale: 0.9,
						rotation: -20,
					},
					{
						x: 40,
						y: -100,
						scale: 1.2,
						rotation: 35,
						ease: "power2.inOut",
					},
					0,
				);

				// Subtle breathing animation (independent from scroll)
				gsap.to(softStar, {
					scale: 1.05,
					rotation: "+=5",
					duration: 3.2,
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
				});
			}

			if (asterisk2) {
				tl.fromTo(
					asterisk2,
					{
						x: 60,
						y: 60,
						scale: 0.8,
						rotation: 0,
					},
					{
						x: -80,
						y: -160,
						scale: 1.15,
						rotation: -45,
						ease: "power1.inOut",
					},
					0.1,
				);

				gsap.to(asterisk2, {
					scale: 1.06,
					rotation: "-=6",
					duration: 2.8,
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
				});
			}

			if (asterisk3) {
				tl.fromTo(
					asterisk3,
					{
						x: -40,
						y: 180,
						scale: 0.85,
						rotation: 15,
					},
					{
						x: 70,
						y: -140,
						scale: 1.25,
						rotation: 90,
						ease: "power3.inOut",
					},
					0.2,
				);

				gsap.to(asterisk3, {
					scale: 1.07,
					rotation: "+=8",
					duration: 3.4,
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
				});
			}

			// Fallback: if no tagged shapes, animate the whole layer as before
			if (!softStar && !asterisk2 && !asterisk3) {
				tl.fromTo(
					element,
					{
						y: 80 * layer,
						scale: 0.85,
						rotate: 0,
					},
					{
						y: -80 * layer,
						scale: 1.1,
						rotate: 10 * layer,
						ease: "none",
					},
				);

				gsap.to(element, {
					scale: 1.04,
					duration: 3,
					yoyo: true,
					repeat: -1,
					ease: "sine.inOut",
				});
			}
		}, animatedRef);

		return () => {
			ctx.revert();
		};
	}, [layer]);

	// For layer 0 (Background) and layers < 1 (EffectLayer), preserve position: fixed
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
			<div
				ref={animatedRef}
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					pointerEvents: "auto",
				}}
			>
				{children}
			</div>
		</div>
	);
}


