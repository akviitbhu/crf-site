(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* ---------- INTRO ---------- */
const intro=$('#intro');
const heroIn=()=>$$('.hero .rv').forEach(e=>e.classList.add('in'));
function endIntro(){if(!intro)return;heroIn();intro.classList.add('out');document.body.classList.remove('lock');try{sessionStorage.setItem('crfIntro','1')}catch(e){}setTimeout(()=>{intro.remove();revealCheck()},1100)}
if(intro){
 let seen=false;try{seen=sessionStorage.getItem('crfIntro')}catch(e){}
 if(seen||matchMedia('(prefers-reduced-motion:reduce)').matches){intro.remove()}
 else{
  document.body.classList.add('lock');
  const c=$('#introCanvas'),x=c.getContext('2d');let W,H,t0=performance.now();
  const size=()=>{W=c.width=innerWidth;H=c.height=innerHeight};size();addEventListener('resize',size);
  const cols=['#2BB3AC','#D9A441','#ffffff'];
  const src=[[.1,.15],[.92,.2],[.5,.95]].map((p,i)=>({x:p[0],y:p[1],c:cols[i]}));
  function frame(now){
   const t=(now-t0)/1000;x.clearRect(0,0,W,H);const cx=W/2,cy=H/2;
   // three streams (research, policy, impact) converge on centre
   const k=Math.min(1,t/1.7),e=1-Math.pow(1-k,3);
   src.forEach((s,i)=>{
     for(let j=0;j<26;j++){const tr=Math.max(0,e-j*.018);const px=s.x*W+(cx-s.x*W)*tr+Math.sin(t*3+j+i)*(1-tr)*18,py=s.y*H+(cy-s.y*H)*tr+Math.cos(t*3+j)*(1-tr)*18;
      x.globalAlpha=(1-j/26)*.9*(k<1?1:Math.max(0,1-(t-1.7)*2));x.fillStyle=s.c;x.beginPath();x.arc(px,py,3.4-(j/26)*2.4,0,7);x.fill()}
   });
   // ripple rings once converged
   if(t>1.5){for(let r=0;r<4;r++){const rt=(t-1.5-r*.35);if(rt<0)continue;const rad=rt*Math.min(W,H)*.38;x.globalAlpha=Math.max(0,.5-rt*.22);x.strokeStyle='#2BB3AC';x.lineWidth=2;x.beginPath();x.arc(cx,cy,rad,0,7);x.stroke()}}
   x.globalAlpha=1;if(intro.isConnected&&!intro.classList.contains('out'))requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  setTimeout(endIntro,4600);$('.skip',intro).addEventListener('click',endIntro);
 }
}
/* ---------- NAV ---------- */
const nav=$('.nav');const onS=()=>nav.classList.toggle('solid',scrollY>40);onS();addEventListener('scroll',onS,{passive:true});
const bg=$('.burger'),ul=$('.nav ul');if(bg)bg.addEventListener('click',()=>ul.classList.toggle('open'));
$$('.nav a.l').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop()||(location.pathname.endsWith('/')&&a.getAttribute('href')==='index.html'))a.classList.add('on')});
/* ---------- REVEAL + COUNTERS ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.dataset.count)count(e.target)}}),{threshold:.15});
function revealCheck(){$$('.rv:not(.in):not(.hero .rv),[data-count]').forEach(el=>io.observe(el))}
function count(el){const to=+el.dataset.count,suf=el.dataset.suf||'',t0=performance.now(),d=1600;(function s(n){const p=Math.min(1,(n-t0)/d);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString('en-IN')+suf;if(p<1)requestAnimationFrame(s)})(t0)}
revealCheck();if(!intro||!document.body.contains(intro))heroIn();
/* ---------- HERO NETWORK ---------- */
const hc=$('#heroCanvas');
if(hc&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 const x=hc.getContext('2d');let W,H,P=[],m={x:-999,y:-999};
 const init=()=>{W=hc.width=hc.offsetWidth;H=hc.height=hc.offsetHeight;const n=Math.min(90,Math.floor(W*H/16000));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1,a:Math.random()<.18}))};init();addEventListener('resize',init);
 hc.parentElement.addEventListener('mousemove',e=>{const b=hc.getBoundingClientRect();m.x=e.clientX-b.left;m.y=e.clientY-b.top});
 (function loop(){x.clearRect(0,0,W,H);
  P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<140){p.x+=dx/d*1.2;p.y+=dy/d*1.2}});
  for(let i=0;i<P.length;i++){for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<130){x.strokeStyle='rgba(43,179,172,'+(.35*(1-d/130))+')';x.lineWidth=1;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
   x.fillStyle=P[i].a?'#D9A441':'rgba(255,255,255,.75)';x.beginPath();x.arc(P[i].x,P[i].y,P[i].r,0,7);x.fill()}
  requestAnimationFrame(loop)})();
}
/* ---------- SERVICES FILTER ---------- */
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.tabs button').forEach(o=>o.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;$$('.svc').forEach(s=>s.classList.toggle('hide',f!=='all'&&s.dataset.g!==f))}));
/* ---------- FORMS (opens mail app; no backend needed) ---------- */
$$('form[data-mail]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);const body=[...d.entries()].map(([k,v])=>k+': '+v).join('\n');location.href='mailto:'+f.dataset.mail+'?subject='+encodeURIComponent(f.dataset.subject||'Enquiry')+'&body='+encodeURIComponent(body)}));
})();
