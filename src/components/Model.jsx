import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export default function Model({ initialPosition, ...props }) {
  const [direction, setDirection] = useState(new THREE.Vector3(0, 0, 0));
  const [speed, setSpeed] = useState(7);
  const [toggleAnimation, setToggleAnimation] = useState(false);

  const group = useRef();

  const gltf = useLoader(GLTFLoader, "/assets/robot_ant/scene.gltf");

  const scene = useMemo(() => clone(gltf.scene), [gltf]);
  const animations = useMemo(() => gltf.animations, [gltf]);

  const { actions } = useAnimations(animations, group);

  const setRandomMovement = () => {
    const randomDirection = new THREE.Vector3(
      Math.random() * 2 - 1,
      0,
      Math.random() * 2 - 1
    ).normalize();

    setDirection(randomDirection);
  };

  useEffect(() => {
    setRandomMovement();
    const interval = setInterval(
      setRandomMovement,
      (Math.floor(Math.random() * (10 - 3 + 1)) + 3) * 1000
    );

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    const clampedDelta = Math.min(delta, 0.1);
    // Update position based on direction and speed
    group.current.position.x += direction.x * speed * clampedDelta;
    group.current.position.z += direction.z * speed * clampedDelta;

    // Adjust rotation to face the moving direction
    group.current.lookAt(
      group.current.position.x + direction.x,
      group.current.position.y,
      group.current.position.z + direction.z
    );

    // Check boundaries and invert direction if needed
    if (group.current.position.x >= 25 || group.current.position.x <= -25) {
      direction.x *= -1; // Invert X direction
    }

    if (group.current.position.z >= 25 || group.current.position.z <= -25) {
      direction.z *= -1; // Invert Z direction
    }
  });

  useEffect(() => {
    if (actions && actions["Walk"]) {
      actions["Walk"].play();
    }
    return () => {
      if (actions && actions["Walk"])
        actions["Walk"].stop();
    };
  }, [actions, toggleAnimation]);

  return <primitive  scale={[0.005, 0.005, 0.005]} ref={group} object={scene} />;
}
