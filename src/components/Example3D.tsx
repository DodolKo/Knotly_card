import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Box() {
	return (
		<mesh position={[-2, 0, 0]}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}

function Sphere() {
	return (
		<mesh position={[2, 0, 0]}>
			<sphereGeometry args={[1, 32, 32]} />
			<meshStandardMaterial color="hotpink" />
		</mesh>
	);
}

export function Example3D() {
	return (
		<div className="h-screen w-full">
			<Canvas>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<Box />
				<Sphere />
				<OrbitControls />
			</Canvas>
		</div>
	);
}
