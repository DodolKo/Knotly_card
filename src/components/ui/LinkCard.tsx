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
	/** Optional custom background color for the whole card */
	backgroundColor?: string;
	/** Optional custom text color for the title */
	textColor?: string;
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
	backgroundColor,
	textColor,
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
			<a
				href={linkData.url}
				className="link-card"
				style={backgroundColor ? { backgroundColor } : undefined}
			>
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
						<span
							className={`link-card-text ${textAlignClass} text-h4 text-color-primary`}
							style={textColor ? { color: textColor } : undefined}
						>
							{linkData.name}
						</span>
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
						<img src="/icons/qr_code.svg" alt="QR code" className="link-card-qr-icon" />
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
