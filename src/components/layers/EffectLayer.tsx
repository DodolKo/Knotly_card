export interface EffectLayerProps {
	layer1?: string; // Path to PNG image for layer 1
	layer2?: string; // Path to PNG image for layer 2
	layer3?: string; // Path to PNG image for layer 3
	scale?: number; // Scale percentage (100 = default, >100 = overscale)
	opacity?: number; // Opacity for all layers (0-1, default: 1)
}

export function EffectLayer({ 
	layer1, 
	layer2, 
	layer3, 
	scale = 100,
	opacity = 1 
}: EffectLayerProps) {
	// Apply scale transform to overscale the effect layers
	const scaleStyle = scale !== 100 ? {
		transform: `scale(${scale / 100})`,
		transformOrigin: "center center",
	} : {};

	const opacityStyle = opacity !== 1 ? { opacity } : {};

	return (
		<div className="effect-layer-container">
			{layer1 && (
				<div
					className="effect-layer effect-layer-1"
					style={{
						backgroundImage: `url(${layer1})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						...scaleStyle,
						...opacityStyle,
					}}
				/>
			)}
			{layer2 && (
				<div
					className="effect-layer effect-layer-2"
					style={{
						backgroundImage: `url(${layer2})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						...scaleStyle,
						...opacityStyle,
					}}
				/>
			)}
			{layer3 && (
				<div
					className="effect-layer effect-layer-3"
					style={{
						backgroundImage: `url(${layer3})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						...scaleStyle,
						...opacityStyle,
					}}
				/>
			)}
		</div>
	);
}

