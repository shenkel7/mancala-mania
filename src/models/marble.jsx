import React, {useRef} from 'react'
import { GradientTexture } from "@react-three/drei";
import { useSphere, Debug } from '@react-three/cannon'


export function Marble(props) {

    const [ref, api] = useSphere(
        () => ({ args: [.1, 10, 10], mass: 1, ...props }),
        useRef()
      )

    return (
      <group dispose={null}>
        {/* <Debug> */}

        <mesh
            {...props}
          castShadow
          receiveShadow
          scale={[1, 1, 1]}
          ref={ref}
          >
            <sphereGeometry args={[.1, 10, 10]} attach="geometry" />
            <meshBasicMaterial>
                <GradientTexture
                stops={[0, 1]} // As many stops as you want
                colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
                size={1024} // Size is optional, default = 1024
                />
            </meshBasicMaterial>
        </mesh>
                {/* </Debug> */}
      </group>
    );
  }
