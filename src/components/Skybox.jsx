import { useEffect } from "react";
import {  useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";

export const Skybox = () => {
  // Use `useThree` para acessar a cena e outras propriedades
  const { scene } = useThree();

  useEffect(() => {
    const path = "/assets/textures/sky/";
    const format = ".jpg";
    const urls = [
      path + "px" + format,
      path + "nx" + format,
      path + "py" + format,
      path + "ny" + format,
      path + "pz" + format,
      path + "nz" + format,
    ];

    // Carrega a textura do cubo
    const reflectionCube = new CubeTextureLoader().load(urls);
    scene.background = reflectionCube; // Define a textura como background da cena
  }, [scene]);

  return null; // Não renderiza nada visível diretamente
};
