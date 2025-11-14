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
	borderColor,
	className = "",
}: ProfilePictureProps) {
	const sizeStyle = {
		width: typeof size === "number" ? `${size}px` : size,
		height: typeof size === "number" ? `${size}px` : size,
	};

	const defaultBorderColor = "var(--k-color-primary)";
	const finalBorderColor = borderColor || defaultBorderColor;

	const borderStyle = border
		? {
				borderWidth: typeof borderWidth === "number" ? `${borderWidth}px` : borderWidth,
				borderColor: finalBorderColor.startsWith("var(") || finalBorderColor.startsWith("#") || finalBorderColor.startsWith("rgb")
					? finalBorderColor
					: undefined,
				borderStyle: "solid" as const,
			}
		: { border: "none" };

	return (
		<figure>
			<img
				src={src}
				alt={alt}
				loading="eager"
				className={`profile-image rounded-full object-cover ${className}`.trim()}
				style={{ ...sizeStyle, ...borderStyle }}
			/>
		</figure>
	);
}

