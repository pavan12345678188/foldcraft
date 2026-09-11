import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,ArrowUpRight,Menu,X,Mail,Instagram,Play,ChevronRight}from'lucide-react';
import'./index.css';

const nav=['Home','Projects','Studio','Reach Us'];
const projects=[
['01','Aster House','Brand Identity · Digital','2026'],
['02','Monoform','Campaign · Motion','2026'],
['03','Noma Objects','Art Direction · Product','2025']
];

function App(){
 const[menu,setMenu]=useState(false),[panel,setPanel]=useState(null),[playing,setPlaying]=useState(true);
 const video=useRef(null);
 const close=()=>{setMenu(false);setPanel(null);document.body.classList.remove('panel-open')};
 const open=p=>{setMenu(false);setPanel(p);document.body.classList.add('panel-open')};
 useEffect(()=>{const k=e=>{if(e.key==='Escape')close()};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 const navTo=x=>x==='Home'?close():open(x);
 const toggle=async()=>{if(!video.current)return;if(video.current.paused){await video.current.play();setPlaying(true)}else{video.current.pause();setPlaying(false)}};
 return <div className="root">
  <video ref={video} autoPlay muted loop playsInline className="video" style={{objectPosition:'70% center'}} src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"/>
  <div className="shade"/>
  <header className="header">
   <button className="logo" onClick={()=>navTo('Home')}>Foldcraft</button>
   <nav className="desktop-nav">{nav.map(x=><button key={x} onClick={()=>navTo(x)}>{x}</button>)}</nav>
   <button className="talk desktop-talk" onClick={()=>open('Reach Us')}>Let's Talk</button>
   <button className="hamburger" aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(v=>!v)}>
    <Menu className={menu?'hide-icon':''}/><X className={menu?'show-icon':'hide-icon'}/>
   </button>
  </header>

  <div className={'mobile-menu '+(menu?'open':'')}>
   <nav>{nav.map(x=><button key={x} onClick={()=>navTo(x)}>{x}</button>)}<button className="mobile-talk" onClick={()=>open('Reach Us')}>Let's Talk</button></nav>
  </div>

  <main className="hero">
   <section className="top">
    <p className="badge">Brand &amp; Visual Storytelling</p>
    <h1>Shaping visual<br/>narratives,<br/>one pixel at a time.</h1>
   </section>
   <section className="bottom">
    <p>Turning vision into reality through craft, motion, and an endless pursuit of beauty.</p>
    <div className="actions">
     <button className="primary" onClick={()=>open('Projects')}>Explore Work <ArrowRight size={16}/></button>
    </div>
   </section>
  </main>

  {panel&&<div className="modal" onMouseDown={e=>e.target===e.currentTarget&&close()}>
   <div className="panel">
    <button className="close" onClick={close}><X size={19}/></button>
    {panel==='Projects'&&<><small>Selected work</small><h2>Projects<span>.</span></h2><div className="project-list">{projects.map(p=><button className="project" key={p[0]}><i>{p[0]}</i><div><b>{p[1]}</b><em>{p[2]} · {p[3]}</em></div><ArrowUpRight/></button>)}</div></>}
    {panel==='Studio'&&<><small>The studio</small><h2>Ideas, made tangible<span>.</span></h2><p className="copy">Foldcraft is an independent creative studio focused on identities, digital experiences, campaigns, and motion. We turn clear ideas into visual systems people remember.</p><div className="services">{['Brand Identity','Digital Design','Motion & Film'].map((x,i)=><div key={x}><small>0{i+1}</small><b>{x}</b></div>)}</div></>}
    {panel==='Reach Us'&&<><small>Start a project</small><h2>Let's make something<span>.</span></h2><p className="copy">Tell us what you're building, what you're changing, or what you want people to feel. We'll take it from there.</p><div className="contact"><a href="mailto:hello@foldcraft.studio"><Mail/>hello@foldcraft.studio<ChevronRight/></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram/>Instagram</a></div></>}
   </div>
  </div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);