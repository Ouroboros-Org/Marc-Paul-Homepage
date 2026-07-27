"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [["Advisory","/advisory"],["Experience","/experience"],["Speaking","/speaking"],["Thinking","/thinking"],["About","/about"]];
export function Header(){const [open,setOpen]=useState(false);const path=usePathname();return <header className="site-header"><div className="shell nav-wrap"><Link href="/" className="brand" aria-label="Marc Paul home"><span>Marc Paul</span><small>Independent advisor</small></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="primary-nav" aria-label={open?"Close menu":"Open menu"}>{open?<X/>:<Menu/>}</button><nav id="primary-nav" className={open?"nav-links open":"nav-links"} aria-label="Primary navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={path===href?"page":undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="button button-small" href="/contact" onClick={()=>setOpen(false)}>Book intro call</Link></nav></div></header>}
