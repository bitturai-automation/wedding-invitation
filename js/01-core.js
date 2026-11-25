/* Helpers, toast, falling petals */
const $=s=>document.querySelector(s);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const vplay=v=>{if(RM)return;const p=v.play();p&&p.catch(()=>{})};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)};
/* petals */
function petals(n,keep){if(RM)return;for(let i=0;i<n;i++)setTimeout(()=>{const p=document.createElement('span'),s=8+Math.random()*10;p.className='petal';p.style.cssText=`left:${Math.random()*100}vw;width:${s}px;height:${s}px;--dx:${(Math.random()-.5)*160}px;animation-duration:${6+Math.random()*5}s`;document.body.appendChild(p);setTimeout(()=>p.remove(),11500)},i*350)}
