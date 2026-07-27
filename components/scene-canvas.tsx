"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
function Model(){const group=useRef<THREE.Group>(null);useFrame((state)=>{if(group.current){group.current.rotation.y=state.pointer.x*.055-.28;group.current.rotation.x=state.pointer.y*-.035+.12}});return <group ref={group} rotation={[.12,-.28,0]}>
 <mesh position={[0,-1.35,0]}><boxGeometry args={[4.8,.28,3.2]}/><meshStandardMaterial color="#292724" roughness={.88}/></mesh>
 <mesh position={[-.35,-.82,.08]}><boxGeometry args={[3.8,.18,2.55]}/><meshStandardMaterial color="#3b3833" roughness={.72}/></mesh>
 <mesh position={[.4,-.16,-.22]}><boxGeometry args={[3.25,.12,2.1]}/><meshStandardMaterial color="#141414" metalness={.35} roughness={.35}/></mesh>
 <mesh position={[-.9,.63,-.6]} rotation={[0,.08,0]}><boxGeometry args={[.08,2.55,2.55]}/><meshPhysicalMaterial color="#77716a" transparent opacity={.25} transmission={.45} roughness={.25}/></mesh>
 <Float speed={.75} rotationIntensity={.06} floatIntensity={.16}><mesh position={[1.25,.72,.5]}><boxGeometry args={[.72,.72,.72]}/><meshStandardMaterial color="#b9552e" roughness={.5}/></mesh></Float>
 <mesh position={[.1,.4,.85]}><torusGeometry args={[1.45,.018,8,64]}/><meshBasicMaterial color="#cf6940"/></mesh>
 </group>}
export default function SceneCanvas(){return <Canvas dpr={[1,1.5]} camera={{position:[5,4.2,6],fov:38}} role="img" aria-label="A layered architectural model representing complex technical decisions"><color attach="background" args={["#11110f"]}/><ambientLight intensity={1.1}/><directionalLight position={[4,7,5]} intensity={3.2} color="#ffe4c7"/><directionalLight position={[-4,1,-2]} intensity={1.2} color="#9a9b93"/><Model/></Canvas>}
