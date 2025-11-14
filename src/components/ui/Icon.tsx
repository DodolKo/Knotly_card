export interface IconProps {
	src: string;
	alt?: string;
	width?: number | string;
	height?: number | string;
	className?: string;
}

export function Icon({ src, alt = "", width = 24, height = 24, className = "" }: IconProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
		/>
	);
}

