import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function QRCodeShare() {
	const [isOpen, setIsOpen] = useState(false);
	const currentUrl = window.location.href;

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
				aria-label="Share via QR Code"
				title="Share via QR Code"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
					/>
				</svg>
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						onClick={() => setIsOpen(false)}
					/>
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Share via QR Code
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
									aria-label="Close"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="flex flex-col items-center space-y-4">
								<div className="bg-white p-4 rounded-lg">
									<QRCodeSVG
										value={currentUrl}
										size={256}
										level="H"
										includeMargin={true}
									/>
								</div>
								<div className="w-full">
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
										Scan to share this link
									</p>
									<div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
										<input
											type="text"
											value={currentUrl}
											readOnly
											className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none"
										/>
										<button
											onClick={() => {
												navigator.clipboard.writeText(currentUrl);
											}}
											className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
											title="Copy link"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
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
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

