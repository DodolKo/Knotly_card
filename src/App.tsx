import { LayoutRender } from "./components/layout/LayoutRender";
import { AppHeader } from "./components/layout/AppHeader";
import { AppContent } from "./components/layout/AppContent";
import { AppFooter } from "./components/layout/AppFooter";
import { LinkCard } from "./components/ui/LinkCard";
import { Background } from "./components/ui/Background";
import { ShapesScrollLayer } from "./components/ui/ShapesScrollLayer";
import { ParallaxRender, ParallaxLayer, ParallaxGsapLayer, GyroscopePermissionButton } from "./components/parallax";

function App() {
	return (
		<ParallaxRender>
			
			<ParallaxLayer layer={0} tilt={15} >
				<Background 
					blur={2.5} 
					frost={true}
					scale={125}
				/>
			</ParallaxLayer>
			

			{/* <ParallaxLayer layer={0.5} tilt={10}>
				<EffectLayer
					layer1="/media/img/layers/layer-1.png"
					layer2="/media/img/layers/layer-2.png"
					layer3="/media/img/layers/layer-3.png"
					scale={115}
					opacity={1}
				/>
			</ParallaxLayer> */}

			{/* GSAP scroll-driven SVG shapes layer */}
			<ParallaxGsapLayer layer={0.8} tilt={8}>
				<ShapesScrollLayer />
			</ParallaxGsapLayer>

			<LayoutRender>
				<ParallaxLayer layer={1} tilt={15}>
					<AppHeader />
				</ParallaxLayer>

				<ParallaxLayer layer={2} tilt={25}>
					<AppContent>
						<LinkCard name="gumroad" />
						<LinkCard name="koFi" />
						<LinkCard name="Home" />
						<LinkCard mode="manual" name="Custom Link" url="https://example.com" />
						<LinkCard 
							mode="manual" 
							name="Banner Thumbnail Link" 
							url="https://example.com"
							asThumbnail={true}
							thumbnailFormat="banner"
							thumbnailSrc="/media/img/thumbmail/thumbnail_16-9.png"
						/>
						<LinkCard 
							mode="manual" 
							name="Display Thumbnail Link" 
							url="https://example.com"
							asThumbnail={true}
							thumbnailFormat="display"
							thumbnailSrc="/media/img/thumbmail/thumbnail_4-3.png"
						/>
					</AppContent>
				</ParallaxLayer>

				<ParallaxLayer layer={3} tilt={15}>
					<AppFooter />
				</ParallaxLayer>
			</LayoutRender>

			{/* <SparkleField /> */}
			{/* <LightingShader /> */}

			<GyroscopePermissionButton />
		</ParallaxRender>
	);
}

export default App;
