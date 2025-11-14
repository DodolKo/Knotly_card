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
			<ParallaxLayer layer={0}>
				<Background 
					blur={10} 
					frost={true} 
				/>
			</ParallaxLayer>

			<LayoutRender>
				<ParallaxLayer layer={1} tilt={8}>
					<AppHeader />
				</ParallaxLayer>

				<ParallaxLayer layer={2} tilt={8}>
					<AppContent>
						<LinkCard name="gumroad" />
						<LinkCard name="koFi" />
						<LinkCard name="Home" />
						<LinkCard mode="manual" name="Custom Link" url="https://example.com" />
					</AppContent>
				</ParallaxLayer>

				<ParallaxLayer layer={3} tilt={8}>
					<AppFooter />
				</ParallaxLayer>
			</LayoutRender>
			<GyroscopePermissionButton />
		</ParallaxRender>
	);
}

export default App;
