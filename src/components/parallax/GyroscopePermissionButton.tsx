import { useParallax } from "./ParallaxRender";

export function GyroscopePermissionButton() {
	const { isMobile, gyroscopeGranted, requestGyroscopePermission } = useParallax();

	if (!isMobile || gyroscopeGranted) {
		return null;
	}

	return (
		<button
			onClick={requestGyroscopePermission}
			style={{
				position: "fixed",
				bottom: "20px",
				left: "50%",
				transform: "translateX(-50%)",
				padding: "12px 24px",
				backgroundColor: "#646cff",
				color: "white",
				border: "none",
				borderRadius: "8px",
				fontSize: "14px",
				fontWeight: "500",
				cursor: "pointer",
				zIndex: 1000,
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			}}
		>
			Activer le gyroscope pour l'effet parallaxe
		</button>
	);
}

