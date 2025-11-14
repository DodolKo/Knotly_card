export interface BackgroundProps {
	blur?: number;
	frost?: boolean;
}

export function Background({ blur = 0, frost = false }: BackgroundProps) {
	const blurStyle = blur > 0 ? { filter: `blur(${blur}px)` } : {};
	const frostStyle = frost
		? {
				backdropFilter: "blur(10px)",
				backgroundColor: "rgba(255, 255, 255, 0.1)",
			}
		: {};

	return (
		<div className="background-container">
			<div
				className="background-mobile"
				style={{ ...blurStyle, ...frostStyle }}
			/>
			<div
				className="background-desktop"
				style={{ ...blurStyle, ...frostStyle }}
			/>
		</div>
	);
}

