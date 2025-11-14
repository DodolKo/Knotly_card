export interface LinkBadgeProps {
	text: string;
	hidden?: boolean;
	className?: string;
}

export function LinkBadge({ text, hidden = false, className = "" }: LinkBadgeProps) {
	if (hidden) {
		return null;
	}

	return (
		<span className={`link-badge ${className}`}>
			{text}
		</span>
	);
}

