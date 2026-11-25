/* Section reveal effects, background videos, tap sparkles */
(()=>{const secs=[...document.querySelectorAll('#app section')];
const sk='.vbg,.frame,.fl,.tass,.finger,.sp,.cf,.bk,.gar,.mand,.chev';
const bokeh=(el,n,gold)=>{for(let i=0;i<n;i++){const b=document.createElement('i'),s=14+Math.random()*34;b.className='bk';b.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;animation-duration:${9+Math.random()*10}s;animation-delay:${-Math.random()*14}s`;el.appendChild(b)}};
secs.forEach((s,k)=>{[...s.children].forEach((c,i)=>{if(!c.matches(sk)){c.classList.add('rv');c.style.setProperty('--i',i);c.style.setProperty('--rx',['0px','-34px','34px'][i%3])}});
if(k>0){const g=document.createElement('div');g.className='gar';const E=['mari','lotus','mari2','mari','lotus','mari2'];g.innerHTML=E.map(e=>'<span><svg viewBox="0 0 48 48" width="1em" height="1em"><use href="#'+e+'"/></svg></span>').join('');s.appendChild(g);}
if(k>0){const m=document.createElement('div');m.className='mand';s.appendChild(m)}
bokeh(s,6);
if(k<secs.length-1){const c=document.createElement('div');c.className='chev';c.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 8l8 8 8-8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';c.onclick=()=>secs[k+1].scrollIntoView({behavior:'smooth'});s.appendChild(c)}});
bokeh($('#cover'),9);
const burst={p3:1,p6:1,p8:1};
const io=new IntersectionObserver(es=>es.forEach(e=>{const s=e.target;if(e.isIntersecting){s.classList.add('iv');if(burst[s.id]&&!s._b){s._b=1;petals(9)}}else s.classList.remove('iv')}),{root:$('#app'),threshold:.45});
secs.forEach(s=>io.observe(s));})();

/* background videos: play only while their section is on screen */
function playWhenVisible(id){const v=$('#'+id+' .vbg');v.muted=true;
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){vplay(v)}else v.pause()}),{root:$('#app'),threshold:.2}).observe($('#'+id))}
['p2','p4','p6','p8'].forEach(playWhenVisible);
/* page 2 video source */
{const a=$('#p2 .vbg');a.src='assets/video/p2bg.mp4';a.poster='assets/photos/p2poster.jpg'}

/* light pages: one shared fixed video (cover video) */
{const v=$('#lvid'),c=$('#cover .cvbg');v.src=c.getAttribute('src');v.poster=c.getAttribute('poster');v.muted=true;const vis=new Set();
const io2=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target.id):vis.delete(e.target.id));if(vis.size){vplay(v)}else v.pause()},{root:$('#app'),threshold:.2});
['p3','p7'].forEach(i=>io2.observe($('#'+i)))}

$('#again').onclick=()=>{$('#app').scrollTo({top:0,behavior:'smooth'})};
/* tap sparkles */
document.addEventListener('pointerdown',e=>{for(let i=0;i<7;i++){const s=document.createElement('i'),a=Math.random()*6.28,d=24+Math.random()*30;s.className='ts';s.style.cssText=`left:${e.clientX-5}px;top:${e.clientY-5}px;--tx:${Math.cos(a)*d}px;--ty:${Math.sin(a)*d}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),800)}},{passive:true});

applyLang();
