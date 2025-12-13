import { LayoutRender } from "./components/layout/LayoutRender";
import { AppHeader } from "./components/layout/AppHeader";
import { AppContent } from "./components/layout/AppContent";
import { AppFooter } from "./components/layout/AppFooter";
import { LinkCard } from "./components/ui/LinkCard";
import { Background } from "./components/ui/Background";
import { ParallaxRender, ParallaxLayer, GyroscopePermissionButton } from "./components/parallax";

function App() {
	return (
		<ParallaxRender>
			<ParallaxLayer layer={0} tilt={0}>
				<Background 
					backgroundColor="#F5C2C7"
				/>
			</ParallaxLayer>
			{/* Scrollable container for GSAP scroll-driven elements and layout */}
			<div
				className="scrollable-content"
				style={{
					position: "fixed",
					inset: 0,
					overflowY: "auto",
					overflowX: "hidden",
					width: "100%",
					height: "100%",
				}}
			>
				{/* GSAP scroll-driven SVG shapes layer */}
				{/* <ParallaxGsapLayer layer={0.8} tilt={35}>
					<ShapesScrollLayer />
				</ParallaxGsapLayer> */}

				<LayoutRender>
					<ParallaxLayer layer={1} tilt={35}>
						<AppHeader 
							titleColor="#000000"
							bioColor="#F5C2C7"
						/>
					</ParallaxLayer>

					<ParallaxLayer layer={2} tilt={35}>
						<AppContent>
							<LinkCard 
								name="Site Web" 
								backgroundColor="#D4A797"
								textColor="#000000"
							/>
							<LinkCard 
								name="Instagram" 
								backgroundColor="#D4A797"
								textColor="#000000"
							/>
						</AppContent>
					</ParallaxLayer>

					<ParallaxLayer layer={3} tilt={35}>
						<AppFooter />
					</ParallaxLayer>
				</LayoutRender>
			</div>

			{/* <SparkleField /> */}
			{/* <LightingShader /> */}

			<GyroscopePermissionButton />
		</ParallaxRender>
	);
}

export default App;
