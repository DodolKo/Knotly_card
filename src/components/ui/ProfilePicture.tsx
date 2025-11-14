export interface ProfilePictureProps {
	src: string;
	alt: string;
	size?: number | string;
	border?: boolean;
	borderWidth?: number | string;
	borderColor?: string;
	className?: string;
}

export function ProfilePicture({
	src,
	alt,
	size = 96,
	border = true,
	borderWidth = 4,
	borderColor = "gray-900",
	className = "",
}: ProfilePictureProps) {
	const sizeStyle = {
		width: typeof size === "number" ? `${size}px` : size,
		height: typeof size === "number" ? `${size}px` : size,
	};

	const borderStyle = border
		? {
				borderWidth: typeof borderWidth === "number" ? `${borderWidth}px` : borderWidth,
				borderColor: borderColor && (borderColor.startsWith("#") || borderColor.startsWith("rgb"))
					? borderColor
					: borderColor && borderColor.startsWith("var(")
					? borderColor
					: undefined,
				borderStyle: "solid" as const,
			}
		: { border: "none" };

	const borderClass = border && !borderColor.startsWith("#") && !borderColor.startsWith("rgb")
		? `border-${borderWidth} border-${borderColor}`
		: "";

	return (
		<figure>
			<img
				src={src}
				alt={alt}
				loading="eager"
				className={`profile-image rounded-full object-cover shadow-lg ${borderClass} ${className}`.trim()}
				style={{ ...sizeStyle, ...borderStyle }}
			/>
		</figure>
	);
}

