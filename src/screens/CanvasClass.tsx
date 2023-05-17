import React, {ReactElement, Suspense, useState, useEffect} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sky, PresentationControls, GradientTexture, useGLTF } from '@react-three/drei'
import { Board } from '../models/board'
import { Marble } from '../models/marble'
import { Physics, Debug} from '@react-three/cannon'

const CanvasClass = () => {

    const HitBox = (props: any) => {
        return (
            <mesh
            {...props} scale={[.7,.7,.7]}>
                <boxGeometry />
                {/* color="#ff0000"  */}
                <meshPhongMaterial opacity={0.1} color="#ff0000" transparent  />
            </mesh>
        )
    }

    const [marbles, setMarbles] = useState([] as Array<ReactElement>);
    const [hitbox, setHitBox] = useState([] as Array<ReactElement>);

    useEffect(() => {
        // spawnHitBoxes();
      }, [])

    const handleClick = (e: any) => {
        addMarble(e.point.x, 2, e.point.z);
        console.log(e);
    }

    const addMarble = (x:number, y:number, z:number) => {
        setMarbles([...marbles, < Marble position={[x,y,z]}/>])
    }

    const spawnHitBoxes = () => {
        let hb = [] as Array<ReactElement>
        for(let i = 0; i < 6; i++){
            hb = [...hb, <HitBox position={[(i) * .72 - 1.8, .5, .4]} />]
        }
        for(let i = 0; i < 6; i++){
            hb = [...hb, <HitBox position={[(i) * .72 - 1.8, .5, -.5]} />]
        }
        setHitBox(hb)
    }

    return(
        <>
        <Canvas style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -11,
        }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
        >
            {/* <color attach="background" args={['black']} /> */}
            <pointLight position={[10, 10, 10]}/>
            <ambientLight intensity={.2} />
            <Suspense fallback={null}>
                {/* your mesh here */}
                <PresentationControls
                    enabled={true} // the controls can be disabled by setting this to false
                    global={false} // Spin globally or by dragging the model
                    cursor={true} // Whether to toggle cursor style on drag
                    snap={false} // Snap-back to center (can also be a spring config)
                    speed={1} // Speed factor
                    zoom={1} // Zoom factor when half the polar-max is reached
                    rotation={[0, 0, 0]} // Default rotation
                    polar={[0, Math.PI / 2]} // Vertical limits
                    azimuth={[-Infinity, Infinity]} // Horizontal limits
                    config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                    // domElement={events.connected} // The DOM element events for this controller will attach to
                    >
                    <Physics>
                    {/* <Debug color="black" scale={1.1}> */}
                        <Board 
                        onClick={handleClick}
                        />
                        {[...marbles]}
                        {[...hitbox]}
                        {/* </Debug> */}
                    </Physics>
                    <Sky distance={450} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </PresentationControls>
               
                
            </Suspense>
            
        </Canvas>
        </>
    )
}

export default CanvasClass;