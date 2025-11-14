import { useEffect, useState, createContext, useContext } from "react";

interface ParallaxContextType {
	mousePosition: { x: number; y: number };
	deviceOrientation: { beta: number; gamma: number };
	isMobile: boolean;
	requestGyroscopePermission: () => Promise<void>;
	gyroscopeGranted: boolean;
}

const ParallaxContext = createContext<ParallaxContextType | null>(null);

export function useParallax() {
	const context = useContext(ParallaxContext);
	if (!context) {
		throw new Error("useParallax must be used within ParallaxRender");
	}
	return context;
}

interface ParallaxRenderProps {
	children: React.ReactNode;
}

export function ParallaxRender({ children }: ParallaxRenderProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
	const [isMobile, setIsMobile] = useState(false);
	const [gyroscopeGranted, setGyroscopeGranted] = useState(false);

	// Detect mobile device
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Mouse control for desktop
	useEffect(() => {
		if (isMobile) return;

		const handleMouseMove = (event: MouseEvent) => {
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;
			setMousePosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [isMobile]);

	// Request gyroscope permission function
	const requestGyroscopePermission = async () => {
		if (typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === "function") {
			try {
				const response = await (DeviceOrientationEvent as any).requestPermission();
				if (response === "granted") {
					setGyroscopeGranted(true);
				}
			} catch (error) {
				console.error("Gyroscope permission denied:", error);
			}
		} else {
			setGyroscopeGranted(true);
		}
	};

	// Gyroscope control for mobile
	useEffect(() => {
		if (!isMobile || !gyroscopeGranted) return;

		const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
			if (event.beta !== null && event.gamma !== null) {
				// Normalize beta (pitch) and gamma (roll) to -1 to 1 range
				const beta = Math.max(-90, Math.min(90, event.beta)) / 90;
				const gamma = Math.max(-90, Math.min(90, event.gamma)) / 90;
				setDeviceOrientation({ beta, gamma });
			}
		};

		window.addEventListener("deviceorientation", handleDeviceOrientation);

		return () => {
			window.removeEventListener("deviceorientation", handleDeviceOrientation);
		};
	}, [isMobile, gyroscopeGranted]);

	// Auto-request permission on mobile (non-iOS)
	useEffect(() => {
		if (isMobile && typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission !== "function") {
			setGyroscopeGranted(true);
		}
	}, [isMobile]);

	const contextValue: ParallaxContextType = {
		mousePosition,
		deviceOrientation,
		isMobile,
		requestGyroscopePermission,
		gyroscopeGranted,
	};

	return <ParallaxContext.Provider value={contextValue}>{children}</ParallaxContext.Provider>;
}

