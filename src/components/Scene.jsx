import { Canvas } from "@react-three/fiber";
import  Model from "./Model";
import { OrbitControls } from "@react-three/drei";
import { Skybox } from "./Skybox";
import { Floor } from "./Floor";

export default function Scene() {
  // const [count, setCount] = useState
  return (
    <Canvas camera={{ position: [100, 30, 0], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Skybox />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Floor />
      <OrbitControls
      //  maxPolarAngle={Math.PI / 3}
      //  minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
