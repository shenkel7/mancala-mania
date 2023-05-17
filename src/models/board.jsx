
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useTrimesh } from '@react-three/cannon'


export function Board(props) {
  const { nodes, materials } = useGLTF("/mancala.glb");
  console.log(nodes);
  const [ref, api] = useTrimesh(
    () => ({
      args: [
        nodes.Cube.geometry.attributes.position.array,
        nodes.Cube.geometry.index.array,
      ],
    //   mass: 0,
    //   ...props,
    type: 'Static'
    }),
    useRef()
  )

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.002"]}
        scale={[1, 1, 1]}
      />
    </group>
  );
}

useGLTF.preload("/mancala.glb");