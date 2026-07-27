import Link from "next/link";
import { ArrowRight } from "lucide-react";
export function PageHero({label,title,children}:{label:string,title:string,children:React.ReactNode}){return <section className="page-hero shell"><p className="eyebrow"><span/> {label}</p><h1>{title}</h1><div className="page-intro">{children}</div></section>}
export function CTA(){return <section className="cta shell"><p className="eyebrow">Start a conversation</p><h2>Bring me the difficult idea.</h2><p>Unclear opportunity, messy technology, uncertain product direction—that is usually a useful place to begin.</p><Link className="button" href="/contact">Book an intro call <ArrowRight size={18}/></Link></section>}
