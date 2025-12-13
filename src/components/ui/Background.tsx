export interface BackgroundProps {
	scale?: number; // Scale percentage (100 = default, >100 = overscale)
	backgroundColor?: string; // Background color when no image is used
}

export function Background({ scale = 100, backgroundColor }: BackgroundProps) {
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
				style={{ ...scaleStyle, ...backgroundColorStyle }}
			/>
			<div
				className="background-desktop"
				style={{ ...scaleStyle, ...backgroundColorStyle }}
			/>
		</div>
	);
}

