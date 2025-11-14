import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import { getLinkByName, type UserProfile } from "../../utils/user";

export type ThumbnailFormat = "circle" | "square" | "none";
export type TitlePosition = "center" | "left" | "right";

export interface LinkCardProps {
	mode?: "auto" | "manual";
	name: string;
	url?: string;
	asThumbnail?: boolean;
	asIcon?: boolean;
	thumbnailFormat?: ThumbnailFormat;
	thumbnailSrc?: string;
	iconSrc?: string;
	titlePosition?: TitlePosition;
}

export function LinkCard({
	mode = "auto",
	name,
	url,
	asThumbnail = false,
	asIcon = false,
	thumbnailFormat = "circle",
	thumbnailSrc,
	iconSrc,
	titlePosition = "center",
}: LinkCardProps) {
	const [linkData, setLinkData] = useState<{ name: string; url: string } | null>(null);
	const [loading, setLoading] = useState(mode === "auto");

	useEffect(() => {
		if (mode === "manual") {
			if (name && url) {
				setLinkData({ name, url });
				setLoading(false);
			}
			return;
		}

		const loadLink = async () => {
			try {
				const user = await fetchJson<UserProfile>("/data/user.json");
				const link = getLinkByName(user, name);
				if (link) {
					setLinkData({ name: link.name, url: link.url });
				}
			} catch (err) {
				console.error(`Failed to load link "${name}"`, err);
			} finally {
				setLoading(false);
			}
		};

		void loadLink();
	}, [mode, name, url]);

	if (loading || !linkData) {
		return null;
	}

	const textAlignClass =
		titlePosition === "left"
			? "text-left"
			: titlePosition === "right"
				? "text-right"
				: "text-center";

	return (
		<a href={linkData.url} className="link-card">
			{asThumbnail && thumbnailSrc && (
				<img
					src={thumbnailSrc}
					alt={`${linkData.name} thumbnail`}
					className={
						thumbnailFormat === "circle"
							? "link-card-thumbnail-circle"
							: thumbnailFormat === "square"
								? "link-card-thumbnail-square"
								: "link-card-thumbnail"
					}
				/>
			)}
			{asIcon && iconSrc && (
				<img src={iconSrc} alt={`${linkData.name} icon`} className="link-card-icon" />
			)}
			<span className={`link-card-text ${textAlignClass}`}>{linkData.name}</span>
		</a>
	);
}

