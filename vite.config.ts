import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "prompt",
			includeAssets: ["favicon.ico", "pwa/**/*"],
			manifest: {
				name: "Knotly - Link in Bio",
				short_name: "Knotly",
				description:
					"A customizable link-in-bio platform where users can showcase multiple links in a single, personalized page",
				start_url: "/",
				scope: "/",
				display: "standalone",
				orientation: "portrait-primary",
				theme_color: "#646cff",
				background_color: "#242424",
				lang: "en",
				dir: "ltr",
				categories: ["social", "productivity", "utilities"],
				icons: [
					{
						src: "/pwa/android/android-launchericon-48-48.png",
						sizes: "48x48",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-72-72.png",
						sizes: "72x72",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-96-96.png",
						sizes: "96x96",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-144-144.png",
						sizes: "144x144",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-192-192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-512-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa/android/android-launchericon-512-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				screenshots: [
					{
						src: "/pwa/preview.png",
						sizes: "1280x720",
						type: "image/png",
						form_factor: "wide",
						label: "Knotly Desktop Preview",
					},
					{
						src: "/pwa/preview-mobile.png",
						sizes: "750x1334",
						type: "image/png",
						form_factor: "narrow",
						label: "Knotly Mobile Preview",
					},
				],
				shortcuts: [
					{
						name: "My Links",
						short_name: "Links",
						description: "View all your links",
						url: "/",
						icons: [
							{
								src: "/pwa/android/android-launchericon-192-192.png",
								sizes: "192x192",
							},
						],
					},
				],
			},
			workbox: {
				disableDevLogs: true,
				skipWaiting: false,
				clientsClaim: false,
				globPatterns: [],
				globIgnores: ["**/*"],
				runtimeCaching: [],
				navigateFallback: null,
				// NoCache mode - disable all caching
				cleanupOutdatedCaches: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
