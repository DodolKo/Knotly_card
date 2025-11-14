import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export interface QRCodeModalProps {
	url: string;
	name: string;
	isOpen: boolean;
	onClose: () => void;
}

export function QRCodeModal({ url, name, isOpen, onClose }: QRCodeModalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen || !mounted) {
		return null;
	}

	return (
		<div className="qr-modal-overlay" onClick={onClose}>
			<div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="qr-modal-header">
					<h3 className="qr-modal-title">Scan QR Code</h3>
					<button className="qr-modal-close" onClick={onClose} aria-label="Close">
						×
					</button>
				</div>
				<div className="qr-modal-body">
					<div className="qr-code-container">
						<QRCodeSVG value={url} size={256} level="H" />
					</div>
					<p className="qr-modal-link-name">{name}</p>
					<p className="qr-modal-link-url">{url}</p>
				</div>
			</div>
		</div>
	);
}

