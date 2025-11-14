import type React from "react";

// Simple canvas-like container for your SVG shapes from /public/media/img/shapes
// This component is meant to be wrapped by ParallaxGsapLayer.
export const ShapesScrollLayer: React.FC = () => {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100vh",
				pointerEvents: "none",
				overflow: "visible",
			}}
		>
			{/* Soft Star */}
			<img
				data-shape="soft-star"
				src="/media/img/shapes/Soft Star.svg"
				alt="Soft Star"
				style={{
					position: "absolute",
					top: "10%",
					left: "20%",
					width: "120px",
					height: "120px",
					filter: "drop-shadow(0 0 18px rgba(255, 255, 255, 0.55))",
				}}
			/>

			{/* Asterisk 2 */}
			<img
				data-shape="asterisk-2"
				src="/media/img/shapes/Asterisk 2.svg"
				alt="Asterisk 2"
				style={{
					position: "absolute",
					top: "40%",
					right: "15%",
					width: "100px",
					height: "100px",
					filter: "drop-shadow(0 0 18px rgba(185, 221, 255, 0.6))",
				}}
			/>

			{/* Asterisk 3 */}
			<img
				data-shape="asterisk-3"
				src="/media/img/shapes/Asterisk 3.svg"
				alt="Asterisk 3"
				style={{
					position: "absolute",
					bottom: "12%",
					left: "55%",
					width: "90px",
					height: "90px",
					filter: "drop-shadow(0 0 16px rgba(255, 210, 255, 0.65))",
				}}
			/>
		</div>
	);
};


