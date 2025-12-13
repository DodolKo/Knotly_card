export interface BackgroundProps {
	blur?: number;
	frost?: boolean;
	scale?: number; // Scale percentage (100 = default, >100 = overscale)
	backgroundColor?: string; // Background color when no image is used
}

export function Background({ blur = 0, frost = false, scale = 100, backgroundColor }: BackgroundProps) {
	const blurStyle = blur > 0 ? { filter: `blur(${blur}px)` } : {};
	const frostStyle = frost
		? {
				backdropFilter: "blur(10px)",
				backgroundColor: "rgba(255, 255, 255, 0.1)",
			}
		: {};
	
	// Apply scale transform to overscale the background images
	// This ensures the image stays visible even with parallax movement
	const scaleStyle = scale !== 100 ? {
		transform: `scale(${scale / 100})`,
		transformOrigin: "center center",
	} : {};

	const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

	return (
		<div className="background-container">
			<div
				className="background-mobile"
				style={{ ...blurStyle, ...frostStyle, ...scaleStyle, ...backgroundColorStyle }}
			/>
			<div
				className="background-desktop"
				style={{ ...blurStyle, ...frostStyle, ...scaleStyle, ...backgroundColorStyle }}
			/>
		</div>
	);
}

