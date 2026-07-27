"use client";
import dynamic from "next/dynamic";
const Scene = dynamic(()=>import("./scene-canvas"),{ssr:false,loading:()=> <div className="scene-fallback" aria-label="Abstract layered architectural system"><i/><i/><i/><b/></div>});
export function HeroScene(){return <div className="scene-wrap"><Scene/></div>}
