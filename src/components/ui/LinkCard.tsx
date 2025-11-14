import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import { getLinkByName, type UserProfile } from "../../utils/user";
import { LinkBadge } from "./LinkBadge";
import { QRCodeModal } from "./QRCodeModal";

export type ThumbnailFormat = "banner" | "display" | "none";
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
	badge?: string;
	badgeHidden?: boolean;
	qrCodeDisabled?: boolean;
}

export function LinkCard({
	mode = "auto",
	name,
	url,
	asThumbnail = false,
	asIcon = false,
	thumbnailFormat = "none",
	thumbnailSrc,
	iconSrc,
	titlePosition = "center",
	badge,
	badgeHidden = false,
	qrCodeDisabled = false,
}: LinkCardProps) {
	const [linkData, setLinkData] = useState<{ name: string; url: string } | null>(null);
	const [loading, setLoading] = useState(mode === "auto");
	const [qrModalOpen, setQrModalOpen] = useState(false);

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

	const handleQrClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!qrCodeDisabled && linkData) {
			setQrModalOpen(true);
		}
	};

	if (loading || !linkData) {
		return null;
	}

	const textAlignClass =
		titlePosition === "left"
			? "text-left"
			: titlePosition === "right"
				? "text-right"
				: "text-center";

	const thumbnailClass =
		thumbnailFormat === "banner"
			? "link-card-thumbnail-banner"
			: thumbnailFormat === "display"
				? "link-card-thumbnail-display"
				: "";

	return (
		<>
			<a href={linkData.url} className="link-card">
				{asThumbnail && thumbnailSrc && thumbnailFormat !== "none" && (
					<div className={`link-card-thumbnail-wrapper ${thumbnailClass}`}>
						<img
							src={thumbnailSrc}
							alt={`${linkData.name} thumbnail`}
							className="link-card-thumbnail-image"
						/>
					</div>
				)}
				<div className="link-card-content">
					<div className="link-card-main">
						{asIcon && iconSrc && (
							<img src={iconSrc} alt={`${linkData.name} icon`} className="link-card-icon" />
						)}
						<span className={`link-card-text ${textAlignClass} text-h4 text-color-primary`}>{linkData.name}</span>
					</div>
					{badge && <LinkBadge text={badge} hidden={badgeHidden} />}
				</div>
				{!qrCodeDisabled && (
					<button
						className="link-card-qr-button"
						onClick={handleQrClick}
						aria-label="Show QR code"
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect width="5" height="5" x="3" y="3" rx="1" />
							<rect width="5" height="5" x="16" y="3" rx="1" />
							<rect width="5" height="5" x="3" y="16" rx="1" />
							<path d="M21 16h-3" />
							<path d="M9 21h3" />
							<path d="M21 12v-3" />
							<path d="M12 9H9" />
							<path d="M12 21v-3" />
							<path d="M12 9V3" />
							<path d="M21 21v-3" />
							<path d="M21 9h-3" />
						</svg>
					</button>
				)}
			</a>
			{!qrCodeDisabled && (
				<QRCodeModal
					url={linkData.url}
					name={linkData.name}
					isOpen={qrModalOpen}
					onClose={() => setQrModalOpen(false)}
				/>
			)}
		</>
	);
}
