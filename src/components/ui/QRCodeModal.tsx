import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

	const modal = (
		<div className="qr-modal-overlay" onClick={onClose}>
			<div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="qr-modal-header">
					<div className="qr-modal-header-main">
						<h3 className="qr-modal-title">{name}</h3>
						<p className="qr-modal-link-url qr-modal-link-url-header">{url}</p>
					</div>
					<button className="qr-modal-close" onClick={onClose} aria-label="Close">
						<img src="/icons/close.svg" alt="Close" className="qr-modal-close-icon" />
					</button>
				</div>
				<div className="qr-modal-body">
					<div className="qr-code-container">
						<QRCodeSVG value={url} size={256} level="H" />
					</div>
					<p className="qr-modal-helper">Scan this QR code to open the link.</p>
				</div>
				<div className="qr-modal-footer">
					<span className="qr-modal-footer-text">Powered by</span>
					<span className="qr-modal-footer-brand">Knotly.link</span>
					<img
						src="/icons/knotly.svg"
						alt="Knotly logo"
						className="qr-modal-footer-logo"
					/>
				</div>
			</div>
		</div>
	);

	return createPortal(modal, document.body);
}

