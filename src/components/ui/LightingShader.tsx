import { useMemo } from "react";
import { useParallax } from "../parallax";

export function LightingShader() {
	const { mousePosition, deviceOrientation, isMobile } = useParallax();

	const { cx, cy } = useMemo(() => {
		const baseX = 50; // top-center in X
		const baseY = 15; // a bit lower so the light clearly hits the content

		if (isMobile) {
			const offsetX = deviceOrientation.gamma * 10;
			const offsetY = deviceOrientation.beta * 10;
			return {
				cx: baseX + offsetX,
				cy: baseY + offsetY,
			};
		}

		const offsetX = mousePosition.x * 15;
		const offsetY = mousePosition.y * 10;

		return {
			cx: baseX + offsetX,
			cy: baseY + offsetY,
		};
	}, [isMobile, mousePosition, deviceOrientation]);

	const highlight = `radial-gradient(circle at ${cx}% ${cy}%, rgba(255,255,255,0.60), rgba(255,255,255,0.20) 35%, rgba(0,0,0,0) 70%)`;
	const vignette = `radial-gradient(circle at 50% 90%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.4) 100%)`;

	return (
		<div
			className="shader-light-overlay"
			style={{
				backgroundImage: `${highlight}, ${vignette}`,
			}}
		/>
	);
}


