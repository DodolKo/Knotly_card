export function AppContent({ children }: { children: React.ReactNode }) {
	return (
		<main className="layout-content">
			<div className="grid-layout">
				{children}
			</div>
		</main>
	);
}

