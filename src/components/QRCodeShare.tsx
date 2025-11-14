import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function QRCodeShare() {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const currentUrl = window.location.href;

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

	const handleClose = () => setIsOpen(false);
	const handleCopy = () => navigator.clipboard.writeText(currentUrl);

	if (!mounted) {
		return null;
	}

	const modal = isOpen ? (
		<div className="qr-modal-overlay" onClick={handleClose}>
			<div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="qr-modal-header">
					<div className="qr-modal-header-main">
						<h3 className="qr-modal-title">Share via QR Code</h3>
						<p className="qr-modal-link-url qr-modal-link-url-header">{currentUrl}</p>
					</div>
					<button className="qr-modal-close" onClick={handleClose} aria-label="Close">
						<img src="/icons/close.svg" alt="Close" className="qr-modal-close-icon" />
					</button>
				</div>
				<div className="qr-modal-body">
					<div className="qr-code-container">
						<QRCodeSVG value={currentUrl} size={300} level="H" />
					</div>
					<p className="qr-modal-helper">Scan this QR code to share this link</p>
					<div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 w-full max-w-sm">
						<input
							type="text"
							value={currentUrl}
							readOnly
							className="flex-1 bg-transparent text-sm text-color-primary outline-none"
						/>
						<button
							onClick={handleCopy}
							className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
							title="Copy link"
							aria-label="Copy link"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className="qr-modal-footer">
					<span className="qr-modal-footer-text">Powered by</span>
					<span className="qr-modal-footer-brand">Knotly.link</span>
					<img src="/icons/knotly.svg" alt="Knotly logo" className="qr-modal-footer-logo" />
				</div>
			</div>
		</div>
	) : null;

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
				aria-label="Share via QR Code"
				title="Share via QR Code"
			>
				<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
					/>
				</svg>
			</button>
			{mounted && modal && createPortal(modal, document.body)}
		</>
	);
}

